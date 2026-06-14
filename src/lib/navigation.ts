export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  description?: string;
}

export const publicNav: NavLink[] = [
  { label: "Home", href: "/", icon: "Home" },
  { label: "About", href: "/about", icon: "Info" },
  { label: "Services", href: "/services", icon: "LayoutGrid" },
  { label: "Departments", href: "/departments", icon: "Building2" },
  { label: "Projects", href: "/projects", icon: "HardHat" },
  { label: "Opportunities", href: "/opportunities", icon: "Compass" },
  { label: "News & Events", href: "/news", icon: "Newspaper" },
  { label: "Contact", href: "/contact", icon: "Mail" },
];

export const citizenNav: NavLink[] = [
  { label: "Dashboard", href: "/portal", icon: "LayoutDashboard" },
  { label: "Report an Issue", href: "/portal/report", icon: "Siren" },
  { label: "Track Reports", href: "/portal/track", icon: "PackageSearch" },
  { label: "Services", href: "/portal/services", icon: "LayoutGrid" },
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
