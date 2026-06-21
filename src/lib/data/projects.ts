import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "prj-1",
    name: "Sofoline Interchange Phase II",
    category: "roads",
    district: "Kumasi Metropolitan",
    contractor: "Consar Ltd.",
    budget: 86000000,
    spent: 54000000,
    completion: 63,
    startDate: "2025-09-01",
    endDate: "2026-12-15",
    status: "ongoing",
    description: "Multi-tier interchange to ease congestion at one of Kumasi's busiest junctions.",
    image: "/assets/projects/sofoline_interchange.png",
    likes: 342,
    contractorDetails: {
      name: "Consar Ltd.",
      rating: 4.8,
      completedCount: 14,
      verified: true,
      contactEmail: "info@consarltd.com"
    },
    timeline: [
      { phase: "Feasibility & Design", status: "completed", date: "2025-06-10" },
      { phase: "Excavation & Groundwork", status: "completed", date: "2025-11-20" },
      { phase: "Piling & Pier Erection", status: "ongoing", date: "2026-03-15" },
      { phase: "Main Deck Casting", status: "pending", date: "2026-08-01" },
      { phase: "Finishing & Electrification", status: "pending", date: "2026-11-15" }
    ],
    updates: [
      {
        date: "2026-06-10",
        title: "Pillar casting complete in Section C",
        description: "Pillar foundation casting for Section C finished. Main deck reinforcement begins next week, keeping the project on track."
      },
      {
        date: "2026-04-15",
        title: "Drainage diversion finalized",
        description: "Excavation and drainage diversion along the western loop successfully completed to prevent flooding during rainy seasons."
      },
      {
        date: "2026-01-20",
        title: "Heavy machinery mobilization",
        description: "Heavy piling machinery mobilized on site and piling work commenced on the central interchange deck columns."
      }
    ]
  },
  {
    id: "prj-2",
    name: "Atonsu Water Expansion",
    category: "water",
    district: "Kumasi Metropolitan",
    contractor: "AquaGhana Works",
    budget: 21000000,
    spent: 8400000,
    completion: 40,
    startDate: "2026-01-10",
    endDate: "2026-10-30",
    status: "ongoing",
    description: "New booster stations and 18km of pipeline to serve 60,000 residents.",
    image: "/assets/projects/atonsu_water.png",
    likes: 187,
    contractorDetails: {
      name: "AquaGhana Works",
      rating: 4.2,
      completedCount: 8,
      verified: true,
      contactEmail: "contact@aquaghana.com.gh"
    },
    timeline: [
      { phase: "Surveying & Mapping", status: "completed", date: "2025-12-05" },
      { phase: "Pipeline Trenching", status: "completed", date: "2026-03-10" },
      { phase: "Pipe Laying & Jointing", status: "ongoing", date: "2026-06-01" },
      { phase: "Booster Station Construction", status: "ongoing", date: "2026-07-15" },
      { phase: "Pressure Testing & Handover", status: "pending", date: "2026-09-30" }
    ],
    updates: [
      {
        date: "2026-06-05",
        title: "Trenching reaches 12km milestone",
        description: "Trenching completed for 12km. Jointing of high-durability ductile iron pipes is currently at 55% completion."
      },
      {
        date: "2026-04-18",
        title: "Booster pumps delivery",
        description: "First batch of heavy-duty booster station pumps delivered. Technical inspection completed with zero defects reported."
      }
    ]
  },
  {
    id: "prj-3",
    name: "Ejisu Model SHS Block",
    category: "education",
    district: "Ejisu Municipal",
    contractor: "BuildRight Gh.",
    budget: 12500000,
    spent: 12500000,
    completion: 100,
    startDate: "2025-02-01",
    endDate: "2026-03-20",
    status: "completed",
    description: "24-classroom block with science labs and ICT center.",
    image: "/assets/projects/ejisu_school.png",
    likes: 215,
    contractorDetails: {
      name: "BuildRight Gh.",
      rating: 4.5,
      completedCount: 22,
      verified: true,
      contactEmail: "projects@buildright.com.gh"
    },
    timeline: [
      { phase: "Site Planning & Clearance", status: "completed", date: "2024-11-15" },
      { phase: "Structural Framing", status: "completed", date: "2025-05-20" },
      { phase: "Roofing & Plastering", status: "completed", date: "2025-10-10" },
      { phase: "Interior Fitting & Labs", status: "completed", date: "2026-02-15" },
      { phase: "Commissioning & Handover", status: "completed", date: "2026-03-20" }
    ],
    updates: [
      {
        date: "2026-03-20",
        title: "Official facility handover",
        description: "Official hand-over ceremony completed. District assembly and local chiefs toured the new IT labs and classrooms."
      },
      {
        date: "2026-01-10",
        title: "IT labs network setup",
        description: "Internal painting, electrical fixtures, and computer lab networking fully installed and tested."
      }
    ]
  },
  {
    id: "prj-4",
    name: "Obuasi Municipal Hospital Upgrade",
    category: "healthcare",
    district: "Obuasi Municipal",
    contractor: "MedBuild Consortium",
    budget: 34000000,
    spent: 9000000,
    completion: 22,
    startDate: "2026-03-01",
    endDate: "2027-06-30",
    status: "delayed",
    description: "New maternity and emergency wings with modern equipment.",
    image: "/assets/projects/obuasi_hospital.png",
    likes: 456,
    contractorDetails: {
      name: "MedBuild Consortium",
      rating: 3.9,
      completedCount: 5,
      verified: false,
      contactEmail: "operations@medbuild.com"
    },
    timeline: [
      { phase: "Project Scope Approval", status: "completed", date: "2025-10-10" },
      { phase: "Substructure Foundations", status: "completed", date: "2026-04-12" },
      { phase: "Maternity Wing Concrete Structure", status: "ongoing", date: "2026-06-01" },
      { phase: "Gas Piping & Electrics", status: "pending", date: "2026-11-15" },
      { phase: "Medical Equip Installation", status: "pending", date: "2027-04-01" }
    ],
    updates: [
      {
        date: "2026-06-15",
        title: "Concrete slab pouring delayed",
        description: "Slab pouring for the second floor maternity wing is delayed by 2 weeks due to regional concrete supply shortages. Measures are in place to double shifts next month."
      },
      {
        date: "2026-03-10",
        title: "Groundbreaking Ceremony",
        description: "Groundbreaking and foundation excavation successfully finalized on schedule with local health directors present."
      }
    ]
  },
  {
    id: "prj-5",
    name: "Mampong Rural Electrification",
    category: "electricity",
    district: "Mampong Municipal",
    contractor: "PowerGrid Ltd.",
    budget: 18000000,
    spent: 14600000,
    completion: 78,
    startDate: "2025-06-15",
    endDate: "2026-08-30",
    status: "ongoing",
    description: "Extending the national grid to 22 off-grid communities.",
    image: "/assets/projects/mampong_electricity.png",
    likes: 124,
    contractorDetails: {
      name: "PowerGrid Ltd.",
      rating: 4.6,
      completedCount: 19,
      verified: true,
      contactEmail: "info@powergrid.com.gh"
    },
    timeline: [
      { phase: "Line Route Surveying", status: "completed", date: "2025-05-10" },
      { phase: "High-Tension Pole Planting", status: "completed", date: "2025-11-15" },
      { phase: "Cable Stringing", status: "completed", date: "2026-04-20" },
      { phase: "Transformer Installations", status: "ongoing", date: "2026-06-10" },
      { phase: "Grid Connection & Testing", status: "pending", date: "2026-08-15" }
    ],
    updates: [
      {
        date: "2026-06-12",
        title: "Transformers planted in 15 communities",
        description: "Transformer installation completed in 15 out of 22 communities. Ground testing of high-tension cables currently underway."
      },
      {
        date: "2026-03-25",
        title: "Cable stringing completes",
        description: "Stringing of low voltage distribution lines completed in northern sectors. Structural integrity of poles verified."
      }
    ]
  },
  {
    id: "prj-6",
    name: "Kumasi Waste-to-Compost Plant",
    category: "sanitation",
    district: "Kumasi Metropolitan",
    contractor: "GreenCycle Africa",
    budget: 27000000,
    spent: 2100000,
    completion: 8,
    startDate: "2026-05-01",
    endDate: "2027-09-30",
    status: "planning",
    description: "Converting 400 tonnes/day of organic waste into agricultural compost.",
    image: "/assets/projects/kumasi_waste_compost.png",
    likes: 298,
    contractorDetails: {
      name: "GreenCycle Africa",
      rating: 4.7,
      completedCount: 3,
      verified: true,
      contactEmail: "info@greencycle.africa"
    },
    timeline: [
      { phase: "EIA Environmental Licensing", status: "completed", date: "2025-11-30" },
      { phase: "Facility Layout Engineering", status: "completed", date: "2026-03-15" },
      { phase: "Ground Clearing & Fencing", status: "ongoing", date: "2026-05-15" },
      { phase: "Processing Halls Construction", status: "pending", date: "2026-10-01" },
      { phase: "Digester Assembly & Launch", status: "pending", date: "2027-07-15" }
    ],
    updates: [
      {
        date: "2026-06-01",
        title: "Site fence installation begins",
        description: "Environmental Impact Assessment approved. Ground leveling and perimeter fencing has officially commenced on site."
      }
    ]
  }
];
