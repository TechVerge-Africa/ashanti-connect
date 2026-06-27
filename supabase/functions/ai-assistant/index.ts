import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";
import { corsHeaders, rateLimit, handlePreflight } from "../shared/middleware.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

Deno.serve(async (req) => {
  // 1. CORS Preflight
  const preflightResponse = handlePreflight(req);
  if (preflightResponse) return preflightResponse;

  // Get Client IP for Rate Limiting
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  
  // 2. Apply Rate Limiting (limit: 30 requests per minute)
  const limitStatus = await rateLimit(ip, 30, 60);
  if (!limitStatus.allowed) {
    return new Response(
      JSON.stringify({
        error: "Too many requests. Please try again later.",
        resetAt: new Date(limitStatus.reset).toISOString(),
      }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "X-RateLimit-Limit": "30",
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": limitStatus.reset.toString(),
        },
      }
    );
  }

  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string") {
      return new Response(JSON.stringify({ error: "Query is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize Supabase Client in Deno context
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 3. Generate Embedding using Gemini Embeddings API
    const embeddingResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: { parts: [{ text: query }] }
        })
      }
    );

    if (!embeddingResponse.ok) {
      const errorText = await embeddingResponse.text();
      throw new Error(`Gemini embedding failed: ${errorText}`);
    }

    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.embedding.values;

    // 4. Perform vector search on both projects and reports
    const [projectsSearch, reportsSearch] = await Promise.all([
      supabase.rpc("match_projects", {
        query_embedding: queryEmbedding,
        match_threshold: 0.5,
        match_count: 3,
      }),
      supabase.rpc("match_reports", {
        query_embedding: queryEmbedding,
        match_threshold: 0.5,
        match_count: 3,
      })
    ]);

    if (projectsSearch.error) throw projectsSearch.error;
    if (reportsSearch.error) throw reportsSearch.error;

    const matchedProjects = projectsSearch.data || [];
    const matchedReports = reportsSearch.data || [];

    // 5. Structure Context
    let contextText = "";
    
    if (matchedProjects.length > 0) {
      contextText += "\n### Match Smart City Projects:\n";
      matchedProjects.forEach((proj: any) => {
        contextText += `- Project: ${proj.title} (Category: ${proj.category}, Status: ${proj.status}, Progress: ${proj.progress}%)\n  Description: ${proj.description}\n`;
      });
    }

    if (matchedReports.length > 0) {
      contextText += "\n### Matched Citizen Reports:\n";
      matchedReports.forEach((rep: any) => {
        contextText += `- Report ${rep.tracking_number}: ${rep.title} (Category: ${rep.category}, Status: ${rep.status})\n  Description: ${rep.description}\n`;
      });
    }

    if (!contextText) {
      contextText = "No direct matching projects or reports found in the knowledge base.";
    }

    // 6. Build Prompt for Gemini
    const systemPrompt = `
You are the Ashanti Connect AI Assistant, an advanced conversational agent for TechVerge Africa's regional infrastructure and citizen engagement platform.
Use the verified regional context below to answer the user's question.

Verified Context:
-----
${contextText}
-----

Instructions:
1. Provide accurate, structured, and helpful responses based ONLY on the context.
2. If context does not contain enough info, state that clearly but offer general helpful guidance related to Ashanti Connect.
3. Be professional, direct, and polite.
    `;

    // 7. Query Gemini API for Content Generation (using gemini-1.5-flash)
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\nUser Question: ${query}` }]
            }
          ]
        })
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      throw new Error(`Gemini completion failed: ${errorText}`);
    }

    const completion = await geminiResponse.json();
    const responseText = completion.candidates?.[0]?.content?.parts?.[0]?.text || "I was unable to generate a response.";

    return new Response(
      JSON.stringify({
        response: responseText,
        sources: {
          projectsCount: matchedProjects.length,
          reportsCount: matchedReports.length,
        }
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": limitStatus.remaining.toString(),
        },
      }
    );

  } catch (err: any) {
    console.error("Error in ai-assistant:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
