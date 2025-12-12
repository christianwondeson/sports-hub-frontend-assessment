export const ROUTES = {
  home: "/",
  dashboard: "/",
  matches: "/",
  matchDetail: (id: string) => `/match/${id}`,
  standings: "/standings",
  teams: "/teams",
  comparison: "/comparison",
  statistics: "/statistics",
  venues: "/venues",
} as const

export const NAV_ITEMS = [
  { label: "Live", href: "/", key: "live" },
  { label: "Matches", href: "/", key: "matches" },
  { label: "Standings", href: "/standings", key: "standings" },
  { label: "Teams", href: "/teams", key: "teams" },
  { label: "Comparison", href: "/comparison", key: "comparison" },
  { label: "Statistics", href: "/statistics", key: "statistics" },
  { label: "Venues", href: "/venues", key: "venues" },
] as const
