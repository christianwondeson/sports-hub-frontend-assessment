import { createContext, useContext, useState, useEffect } from "react"
import type { Match } from "../types"
import type { ReactNode } from "react";
import { API_ENDPOINTS, PREMIER_LEAGUE_ID } from '../constants/api';
import type { SportsDBEvent } from '../types';
import { MOCK_MATCHES, POLLING_INTERVAL } from './matchConfig';

interface MatchContextType {
    matchesMap: Record<string, Match[]>
}

const MatchContext = createContext<MatchContextType | undefined>(undefined)

export function MatchProvider({ children }: { children: ReactNode }) {
    const [matchesMap, setMatchesMap] = useState(MOCK_MATCHES)

    // Fetch live fixtures on mount
    useEffect(() => {
        async function fetchFixtures() {
            try {
                // Fetch Premier League Fixtures (League 4328)
                const response = await fetch(`${API_ENDPOINTS.EVENTS_NEXT(PREMIER_LEAGUE_ID)}`);
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
                        status: event.strStatus === "Not Started" ? "scheduled" : "live", // Simplified status mapping
                        startTime: event.strTimestamp, // "2025-12-10T18:00:00+00:00"
                        league: event.strLeague
                    }))

                    setMatchesMap(prev => ({
                        ...prev,
                        "English Premier League": plMatches
                    }))
                }
            } catch (error) {
                console.error("Failed to fetch fixtures (using mock data):", error)
                // Keep MOCK_MATCHES when offline - they're already in initial state
            }
        }

        fetchFixtures()

        // Polling for updates with simulation for demo
        const interval = setInterval(async () => {
            try {
                // Try to fetch updated fixtures
                const response = await fetch(`${API_ENDPOINTS.EVENTS_NEXT(PREMIER_LEAGUE_ID)}`);
                const data = await response.json();

                if (data.events) {
                    const updatedMatches = data.events.map((event: SportsDBEvent) => ({
                        id: event.idEvent,
                        leagueId: event.idLeague,
                        homeTeam: {
                            id: event.idHomeTeam,
                            name: event.strHomeTeam,
                            logo: event.strHomeTeamBadge || "/assets/svgs/clubs/arsenal.svg",
                        },
                        awayTeam: {
                            id: event.idAwayTeam,
                            name: event.strAwayTeam,
                            logo: event.strAwayTeamBadge || "/assets/svgs/clubs/liverpool.svg",
                        },
                        homeScore: event.intHomeScore ? parseInt(event.intHomeScore) : null,
                        awayScore: event.intAwayScore ? parseInt(event.intAwayScore) : null,
                        status: event.strStatus === "Not Started" ? "scheduled" : "live",
                        startTime: event.strTimestamp,
                        league: event.strLeague,
                    }));

                    setMatchesMap((prev) => ({
                        ...prev,
                        "English Premier League": updatedMatches,
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch updated fixtures (simulating demo data):", error);

                // Simulate live match updates when offline
                setMatchesMap((prev) => {
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
        }, POLLING_INTERVAL);

        return () => clearInterval(interval)
    }, [])

    return (
        <MatchContext.Provider value={{ matchesMap }}>
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
