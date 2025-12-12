import type { Match, MatchEvent, SportsDBEvent } from "../types"
import { getTeamLogo } from "./teamLogos"

// Parse goal details from API string format: "Player;Minute;Player2;Minute2" 
export function parseGoalDetails(details: string | null | undefined, team: "home" | "away"): MatchEvent[] {
    if (!details) return []
    const events: MatchEvent[] = []

    // Handle both comma-separated chunks "Player;Min,Player;Min" and pure semicolon stream "Player;Min;Player;Min"
    let parts: string[] = []

    if (details.includes(",")) {
        // Comma separated case
        details.split(",").forEach(chunk => {
            parts.push(...chunk.split(";"))
        })
    } else {
        // Pure semicolon case
        parts = details.split(";")
    }

    parts = parts.map(s => s.trim()).filter(Boolean)

    for (let i = 0; i < parts.length; i += 2) {
        const player = parts[i]
        const minuteStr = parts[i + 1]

        if (player && minuteStr) {
            const minuteParts = minuteStr.match(/(\d+)(?:\+(\d+))?/)
            if (minuteParts) {
                const minute = parseInt(minuteParts[1], 10)
                const extraMinute = minuteParts[2] ? parseInt(minuteParts[2], 10) : undefined

                events.push({
                    id: `goal-${team}-${i}`,
                    type: "goal",
                    minute,
                    extraMinute,
                    team,
                    player,
                })
            }
        }
    }
    return events
}

// Parse card details from API string format
export function parseCardDetails(details: string | null | undefined, team: "home" | "away", type: "yellow-card" | "red-card"): MatchEvent[] {
    if (!details) return []
    const events: MatchEvent[] = []

    // Check for "Player:Minute" format first
    if (details.includes(":")) {
        details.split(";").filter(Boolean).forEach((part, index) => {
            const [player, minuteStr] = part.split(":").map(s => s.trim())
            if (player && minuteStr) {
                const minute = parseInt(minuteStr, 10) || 0
                events.push({
                    id: `${type}-${team}-${index}`,
                    type,
                    minute,
                    team,
                    player,
                })
            }
        })
        return events
    }

    // Fallback to "Player;Minute" pairs
    const parts = details.split(";").map(s => s.trim()).filter(Boolean)
    for (let i = 0; i < parts.length; i += 2) {
        const player = parts[i]
        const minuteStr = parts[i + 1]
        if (player && minuteStr) {
            const minute = parseInt(minuteStr, 10)
            if (!isNaN(minute)) {
                events.push({
                    id: `${type}-${team}-${i}`,
                    type,
                    minute,
                    team,
                    player,
                })
            }
        }
    }
    return events
}

// Convert API response to Match object
export function convertToMatch(event: SportsDBEvent): Match {
    return {
        id: event.idEvent,
        leagueId: event.idLeague,
        homeTeam: {
            id: event.idHomeTeam,
            name: event.strHomeTeam,
            logo: getTeamLogo(event.strHomeTeam, event.strHomeTeamBadge),
        },
        awayTeam: {
            id: event.idAwayTeam,
            name: event.strAwayTeam,
            logo: getTeamLogo(event.strAwayTeam, event.strAwayTeamBadge),
        },
        homeScore: event.intHomeScore ? parseInt(event.intHomeScore, 10) : undefined,
        awayScore: event.intAwayScore ? parseInt(event.intAwayScore, 10) : undefined,
        homeScoreHalf: event.intHomeScoreHalf ? parseInt(event.intHomeScoreHalf, 10) : undefined,
        awayScoreHalf: event.intAwayScoreHalf ? parseInt(event.intAwayScoreHalf, 10) : undefined,
        status: event.strStatus === "Match Finished" ? "finished" :
            event.strStatus === "Not Started" ? "scheduled" : "live",
        startTime: event.strTimestamp || `${event.dateEvent}T${event.strTime}`,
        league: event.strLeague,
        venue: event.strVenue,
        round: event.intRound,
        season: event.strSeason,
    }
}

// Parse all events from API response
export function parseMatchEvents(event: SportsDBEvent): MatchEvent[] {
    const events: MatchEvent[] = []

    // Goals
    events.push(...parseGoalDetails(event.strHomeGoalDetails, "home"))
    events.push(...parseGoalDetails(event.strAwayGoalDetails, "away"))

    // Yellow cards
    events.push(...parseCardDetails(event.strHomeYellowCards, "home", "yellow-card"))
    events.push(...parseCardDetails(event.strAwayYellowCards, "away", "yellow-card"))

    // Red cards
    events.push(...parseCardDetails(event.strHomeRedCards, "home", "red-card"))
    events.push(...parseCardDetails(event.strAwayRedCards, "away", "red-card"))

    // Sort by minute descending
    return events.sort((a, b) => b.minute - a.minute)
}

// Parse timeline events from API response
export function parseTimelineEvents(timelineEvents: import("../types").SportsDBTimelineEvent[]): MatchEvent[] {
    if (!timelineEvents || !Array.isArray(timelineEvents)) return []

    return timelineEvents.map((event, index) => {
        let type: MatchEvent["type"] = "var" // Default fallback

        // Map API timeline types to internal types
        if (event.strTimeline === "Goal") type = "goal"
        else if (event.strTimeline === "Card") {
            if (event.strTimelineDetail === "Yellow Card") type = "yellow-card"
            else if (event.strTimelineDetail === "Red Card") type = "red-card"
        }
        else if (event.strTimeline === "subst") type = "substitution"

        // Parse minute
        const minute = parseInt(event.intTime, 10) || 0
        const team: "home" | "away" = event.strHome === "Yes" ? "home" : "away"

        return {
            id: event.idTimeline || `timeline-${index}`,
            type,
            minute,
            team,
            player: event.strPlayer,
            assistPlayer: event.strAssist,
            description: event.strTimelineDetail
        }
    }).sort((a, b) => b.minute - a.minute)
}
