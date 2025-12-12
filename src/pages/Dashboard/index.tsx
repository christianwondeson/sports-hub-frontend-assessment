"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../../components/layout/Layout"
import { FilterBar } from "../../components/fixtures/FilterBar"
import { LeagueSection } from "../../components/fixtures/LeagueSection"
import { DateSelector } from "../../components/fixtures/DateSelector"
import { useMatches } from "../../context/MatchContext"

export const Dashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const navigate = useNavigate()

  // Use global context for persistent data
  const { matchesMap } = useMatches()

  const handleMatchClick = (matchId: string) => {
    navigate(`/match/${matchId}`)
  }

  return (
    <Layout>
      <div style={{ width: "820px", gap: "16px" }}>
        {/* Header with title */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white">Matches</h1>
        </div>

        {/* Date Selector - 820x98px */}
        <DateSelector currentDate={currentDate} onDateChange={setCurrentDate} />

        {/* Filter Bar */}
        <FilterBar onFilterChange={(filter) => console.log("Filter:", filter)} />

        {/* Matches List */}
        {Object.entries(matchesMap).map(([league, matches]) => (
          <LeagueSection key={league} league={league} matches={matches} onMatchClick={handleMatchClick} />
        ))}
      </div>
    </Layout>
  )
}
