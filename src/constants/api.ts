const BASE_URL_FREE = "https://www.thesportsdb.com/api/v1/json/3"
const BASE_URL_TEST = "https://www.thesportsdb.com/api/v1/json/123"

export const PREMIER_LEAGUE_ID = import.meta.env.VITE_PREMIER_LEAGUE_ID || "133602";

export const API_ENDPOINTS = {
    // League IDs
    CHAMPIONS_LEAGUE_ID: import.meta.env.VITE_CHAMPIONS_LEAGUE_ID || "4480",

    // Endpoints
    EVENTS_SEASON: (leagueId: string, season: string) => `${BASE_URL_FREE}/eventsseason.php?id=${leagueId}&s=${season}`,
    EVENT_DETAILS: (eventId: string) => `${BASE_URL_TEST}/lookupevent.php?id=${eventId}`,
    EVENT_TIMELINE: (eventId: string) => `${BASE_URL_TEST}/lookuptimeline.php?id=${eventId}`,
    LEAGUE_DETAILS: (leagueId: string) => `${BASE_URL_FREE}/lookupleague.php?id=${leagueId}`,
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
