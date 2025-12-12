import type React from "react"
import type { Match } from "../../types"
import { MatchCard } from "./MatchCard"

interface LeagueSectionProps {
    league: string
    matches: Match[]
    onMatchClick?: (matchId: string) => void
}

export const LeagueSection: React.FC<LeagueSectionProps> = ({ league, matches, onMatchClick }) => {
    return (
        <div
            className="mb-4 rounded-lg overflow-hidden cursor-pointer bg-card w-full md:w-[820px]"
            style={{ padding: "16px" }}
        >
            {/* League Header - 788px (820 - 16*2) */}
            <div className="flex items-center justify-between border-b border-muted pb-2 mb-4 w-full h-5">
                <h3 className="text-white leading-5 font-normal font-sans text-sm">
                    {league}
                </h3>
                {/* Chevron */}
                <div className="w-[18px] h-[18px] relative">
                    <img
                        src="/assets/svgs/left-arrow.svg"
                        alt="Chevron"
                        className="w-[6px] h-[9px] absolute top-[4.49px] left-[6.22px] rotate-180 opacity-100 text-[#A0A3B1]"
                        style={{ color: "#A0A3B1" }}
                    />
                </div>
            </div>

            {/* Matches List - 788px width, 8px gap between cards */}
            <div className="w-full flex flex-col" style={{ gap: "8px" }}>
                {matches.map((match, index) => (
                    <div
                        key={match.id}
                        className={`w-full ${index !== matches.length - 1 ? 'border-b border-border' : ''}`}
                    >
                        <MatchCard match={match} onClick={() => onMatchClick?.(match.id)} />
                    </div>
                ))}
            </div>
        </div>
    )
}
