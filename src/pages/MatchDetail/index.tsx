import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Layout } from "../../components/layout/Layout"
import { MatchHeader } from "../../components/match/MatchHeader"
import { EventTimeline } from "../../components/match/EventTimeline"
import { COLORS } from "../../constants/colors"
import { useMatchDetails } from "../../hooks/useMatchDetails"

export const MatchDetail: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>()
    const navigate = useNavigate()

    const { match, events, loading, error } = useMatchDetails(eventId)
    const [activeTab, setActiveTab] = useState("Events")

    const handleBack = () => {
        navigate("/")
    }

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-white">Loading match details...</div>
                </div>
            </Layout>
        )
    }

    if (!match) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <div className="text-white">Match not found</div>
                    <button onClick={handleBack} style={{ color: COLORS.primary }}>
                        ← Back to matches
                    </button>
                </div>
            </Layout>
        )
    }

    // Count cards for header
    const homeRedCards = events.filter(e => e.type === "red-card" && e.team === "home").length
    const homeYellowCards = events.filter(e => e.type === "yellow-card" && e.team === "home").length
    const awayRedCards = events.filter(e => e.type === "red-card" && e.team === "away").length
    const awayYellowCards = events.filter(e => e.type === "yellow-card" && e.team === "away").length

    const tabs = ["Details", "Odds", "Lineups", "Events", "Stats", "Standings"]

    return (
        <Layout>
            {/* Main Container - Responsive max-width */}
            <div className="w-full max-w-[707px] flex flex-col gap-4">
                {/* Combined Header Container - Back + Match Header + Tabs with shared background */}
                <div
                    className="rounded-lg flex flex-col"
                    style={{
                        backgroundColor: "var(--color-background-surface, #1D1E2B)",
                        width: "100%"
                    }}
                >
                    {/* Back and Header Row */}
                    <div
                        className="flex items-center w-full h-[40px] gap-4 px-4 py-2"
                    >
                        {/* Back Arrow - 24x24px */}
                        <button
                            onClick={handleBack}
                            className="flex items-center justify-center bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
                            style={{
                                width: "24px",
                                height: "24px",
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15 18L9 12L15 6"
                                    stroke="#FFFFFF"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        {/* League Name */}
                        <span
                            style={{
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                color: "#FFFFFF"
                            }}
                        >
                            {match.league}
                        </span>
                    </div>

                    {error && (
                        <div className="p-2 rounded text-sm mx-4" style={{ backgroundColor: "#EE5E52", color: "white" }}>
                            {error} - Showing demo data
                        </div>
                    )}

                    {/* Match Stat Section */}
                    <div className="w-full mt-4">
                        <MatchHeader
                            match={match}
                            homeRedCards={homeRedCards}
                            homeYellowCards={homeYellowCards}
                            awayRedCards={awayRedCards}
                            awayYellowCards={awayYellowCards}
                        />
                    </div>

                    {/* Tab Navigation - Centered & Scrollable on Mobile */}
                    <div
                        className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar w-full h-[39px] gap-4 px-4 mt-4 border-b border-[var(--color-border-base)]"
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className="bg-transparent border-none cursor-pointer transition-colors whitespace-nowrap shrink-0"
                                style={{
                                    height: "36px",
                                    paddingTop: "8px",
                                    paddingBottom: "8px",
                                    fontFamily: "Inter, sans-serif",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "var(--color-foreground-muted, #D1D5DB)",
                                    borderBottom: activeTab === tab ? "2px solid #00FFA5" : "2px solid transparent"
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Events Content */}
                {activeTab === "Events" && (
                    <div
                        className="rounded-lg w-full min-h-[924px] gap-[10px]"
                        style={{
                            backgroundColor: "#1D1E2B",
                        }}
                    >
                        <EventTimeline
                            events={events}
                            match={match}
                        />
                    </div>
                )}
            </div>
        </Layout>
    )
}
