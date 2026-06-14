// Mock AI assistant. Today this is a deterministic, rule-based responder so the
// experience works without an API key. To go live, replace `generateAssistantReply`
// with a call to an `/api/assistant` route backed by OpenAI + RAG over the
// knowledge base (departments, projects, opportunities, FAQs).

import type { ChatMessage } from "@/lib/types";

export interface KbReply {
  match: (q: string) => boolean;
  en: string;
  tw: string;
  suggestions?: string[];
}

const kb: KbReply[] = [
  {
    match: (q) => /report|complain|issue|pothole|broken|damage/.test(q),
    en: "To report an issue, open the Citizen Portal → Report an Issue. Add a description, photos or video, and your location. You'll get a tracking number instantly and can follow every update. Want me to take you there?",
    tw: "Sɛ wopɛ sɛ wokyerɛ ɔhaw bi a, kɔ Citizen Portal → Report an Issue. Fa nkyerɛkyerɛmu, mfonini anaa video, ne wo beae ka ho. Wobɛnya tracking number ntɛm ara. Mempɛ sɛ mede wo kɔ hɔ?",
    suggestions: ["How do I track my report?", "What can I report?"],
  },
  {
    match: (q) => /track|status|tracking|where is my/.test(q),
    en: "You can track any report with its tracking number (e.g. ASH-2026-04821) on the Track Reports page. You'll see the live status, assigned department, progress timeline, and the full conversation — just like tracking a package.",
    tw: "Wobɛtumi ahwɛ wo report biara mu denam ne tracking number so (sɛ ASH-2026-04821) wɔ Track Reports kratafa no so. Wobɛhunu status, department a wɔde ama, ne nkɔso nyinaa.",
    suggestions: ["Report a new issue", "Show me opportunities"],
  },
  {
    match: (q) => /job|scholarship|grant|opportunit|internship|training|work/.test(q),
    en: "The Opportunity Hub lists jobs, scholarships, grants, internships, training, and entrepreneurship support across the region. Right now there's a Digital Skills Fellowship and a STEM Scholarship for Girls open for applications. Shall I show you opportunities matching your interests?",
    tw: "Opportunity Hub no kyerɛ adwuma, scholarship, grant, internship ne training ahodoɔ wɔ ɔmantam no mu. Seesei, Digital Skills Fellowship ne STEM Scholarship ma mmaa wɔ hɔ. Mempɛ sɛ mekyerɛ wo bi?",
    suggestions: ["Scholarships for students", "Jobs in health"],
  },
  {
    match: (q) => /water|electricity|road|sanitation|health|education|department/.test(q),
    en: "Ashanti Connect coordinates eight departments — Roads & Highways, Water & Sanitation, Energy & Power, Health, Education, Agriculture, Sanitation & Waste, and Security. Each has a public dashboard with response times and active projects. Which service do you need help with?",
    tw: "Ashanti Connect hwɛ department ahodoɔ awotwe so. Department biara wɔ dashboard a ɛkyerɛ ne nkɔso. Ɛhe na wopɛ mmoa?",
    suggestions: ["Report a water problem", "View development projects"],
  },
  {
    match: (q) => /project|budget|contractor|development|transparen/.test(q),
    en: "Every regional development project is public — you can see the budget, contractor, timeline, and completion percentage on the Projects page. For example, the Sofoline Interchange Phase II is 63% complete with a GHS 86M budget.",
    tw: "Development project biara da hɔ baha — wobɛhunu sika, contractor, ne nkɔso wɔ Projects kratafa no so.",
    suggestions: ["Projects in my district", "How is my tax used?"],
  },
  {
    match: (q) => /town hall|vote|poll|participate|meeting|leadership/.test(q),
    en: "The Digital Town Hall lets you ask leadership questions, vote in polls, and join live sessions. There's currently an open poll on the 2027 budget priorities — your voice helps shape regional decisions.",
    tw: "Digital Town Hall no ma wo kwan ma wobisa mpanyimfoɔ nsɛm, vote wɔ poll mu, na wokɔ live sessions. Wo nne boa ma yɛsi gyinae.",
    suggestions: ["Vote on 2027 budget", "Ask a question"],
  },
];

const fallback: KbReply = {
  match: () => true,
  en: "I'm the Ashanti Connect assistant. I can help you report issues, track responses, find jobs and scholarships, understand development projects, and participate in governance — in English or Twi. What would you like to do?",
  tw: "Me ne Ashanti Connect boafoɔ. Metumi boa wo ma wokyerɛ ɔhaw, hwɛ mmuae, hwehwɛ adwuma ne scholarship, na woka governance ho — wɔ Borɔfo anaa Twi mu. Ɛdeɛn na wopɛ sɛ woyɛ?",
  suggestions: ["Report an issue", "Track a report", "Find opportunities"],
};

export function generateAssistantReply(
  question: string,
  lang: "en" | "tw" = "en",
): { content: string; suggestions: string[] } {
  const q = question.toLowerCase();
  const entry = kb.find((k) => k.match(q)) ?? fallback;
  return {
    content: lang === "tw" ? entry.tw : entry.en,
    suggestions: entry.suggestions ?? fallback.suggestions ?? [],
  };
}

export const starterPrompts = [
  "How do I report a pothole?",
  "Track report ASH-2026-04821",
  "Show me scholarships",
  "What projects are happening in Kumasi?",
];

export function newMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return { id: Math.random().toString(36).slice(2), role, content };
}
