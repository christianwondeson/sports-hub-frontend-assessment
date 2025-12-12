"use client"

import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../../components/layout/Layout"
import { FilterBar } from "../../components/fixtures/FilterBar"
import { LeagueSection } from "../../components/fixtures/LeagueSection"
import { DateSelector } from "../../components/fixtures/DateSelector"
import { useMatches } from "../../context/MatchContext"
import type { Match } from "../../types"

export const Dashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const navigate = useNavigate()

  // Use global context for persistent data
  const { matchesMap, activeFilter, setActiveFilter, refreshMatches } = useMatches()

  useEffect(() => {
    refreshMatches()
  }, [])

  const handleMatchClick = (matchId: string) => {
    navigate(`/match/${matchId}`)
  }

  // Filter matches based on active filter
  const getFilteredMatches = (matches: Match[]): Match[] => {
    switch (activeFilter) {
      case "live":
        return matches.filter(match => match.status === "live")
      case "favorites":
        // TODO: Implement favorites logic
        return matches.filter(match => (match as any).isFavorite === true)
      case "all":
      default:
        return matches
    }
  }

  // Calculate counts for FilterBar
  const allMatches = Object.values(matchesMap).flat()
  const liveCount = allMatches.filter(m => m.status === "live").length
  const favoritesCount = allMatches.filter(m => (m as any).isFavorite === true).length
  const totalCount = allMatches.length

  return (
    <Layout>
      <div className="w-full md:w-[820px] flex flex-col" style={{ gap: "16px", padding: "0 16px 16px 16px" }}>
        {/* Header with title - Hidden on mobile */}
        <div className="mb-4 hidden md:block">
          <h1 className="text-2xl font-bold text-white">Matches</h1>
        </div>

        {/* Date Selector - 820x98px */}
        <DateSelector currentDate={currentDate} onDateChange={setCurrentDate} />

        {/* Filter Bar */}
        <FilterBar
          onFilterChange={setActiveFilter}
          liveCount={liveCount}
          favoritesCount={favoritesCount}
          totalCount={totalCount}
        />

        {/* Matches List */}
        {Object.entries(matchesMap).map(([league, matches]) => {
          const filteredMatches = getFilteredMatches(matches)

          // Only render league section if there are matches after filtering
          if (filteredMatches.length === 0) return null

          return (
            <LeagueSection
              key={league}
              league={league}
              matches={filteredMatches}
              onMatchClick={handleMatchClick}
            />
          )
        })}
      </div>
    </Layout>
  )
}
