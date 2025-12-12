const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://www.thesportsdb.com/api/v1/json/3"

export const PREMIER_LEAGUE_ID = import.meta.env.VITE_PREMIER_LEAGUE_ID || "133602";

export const API_ENDPOINTS = {
    // League IDs
    CHAMPIONS_LEAGUE_ID: import.meta.env.VITE_CHAMPIONS_LEAGUE_ID || "4480",

    // Endpoints
    EVENTS_NEXT: (leagueId: string) => `${BASE_URL}/eventsnextleague.php?id=${leagueId}`,
    EVENTS_PAST: (leagueId: string) => `${BASE_URL}/eventspastleague.php?id=${leagueId}`,
    EVENT_DETAILS: (eventId: string) => `${BASE_URL}/lookupevent.php?id=${eventId}`,
    TEAM_DETAILS: (teamId: string) => `${BASE_URL}/lookupteam.php?id=${teamId}`,
    LEAGUE_DETAILS: (leagueId: string) => `${BASE_URL}/lookupleague.php?id=${leagueId}`,
    EVENTS_ROUND: (leagueId: string, round: string, season: string) =>
        `${BASE_URL}/eventsround.php?id=${leagueId}&r=${round}&s=${season}`,
    LIVESCORES: `${BASE_URL}/livescore.php?s=all`,
} as const

// Polling interval for live updates (in milliseconds)
export const POLLING_INTERVAL = 15000 // 15 seconds

// Supported leagues for the app
export const SUPPORTED_LEAGUES = [
    { id: "4328", name: "English Premier League", country: "England" },
    { id: "4480", name: "UEFA Champions League", country: "Europe" },
    { id: "4335", name: "La Liga", country: "Spain" },
    { id: "4331", name: "Bundesliga", country: "Germany" },
    { id: "4332", name: "Serie A", country: "Italy" },
] as const
