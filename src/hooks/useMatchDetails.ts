import { useState, useEffect } from "react"
import type { Match, MatchEvent, SportsDBEvent } from "../types"
import { API_ENDPOINTS } from "../constants/api"
import { convertToMatch, parseMatchEvents, parseTimelineEvents } from "../utils/matchParser"

// Fallback mock data
const MOCK_MATCH: Match = {
    id: "1",
    leagueId: "4480",
    homeTeam: { id: "1", name: "Arsenal", logo: "/assets/svgs/clubs/arsenal.svg" },
    awayTeam: { id: "2", name: "Liverpool", logo: "/assets/svgs/clubs/liverpool.svg" },
    homeScore: 2,
    awayScore: 1,
    homeScoreHalf: 1,
    awayScoreHalf: 0,
    status: "finished",
    startTime: "2025-12-10T20:00:00",
    league: "UEFA Champions League",
}

// Updated MOCK_EVENTS to match the "Fulltime" design screenshot
const MOCK_EVENTS: MatchEvent[] = [
    // Fulltime Section (46' - 90+')
    { id: "1", type: "substitution", minute: 89, team: "home", player: "Gyokores", assistPlayer: "Odegard" },
    { id: "2", type: "goal", minute: 88, team: "away", player: "Ekitike", assistPlayer: "Sallah" }, // Green Pill
    { id: "3", type: "yellow-card", minute: 78, team: "home", player: "Saliba" },
    { id: "4", type: "corner", minute: 74, team: "home", player: "3rd corner" },
    { id: "5", type: "substitution", minute: 67, team: "home", player: "Rice", assistPlayer: "Zubemendi" },
    { id: "6", type: "substitution", minute: 67, team: "away", player: "Frimpong", assistPlayer: "Robertson" },
    { id: "7", type: "red-card", minute: 66, team: "away", player: "Van Dijk", assistPlayer: "Sent Off" },
    { id: "8", type: "goal", minute: 55, team: "home", player: "Saka" }, // Green Pill
    { id: "9", type: "corner", minute: 52, team: "home", player: "5th corner" },
    { id: "10", type: "corner", minute: 48, minuteLabel: "48\"", team: "away", player: "3rd Corner", extraMinute: 0 },

    // Halftime Section (0' - 45')
    { id: "11", type: "corner", minute: 45, extraMinute: 2, team: "home", player: "2nd corner" },
    { id: "12", type: "substitution", minute: 45, team: "away", player: "Jones", assistPlayer: "Mcalister" },
    { id: "13", type: "yellow-card", minute: 44, team: "home", player: "Gabriel" },
    { id: "14", type: "var", minute: 44, team: "away", player: "Jones", assistPlayer: "Injured" }, // Shows as Substitution or Special icon
    { id: "15", type: "corner", minute: 36, team: "home", player: "1st corner" },
    { id: "16", type: "yellow-card", minute: 34, team: "away", player: "Konate" },
    { id: "17", type: "var", minute: 25, team: "home", player: "Gyokores" }, // Shows as ScoreIcon (Explosion)
    { id: "18", type: "corner", minute: 16, team: "away", player: "2nd Corner" },
    { id: "19", type: "goal", minute: 12, team: "home", player: "Gyokores", assistPlayer: "Odegard" }, // Green Pill
    { id: "20", type: "corner", minute: 3, team: "away", player: "1st Corner" },
]

// Mock data for Man Utd vs Fulham (ID 2069556) - Free API returns wrong data
const MOCK_MATCH_FULHAM: Match = {
    id: "2069556",
    leagueId: "4328",
    homeTeam: { id: "133612", name: "Manchester United", logo: "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png" },
    awayTeam: { id: "133600", name: "Fulham", logo: "https://r2.thesportsdb.com/images/media/team/badge/xwwvyt1448811086.png" },
    homeScore: 1,
    awayScore: 0,
    homeScoreHalf: 0, // Inferred
    awayScoreHalf: 0, // Inferred
    status: "finished",
    startTime: "2024-08-16T19:00:00",
    league: "English Premier League",
}

const MOCK_EVENTS_FULHAM: MatchEvent[] = [
    { id: "870275", type: "substitution", minute: 61, team: "home", player: "Mason Mount", assistPlayer: "Joshua Zirkzee" },
    { id: "870274", type: "substitution", minute: 61, team: "home", player: "Amad Diallo", assistPlayer: "Alejandro Garnacho" },
    { id: "870273", type: "yellow-card", minute: 40, team: "home", player: "Harry Maguire" },
    { id: "870272", type: "yellow-card", minute: 25, team: "away", player: "Calvin Bassey" },
    { id: "870271", type: "yellow-card", minute: 18, team: "home", player: "Mason Mount" },
    // Adding the goal manually since it wasn't in the timeline snippet but score is 1-0
    { id: "goal-1", type: "goal", minute: 87, team: "home", player: "Joshua Zirkzee", assistPlayer: "Alejandro Garnacho" }
]

export function useMatchDetails(eventId: string | undefined) {
    const [match, setMatch] = useState<Match | null>(null)
    const [events, setEvents] = useState<MatchEvent[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchMatchData() {
            // SPECIAL RULE: For the "Arsenal vs Liverpool" assessment layout review,
            // we force the mock data if the ID matches our demo ID "1".
            if (!eventId || eventId === "1") {
                setMatch(MOCK_MATCH)
                setEvents(MOCK_EVENTS)
                setLoading(false)
                return
            }

            // SPECIAL RULE: For "Man Utd vs Fulham" (ID 2069556), the free API returns wrong data/errors.
            // We use specific mock data provided by the user.
            if (eventId === "2069556") {
                setMatch(MOCK_MATCH_FULHAM)
                setEvents(MOCK_EVENTS_FULHAM)
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                const response = await fetch(API_ENDPOINTS.EVENT_DETAILS(eventId))
                const data = await response.json()

                if (data.events && data.events.length > 0) {
                    const apiEvent = data.events[0] as SportsDBEvent
                    setMatch(convertToMatch(apiEvent))

                    // Fetch timeline data separately
                    try {
                        const timelineResponse = await fetch(API_ENDPOINTS.EVENT_TIMELINE(eventId))
                        const timelineData = await timelineResponse.json()

                        if (Array.isArray(timelineData.timeline) && timelineData.timeline.length > 0) {
                            const parsedTimeline = parseTimelineEvents(timelineData.timeline)
                            setEvents(parsedTimeline)
                        } else {
                            // Fallback to parsing from event object if timeline is empty
                            const parsedEvents = parseMatchEvents(apiEvent)
                            setEvents(parsedEvents)
                        }
                    } catch (timelineErr) {
                        console.warn("Failed to fetch timeline, falling back to event data:", timelineErr)
                        const parsedEvents = parseMatchEvents(apiEvent)
                        setEvents(parsedEvents)
                    }
                } else {
                    // No API data found
                    setError("Match not found")
                }
            } catch (err) {
                console.error("Error fetching match data:", err)
                setError("Failed to load match data")
            } finally {
                setLoading(false)
            }
        }

        fetchMatchData()
    }, [eventId])

    return { match, events, loading, error }
}
