import type { Match } from "../../types"
import React from "react"
import { getTeamLogo } from "../../utils/teamLogos"
import { getMatchStatusDisplay } from "../../utils/matchHelpers"
import { COLORS } from "../../constants/colors"

// Map variants to colors
const VARIANT_COLORS = {
    live: COLORS.secondary,
    halftime: COLORS.secondary,
    finished: COLORS.danger,
    scheduled: COLORS.foregroundSecondary,
    default: COLORS.foregroundSecondary,
}

const VARIANT_BASE_COLORS = {
    live: "#00FFA5",
    halftime: "#00FFA5",
    finished: "#EE5E52",
    scheduled: "#252735",
    default: "#252735",
}

interface TeamRowProps {
    team: Match['homeTeam'] | Match['awayTeam']
    logoErrorFn: (e: React.SyntheticEvent<HTMLImageElement>) => void
}

const TeamRow: React.FC<TeamRowProps> = ({ team, logoErrorFn }) => {
    const getStatusText = (status: string) => {
        const s = status.toUpperCase()
        if (s === "AGO") return "AGG"
        return s
    }

    return (
        <div className="flex items-center gap-2">
            <img
                src={team.logo || getTeamLogo(team.name)}
                alt={team.name}
                className="object-contain flex-shrink-0 w-4 h-4 rounded-full"
                onError={logoErrorFn}
            />
            <span className="team-name-text">
                {team.name}
            </span>
            {team.status && (
                <span
                    className="flex items-center justify-center px-1.5 rounded-full h-[18px] gap-1 bg-[#282A3A]"
                >
                    {["AGG", "PEN", "AGO"].includes(team.status.toUpperCase()) && (
                        <span className="text-[10px] text-secondary">✓</span>
                    )}
                    <span className="text-[10px] font-medium text-secondary">
                        {getStatusText(team.status)}
                    </span>
                </span>
            )}
            {team.hasRedCard && (
                <img
                    src="/assets/svgs/red-card.svg"
                    alt="Red Card"
                    className="w-[10px] h-[14px] rounded-[1px]"
                />
            )}
        </div>
    )
}

interface MatchCardProps {
    match: Match
    onClick?: () => void
}

export function MatchCard({ match, onClick }: MatchCardProps) {
    const statusDisplay = getMatchStatusDisplay(match)
    const hasScore = match.homeScore !== undefined && match.awayScore !== undefined
    const statusColor = VARIANT_COLORS[statusDisplay.variant]
    const baseColor = VARIANT_BASE_COLORS[statusDisplay.variant]

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget
        if (!img.src.includes("/team-badge.png")) {
            img.src = "/team-badge.png"
        }
    }

    return (
        // Desktop: 788px width, 76px height, 8px padding top/bottom, 1px border-bottom
        <div
            onClick={onClick}
            className="flex items-center w-full cursor-pointer hover:bg-[#252735]/50 transition-colors justify-between md:w-[788px] md:h-[76px]"
            style={{
                paddingTop: "8px",
                paddingBottom: "8px"
            }}
        >
            {/* Main Card Content (Left Side) */}
            {/* Desktop: Width 716px (788 - 72 = 716) */}
            <div
                className="flex items-center h-[60px] relative overflow-hidden flex-1 md:w-[716px] md:flex-none"
                style={{
                    borderLeft: `3px solid ${statusColor}`,
                }}
            >
                {/* Live Gradient Overlay */}
                {statusDisplay.isLive && (
                    <div
                        className="absolute top-0 bottom-0 left-0 pointer-events-none w-[80px] md:w-[160px] z-0"
                        style={{
                            background: `linear-gradient(90deg, ${baseColor}1A 0%, transparent 100%)`,
                        }}
                    />
                )}

                {/* Column 1: Time */}
                <div
                    className="flex flex-col items-center justify-center flex-shrink-0 h-[60px] match-time-text relative w-[40px] md:w-[56px] z-10"
                    style={{ color: statusColor }}
                >
                    <span>{statusDisplay.text}</span>
                    {statusDisplay.isLive && (
                        <div className="live-indicator-line" />
                    )}
                </div>

                {/* Column 2: Club Layout */}
                <div className="flex flex-col justify-center gap-2 h-[60px] p-2 relative flex-1 md:w-[660px] z-10">
                    <div className="flex items-center justify-between h-[18px]">
                        <TeamRow team={match.homeTeam} logoErrorFn={handleImageError} />
                    </div>

                    <div className="flex items-center justify-between h-[18px]">
                        <TeamRow team={match.awayTeam} logoErrorFn={handleImageError} />
                    </div>
                </div>
            </div>

            {/* Right Side Container - Desktop: 72px width, 60px height, 8px gap */}
            <div
                className="flex items-center h-[60px] w-[72px] shrink-0"
                style={{ gap: "8px" }}
            >
                {/* Result Column with Aggregate */}
                <div className="flex items-center justify-between h-[60px] py-1 w-[40px]">
                    {/* Aggregate Column */}
                    <div className="flex flex-col justify-between h-full py-1 w-[15px]">
                        <div className="h-[26px] flex items-center justify-center">
                            {match.homeScoreHalf !== undefined && (
                                <span className="match-aggregate-text">[{match.homeScoreHalf}]</span>
                            )}
                        </div>

                        <div className="h-[26px] flex items-center justify-center">
                            {match.awayScoreHalf !== undefined && (
                                <span className="match-aggregate-text">[{match.awayScoreHalf}]</span>
                            )}
                        </div>
                    </div>

                    {/* Score Column */}
                    <div className="flex flex-col justify-between h-full py-1 w-[15px]">
                        <span
                            className={`match-score-text h-[26px] flex items-center justify-center ${hasScore ? 'text-foreground-primary' : 'text-foreground-secondary'}`}
                        >
                            {hasScore ? match.homeScore : "-"}
                        </span>
                        <span
                            className={`match-score-text h-[26px] flex items-center justify-center ${hasScore ? 'text-foreground-primary' : 'text-foreground-secondary'}`}
                        >
                            {hasScore ? match.awayScore : "-"}
                        </span>
                    </div>
                </div>

                {/* Menu Button */}
                <button
                    className="flex items-center justify-center hover:opacity-70 flex-shrink-0 bg-transparent border-none cursor-pointer h-[60px] pl-2 w-[24px]"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                >
                    <img
                        src="/assets/images/Menu-dots.png"
                        alt="Menu"
                        className="w-[16px] h-[16px] object-contain"
                    />
                </button>
            </div>
        </div>
    )
}
