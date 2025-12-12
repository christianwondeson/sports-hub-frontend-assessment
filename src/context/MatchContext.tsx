import { createContext, useContext, useState, useEffect } from "react"
import type { Match, FilterType } from "../types"
import type { ReactNode } from "react";
import { API_ENDPOINTS } from '../constants/api';
import type { SportsDBEvent } from '../types';
import { MOCK_MATCHES, POLLING_INTERVAL } from './matchConfig';

interface MatchContextType {
    matchesMap: Record<string, Match[]>
    activeFilter: FilterType
    setActiveFilter: (filter: FilterType) => void
    refreshMatches: () => Promise<void>
}

const MatchContext = createContext<MatchContextType | undefined>(undefined)

export function MatchProvider({ children }: { children: ReactNode }) {
    const [matchesMap, setMatchesMap] = useState(MOCK_MATCHES)
    const [activeFilter, setActiveFilter] = useState<FilterType>("all")

    const refreshMatches = async () => {
        try {
            // Fetch Premier League Fixtures (League 4328) for Season 2024-2025
            const url = API_ENDPOINTS.EVENTS_SEASON("4328", "2024-2025");
            console.log("Fetching fixtures from:", url);
            const response = await fetch(url);
            const data = await response.json()

            if (data.events) {
                const plMatches: Match[] = data.events.map((event: SportsDBEvent) => ({
                    id: event.idEvent,
                    leagueId: event.idLeague,
                    homeTeam: {
                        id: event.idHomeTeam,
                        name: event.strHomeTeam,
                        logo: event.strHomeTeamBadge || "/assets/svgs/clubs/arsenal.svg" // Fallback logo
                    },
                    awayTeam: {
                        id: event.idAwayTeam,
                        name: event.strAwayTeam,
                        logo: event.strAwayTeamBadge || "/assets/svgs/clubs/liverpool.svg" // Fallback logo
                    },
                    homeScore: event.intHomeScore ? parseInt(event.intHomeScore) : null,
                    awayScore: event.intAwayScore ? parseInt(event.intAwayScore) : null,
                    status: event.strStatus === "Match Finished" ? "finished" :
                        event.strStatus === "Not Started" ? "scheduled" : "live", // Simplified status mapping
                    startTime: event.strTimestamp, // "2025-12-10T18:00:00+00:00"
                    league: event.strLeague
                }))

                // Check if we have any live matches from API
                const hasLiveMatches = plMatches.some(m => m.status === "live")

                // If no live matches from API, inject mocks (for demo purposes)
                let finalMatches = plMatches
                if (!hasLiveMatches) {
                    const mockLiveMatches = MOCK_MATCHES["English Premier League"].filter(m => m.status === "live")
                    finalMatches = [...plMatches, ...mockLiveMatches]
                }

                setMatchesMap(prev => ({
                    ...prev,
                    "English Premier League": finalMatches
                }))
            }
        } catch (error) {
            console.error("Failed to fetch fixtures (using mock data):", error)
            // Keep MOCK_MATCHES when offline - they're already in initial state
        }
    }

    // Simulation logic effect
    useEffect(() => {

        // Simulation logic function
        const runSimulation = () => {
            if (activeFilter === "live") {
                setMatchesMap((prev) => {
                    // Check if we have any live matches in the current state
                    const hasLiveMatches = Object.values(prev).some(matches =>
                        matches.some(m => m.status === "live")
                    );

                    // If no live matches, inject mock live matches for simulation
                    if (!hasLiveMatches) {
                        return {
                            ...prev,
                            "English Premier League": [
                                ...prev["English Premier League"].filter(m => m.status !== "live"),
                                ...MOCK_MATCHES["English Premier League"].filter(m => m.status === "live")
                            ]
                        };
                    }

                    const updated = { ...prev };

                    // Update each league's matches
                    Object.keys(updated).forEach(league => {
                        updated[league] = updated[league].map(match => {
                            // Only simulate updates for live matches
                            if (match.status === "live") {
                                const newMatch = { ...match };

                                // Increment minute (cap at 90)
                                if (newMatch.minute !== undefined && newMatch.minute < 90) {
                                    newMatch.minute = Math.min(newMatch.minute + 1, 90);
                                }

                                // Randomly update scores (10% chance per team)
                                if (Math.random() < 0.1) {
                                    newMatch.homeScore = (newMatch.homeScore || 0) + 1;
                                }
                                if (Math.random() < 0.1) {
                                    newMatch.awayScore = (newMatch.awayScore || 0) + 1;
                                }

                                return newMatch;
                            }
                            return match;
                        });
                    });

                    return updated;
                });
            }
        };

        // Run immediately when filter changes
        runSimulation();

        // Polling for updates
        const interval = setInterval(runSimulation, POLLING_INTERVAL);

        return () => clearInterval(interval)
    }, [activeFilter])

    return (
        <MatchContext.Provider value={{ matchesMap, activeFilter, setActiveFilter, refreshMatches }}>
            {children}
        </MatchContext.Provider>
    )
}

export function useMatches() {
    const context = useContext(MatchContext)
    if (context === undefined) {
        throw new Error("useMatches must be used within a MatchProvider")
    }
    return context
}
