import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";
import { corsHeaders, handlePreflight } from "../shared/middleware.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

Deno.serve(async (req) => {
  // CORS Preflight
  const preflightResponse = handlePreflight(req);
  if (preflightResponse) return preflightResponse;

  try {
    const payload = await req.json();
    console.log("Received database event webhook:", payload);

    const { type, table, record } = payload;

    // We only process INSERT events for the reports table
    if (type !== "INSERT" || table !== "reports" || !record) {
      return new Response(JSON.stringify({ status: "ignored", reason: "Not a new report insertion" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { id, title, description, category } = record;
    const textToEmbed = `Title: ${title}\nDescription: ${description}\nCategory: ${category}`;

    console.log(`Processing report #${id}: "${title}"`);

    // Initialize Supabase Client in Deno context
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Step 1: Generate Embedding for the report
    let embedding: number[] | null = null;
    try {
      const embeddingResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: { parts: [{ text: textToEmbed }] }
          })
        }
      );

      if (embeddingResponse.ok) {
        const embeddingData = await embeddingResponse.json();
        embedding = embeddingData.embedding.values;
        console.log(`Generated embedding vector successfully for report #${id}`);
      } else {
        console.error("Failed to generate embedding from Gemini:", await embeddingResponse.text());
      }
    } catch (e) {
      console.error("Embedding generation exception:", e);
    }

    // Step 2: Run AI classification and sentiment analysis
    let aiClassification = {};
    try {
      const classificationResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `Analyze the following citizen report and return a JSON object with keys:
"priority" (critical, high, medium, low),
"confidence" (float between 0 and 1),
"sentiment" (positive, neutral, negative).

Do not include markdown code block syntax. Return only the raw JSON.

Report:
${textToEmbed}`
                  }
                ]
              }
            ]
          })
        }
      );

      if (classificationResponse.ok) {
        const data = await classificationResponse.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "{}";
        // Clean up markdown block formatting if present
        const cleanedText = responseText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
        aiClassification = JSON.parse(cleanedText);
        console.log(`AI Classification for report #${id}:`, aiClassification);
      } else {
        console.error("Failed to classify report from Gemini:", await classificationResponse.text());
      }
    } catch (e) {
      console.error("AI classification exception:", e);
    }

    // Step 3: Update database record with computed embedding and classification
    const updateData: any = {};
    if (embedding) {
      updateData.embedding = embedding;
    }
    if (Object.keys(aiClassification).length > 0) {
      updateData.ai_classification = aiClassification;
      // If AI determined a higher priority, we can update it
      if ((aiClassification as any).priority) {
        updateData.priority = (aiClassification as any).priority;
      }
    }

    if (Object.keys(updateData).length > 0) {
      const { error: updateError } = await supabase
        .from("reports")
        .update(updateData)
        .eq("id", id);

      if (updateError) {
        throw new Error(`Failed to update report with AI insights: ${updateError.message}`);
      }
      console.log(`Report #${id} successfully updated with embeddings and AI classification.`);
    }

    return new Response(JSON.stringify({ status: "success", id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error("Error processing report-dispatcher webhook:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
