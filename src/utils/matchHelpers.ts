import type { Match } from "../types"

export type MatchStatusVariant = 'live' | 'finished' | 'scheduled' | 'halftime' | 'default'

export interface MatchStatusDisplay {
    text: string
    variant: MatchStatusVariant
    isLive: boolean
}

export const getMatchStatusDisplay = (match: Match): MatchStatusDisplay => {
    switch (match.status) {
        case "live":
            return {
                text: match.minute ? `${match.minute}'` : "LIVE",
                variant: 'live',
                isLive: true,
            }
        case "finished":
            return {
                text: "FT",
                variant: 'finished',
                isLive: false
            }
        case "halftime":
            return {
                text: "HT",
                variant: 'halftime', // Treat like live usually for color?
                isLive: true
            }
        case "scheduled":
            return {
                text: new Date(match.startTime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }),
                variant: 'scheduled',
                isLive: false,
            }
        default:
            return {
                text: match.status.toUpperCase(),
                variant: 'default',
                isLive: false
            }
    }
}
