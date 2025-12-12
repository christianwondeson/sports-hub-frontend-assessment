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
        <div className="mb-4 rounded-lg overflow-hidden cursor-pointer bg-card w-full max-w-[328px] md:max-w-[820px] p-4">
            {/* League Header */}
            <div className="flex items-center justify-between border-b border-muted pb-2 mb-2 w-full">
                <h3 className="text-white text-sm leading-5 font-normal font-inter">
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

            {/* Matches List */}
            <div className="w-full">
                {matches.map((match, index) => (
                    <div
                        key={match.id}
                        className="py-2 border-b border-border w-full"
                    >
                        <MatchCard match={match} onClick={() => onMatchClick?.(match.id)} />
                    </div>
                ))}
            </div>
        </div>
    )
}
