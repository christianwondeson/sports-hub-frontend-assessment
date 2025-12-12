"use client"
import type { Match } from "../../types"

interface MatchHeaderProps {
  match: Match
  homeRedCards?: number
  homeYellowCards?: number
  awayRedCards?: number
  awayYellowCards?: number
}

// Card count badge component
function CardBadge({ type, count }: { type: "red" | "yellow"; count: number }) {
  if (count <= 0) return null

  return (
    <div className="flex items-center justify-center w-[10px] h-[12px] gap-[10px]">
      <img
        src={type === "red" ? "/assets/svgs/read-card-count.svg" : "/assets/svgs/yello-card-count.svg"}
        alt={`${type} cards: ${count}`}
        className="w-[10px] h-[12px]"
      />
    </div>
  )
}

export function MatchHeader({
  match,
  homeRedCards = 0,
  homeYellowCards = 0,
  awayRedCards = 0,
  awayYellowCards = 0
}: MatchHeaderProps) {
  const isFinished = match.status === "finished"
  const isLive = match.status === "live"

  // Format date
  const matchDate = new Date(match.startTime)
  const dateStr = matchDate.toLocaleDateString("en-US", { day: "numeric", month: "short" }).toUpperCase()

  return (
    <div className="flex items-center justify-between w-full h-auto min-h-[64px] py-2 px-2">
      {/* Home Team */}
      <div className="flex flex-col items-center justify-center flex-1 rounded-lg">
        {/* Team Logo Container */}
        <div className="relative w-[42px] h-[42px] gap-[10px] rounded-[999px]">
          <img
            src={match.homeTeam.logo || "/team-badge.png"}
            alt={match.homeTeam.name}
            className="w-[42px] h-[43px] rounded-[999px] object-contain"
          />
          {/* Card badges */}
          <div className="absolute -top-1 -right-3 flex gap-[2px]">
            <CardBadge type="yellow" count={homeYellowCards} />
            <CardBadge type="red" count={homeRedCards} />
          </div>
        </div>

        {/* Club Name */}
        <div className="flex items-center justify-center mt-1 w-full gap-[10px]">
          <span className="text-white text-center font-inter font-normal text-sm leading-5 truncate px-1">
            {match.homeTeam.name}
          </span>
        </div>
      </div>

      {/* Center - Result, Date, Status */}
      <div className="flex flex-col items-center justify-center w-[67px] shrink-0 gap-3 rounded-lg px-2">
        {/* Date */}
        <span className="text-center text-foreground-secondary font-inter font-normal text-[10px] leading-[14px]">
          {dateStr}
        </span>

        {/* Score */}
        <div className="flex items-center justify-center gap-1 font-inter font-semibold text-[20px] leading-[24px] text-white">
          <span>{match.homeScore ?? 0}</span>
          <span className="text-foreground-secondary">-</span>
          <span>{match.awayScore ?? 0}</span>
        </div>

        {/* Status Badge */}
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-medium leading-[150%]whitespace-nowrap ${isLive ? 'bg-secondary text-secondary-foreground' : 'bg-destructive text-white'
            }`}
        >
          {isLive ? "Live" : isFinished ? "Finished" : "Scheduled"}
        </span>
      </div>

      {/* Away Team */}
      <div className="flex flex-col items-center justify-center flex-1 rounded-lg">
        {/* Team Logo Container */}
        <div className="relative w-[42px] h-[42px] gap-[10px] rounded-[999px]">
          <img
            src={match.awayTeam.logo || "/team-badge.png"}
            alt={match.awayTeam.name}
            className="w-[42px] h-[43px] rounded-[999px] object-contain"
          />
          {/* Card badges */}
          <div className="absolute -top-1 -right-3 flex gap-[2px]">
            <CardBadge type="yellow" count={awayYellowCards} />
            <CardBadge type="red" count={awayRedCards} />
          </div>
        </div>

        {/* Club Name */}
        <div className="flex items-center justify-center mt-1 w-full gap-[10px]">
          <span className="text-white text-center font-inter font-normal text-sm leading-5 truncate px-1">
            {match.awayTeam.name}
          </span>
        </div>
      </div>
    </div>
  )
}
