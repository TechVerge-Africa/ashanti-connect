export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  description?: string;
}

export const publicNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Departments", href: "/departments" },
  { label: "Projects", href: "/projects" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "News & Events", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const citizenNav: NavLink[] = [
  { label: "Dashboard", href: "/portal", icon: "LayoutDashboard" },
  { label: "Report an Issue", href: "/portal/report", icon: "Siren" },
  { label: "Track Reports", href: "/portal/track", icon: "PackageSearch" },
  { label: "AI Assistant", href: "/portal/assistant", icon: "Sparkles" },
  { label: "Opportunity Hub", href: "/portal/opportunities", icon: "Compass" },
  { label: "Digital Town Hall", href: "/portal/town-hall", icon: "Megaphone" },
];

export const govNav: NavLink[] = [
  { label: "Overview", href: "/gov", icon: "LayoutDashboard" },
  { label: "Issue Management", href: "/gov/issues", icon: "Inbox" },
  { label: "Communication", href: "/gov/communication", icon: "MessagesSquare" },
  { label: "Department", href: "/gov/department", icon: "Building2" },
];

export const executiveNav: NavLink[] = [
  { label: "Executive Dashboard", href: "/executive", icon: "Gauge" },
  { label: "Districts", href: "/executive/districts", icon: "Map" },
  { label: "Projects", href: "/executive/projects", icon: "HardHat" },
  { label: "AI Intelligence", href: "/executive/intelligence", icon: "BrainCircuit" },
];

export const workspaces = [
  { label: "Citizen Portal", href: "/portal", icon: "User", description: "Report, track, participate" },
  { label: "Government Ops", href: "/gov", icon: "Building2", description: "Manage & resolve issues" },
  { label: "Executive", href: "/executive", icon: "Gauge", description: "Insights & oversight" },
];
