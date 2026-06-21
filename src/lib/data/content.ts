import type { GovEvent, NewsArticle } from "@/lib/types";

export const news: NewsArticle[] = [
  {
    id: "news-1",
    title: "Ashanti Region launches digital governance platform connecting 5 million citizens",
    excerpt: "The Regional Coordinating Council unveils Ashanti Connect, a two-way platform linking citizens directly to government services.",
    content: `The Ashanti Regional Coordinating Council (ARCC) has officially launched **Ashanti Connect**, a groundbreaking digital governance platform designed to connect over 5 million residents across the region's 43 districts directly with regional administrators.

The portal provides an all-in-one ecosystem where citizens can track public development projects, apply for decentralized public services (including birth certificates, business registration, and driver's licenses), and file direct reports on infrastructural issues such as road damage, water outages, and utility faults.

Speaking at the launch ceremony in Kumasi, the Regional Minister highlighted that Ashanti Connect represents a new era of transparency and citizen participation. "Governance works best when it is a two-way street," the Minister stated. "By putting real-time project metrics, budgets, and reporting tools directly into the hands of our people, we are eliminating bureaucracy and building trust."

Built with modern web technologies, the platform features a glassmorphic user interface inspired by the region's rich Kente weaving heritage. It also integrates an intelligent AI Assistant capable of communicating in both English and Twi, helping citizens navigate services and file reports seamlessly.

Citizens are encouraged to sign up for accounts immediately to access customized portals, track their queries, and participate in upcoming online town halls.`,
    category: "Innovation",
    author: "Regional Communications",
    publishedAt: "2026-06-10T09:00:00Z",
    readMins: 4,
    image: "/assets/news/governance_platform.png",
    featured: true,
  },
  {
    id: "news-2",
    title: "GHS 240 million road rehabilitation programme reaches 60% completion",
    excerpt: "Major arterial roads across Kumasi and surrounding districts are being resurfaced ahead of schedule.",
    content: `The Ministry of Roads and Highways, in partnership with the Ashanti Regional Coordinating Council, has announced that the landmark GHS 240 million road rehabilitation programme has officially passed the **60% completion mark**.

The programme, which commenced in September 2025, targets the resurfacing, patching, and expansion of critical arterial roads across Kumasi Metropolitan area, Ejisu, Obuasi, and Mampong districts. The goal is to dramatically ease traffic congestion, reduce commuter travel times, and boost local trade.

Key projects under this phase include:
- Resurfacing of the Kumasi-Suame highway link.
- Expansion of feeder roads in Asante Akim North to assist agricultural transport.
- Completion of secondary drainage systems along the Sofoline-Tanoso corridor to mitigate seasonal flooding.

Ing. Kwabena Bempah, lead supervisor for the regional road audits, noted that contractors have been working double shifts to take advantage of favorable dry weather periods. "We are maintaining strict quality oversight to ensure that these roads are durable and built to international safety standards," Bempah said.

The project is currently tracking approximately three weeks ahead of its initial schedule, with full completion of this phase expected by December 2026. Detailed project metrics and budgets can be tracked live in the Projects portal of Ashanti Connect.`,
    category: "Infrastructure",
    author: "Roads & Highways",
    publishedAt: "2026-06-08T11:30:00Z",
    readMins: 3,
    image: "/assets/news/road_rehab.png",
  },
  {
    id: "news-3",
    title: "Region records 81% issue resolution rate in Q2",
    excerpt: "Citizen-reported issues are being resolved faster than ever, driven by smart routing and accountability dashboards.",
    content: `The Office of the Regional Minister has published the second quarter performance report for civic services, revealing a record-breaking **81% resolution rate** for citizen-submitted complaints and infrastructure reports.

This achievement marks a significant increase from the 64% resolution rate recorded in the same period last year. Administrators attribute the boost directly to the rollout of Ashanti Connect's automated ticketing and smart-routing backend, which matches incoming citizen reports directly to local district assembly engineers.

According to the data:
- Over 14,000 issues were reported by citizens in Q2, with sanitation and road faults heading the categories.
- Average response time for critical utility disruptions (water and electricity) dropped to under 12 hours.
- General road potholes and drainage blockages saw an average resolution turnaround of 4.5 days.

The regional administration thanked active citizens for using the portal. "This shows that when citizens engage and report issues constructively, local government can respond effectively," the Regional Minister commented. "Our goal for Q3 is to push this rate to 85% and reduce average response hours even further."`,
    category: "Performance",
    author: "Office of the Regional Minister",
    publishedAt: "2026-06-05T14:00:00Z",
    readMins: 5,
    image: "/assets/news/performance_metrics.png",
  },
  {
    id: "news-4",
    title: "500 girls receive STEM scholarships in landmark education drive",
    excerpt: "A new scholarship scheme aims to close the gender gap in science and engineering across the region.",
    content: `In a major step toward expanding access to technical education, the Ashanti Regional Education Directorate, in partnership with the Ghana Education Trust Fund (GETFund), has awarded full academic scholarships to **500 young girls** pursuing Science, Technology, Engineering, and Mathematics (STEM) courses.

The awardees, selected from senior high schools across all 43 districts of the region, will receive coverage for tuition, accommodation, learning materials, and customized mentorship programs with leading female engineers and scientists in Ghana.

During the honors ceremony at the KNUST Great Hall, the Regional Director of Education emphasized the importance of empowering young women in technical fields. "The future of Ghana's economy lies in technology and industrialization. We cannot build that future if we leave half of our talent behind," she explained.

The scholarship scheme is part of a broader regional education strategy that includes upgrading science laboratories in 22 secondary schools and establishing dedicated ICT centers in rural districts. A new application portal for the next cohort will launch on Ashanti Connect in July 2026.`,
    category: "Education",
    author: "Ministry of Education",
    publishedAt: "2026-06-01T08:00:00Z",
    readMins: 3,
    image: "/assets/news/stem_scholarships.png",
  },
  {
    id: "news-5",
    title: "Clean water restored to 12 communities in Asante Akim",
    excerpt: "New boreholes and pipeline extensions bring safe water to over 40,000 residents.",
    content: `Over 40,000 residents in the Asante Akim South and North districts now have access to safe, clean drinking water following the completion of the **Asante Akim Water Restoration Project**.

The initiative, funded by the Regional Coordinating Council in collaboration with AquaGhana Works, involved drilling 18 mechanized, solar-powered boreholes and extending the main pipeline network by 14 kilometers to connect outlying communities.

For years, residents in these farming communities relied on seasonal streams, which posed health risks and required long walks for children. With the new solar-powered distribution points, clean water is now available directly within the communities at zero cost.

Community leaders held a durbar to celebrate the launch. The local water committee has been trained to maintain the solar panels and pump infrastructure to ensure long-term sustainability. Progress on similar rural sanitation projects can be monitored under the Projects Explorer on the Ashanti Connect portal.`,
    category: "Water",
    author: "Water & Sanitation",
    publishedAt: "2026-05-27T10:00:00Z",
    readMins: 2,
    image: "/assets/news/water_restoration.png",
  },
];

export const events: GovEvent[] = [
  {
    id: "evt-1",
    title: "Regional Digital Town Hall: Roads & Infrastructure",
    type: "town_hall",
    date: "2026-06-28T16:00:00Z",
    location: "Live Online + Manhyia Palace Grounds",
    description: "Join regional leadership to ask direct questions about road construction timelines, contractors, and budgets in your district. Submit queries in advance via the Town Hall portal.",
    attendees: 4200,
    isLive: true,
    image: "/assets/events/town_hall.png",
    registrationCount: 1420,
    maxCapacity: 5000,
    speakers: [
      { name: "Hon. Simon Osei-Mensah", title: "Ashanti Regional Minister" },
      { name: "Ing. Kwabena Bempah", title: "Regional Director, Urban Roads" },
      { name: "Nana Akuoko Sarpong", title: "Traditional Council Representative" }
    ]
  },
  {
    id: "evt-2",
    title: "Youth Employment & Opportunity Fair",
    type: "launch",
    date: "2026-06-30T09:00:00Z",
    location: "KNUST Great Hall, Kumasi",
    description: "A premier gathering connecting young graduates, developers, and entrepreneurs with regional companies, tech hubs, and government grant schemes. Register for mock interviews and pitches.",
    attendees: 8000,
    image: "/assets/events/youth_fair.png",
    registrationCount: 3200,
    maxCapacity: 4000,
    speakers: [
      { name: "Dr. John Ampontuah Kumah", title: "Ministry of Finance Representative" },
      { name: "Mrs. Gifty Ohene-Konadu", title: "National Job Fair Coordinator" },
      { name: "Mr. Albert Ocran", title: "Executive Coach & Youth Mentor" }
    ]
  },
  {
    id: "evt-3",
    title: "Public Consultation: 2027 Regional Development Budget",
    type: "consultation",
    date: "2026-07-12T10:00:00Z",
    location: "All District Assemblies (Simulcast Online)",
    description: "Participate in prioritizing regional development spending. Have your voice heard on education, health, and sanitation budget splits for the 2027 fiscal year.",
    attendees: 1500,
    image: "/assets/events/budget_consultation.png",
    registrationCount: 850,
    maxCapacity: 2000,
    speakers: [
      { name: "Mr. Joseph Donkor", title: "Regional Budget Officer" },
      { name: "Dr. Grace Ayensu", title: "Development Planning Expert" }
    ]
  },
  {
    id: "evt-4",
    title: "Scholarship Application Deadline",
    type: "deadline",
    date: "2026-08-01T23:59:00Z",
    location: "Online Portal",
    description: "Final date to submit online applications and reference letters for the Ashanti STEM Scholarship for Girls. All submissions must be completed before midnight.",
    attendees: 0,
    image: "/assets/events/scholarship_deadline.png",
    registrationCount: 920,
    maxCapacity: 1500,
    speakers: [
      { name: "Prof. Kwasi Opoku-Amankwa", title: "Education Trust Representative" },
      { name: "Mrs. Cynthia Bosumtwi-Sam", title: "STEM Directorate Coordinator" }
    ]
  },
];
