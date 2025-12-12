import type { Match, MatchEvent } from "../../types"

interface EventTimelineProps {
    events: MatchEvent[]
    match: Match | null
}

// Icon Components using provided assets
const ScoreIcon = () => (
    <img src="/assets/svgs/score.svg" alt="Goal" className="w-[19px] h-[18px]" />
)

const FlagIcon = () => (
    <img src="/assets/svgs/flag.svg" alt="Corner" className="w-3 h-3" />
)

const RedCardIcon = () => (
    <img src="/assets/svgs/red-card-detail.svg" alt="Red Card" className="w-3 h-3" />
)

const YellowCardIcon = () => (
    <img src="/assets/svgs/yellow-card.svg" alt="Yellow Card" className="w-3 h-3" />
)

const SubstitutionIcon = () => (
    <img src="/assets/svgs/Substituition.svg" alt="Substitution" className="w-[13px] h-[12px]" />
)

const SoccerIcon = () => (
    <img src="/assets/svgs/soccer.svg" alt="Goal" className="w-3 h-3" />
)

// Helper component for centered Dividers (Fulltime 2-1, Halftime 1-0)
function TimeDivider({ label, score }: { label: string; score?: string }) {
    return (
        <div className="flex items-center justify-center w-full my-4">
            <div className="h-[1px] flex-1 bg-[#252735]"></div>
            <div className="mx-4 flex items-center gap-2">
                <span className="text-sm font-medium text-[#A0A3B1]">{label}</span>
                {score && <span className="text-sm font-medium text-white tracking-widest">{score}</span>}
            </div>
            <div className="h-[1px] flex-1 bg-[#252735]"></div>
        </div>
    )
}

// Connector Line Component
const ConnectorLine = () => (
    <div className="h-[1px] w-[20px] bg-[#252735]" />
)


export function EventTimeline({ events, match }: EventTimelineProps) {
    // Sort events by minute descending
    const sortedEvents = [...events].sort((a, b) => {
        const aTime = a.minute + (a.extraMinute || 0) * 0.01
        const bTime = b.minute + (b.extraMinute || 0) * 0.01
        return bTime - aTime
    })

    // Group events
    const secondHalfEvents = sortedEvents.filter((e) => e.minute > 45)
    const firstHalfEvents = sortedEvents.filter((e) => e.minute <= 45)

    const renderEventIcon = (event: MatchEvent) => {
        switch (event.type) {
            case "goal":
            case "penalty":
                return <SoccerIcon />
            case "yellow-card":
                return <YellowCardIcon />
            case "red-card":
                return <RedCardIcon />
            case "substitution":
                return <SubstitutionIcon />
            case "corner":
                return <FlagIcon />
            case "var":
                // 25' Gyokores uses the 'score.svg' (explosion/collision look)
                // 44' Jones uses Substitution icon generally
                if (event.minute === 25) return <ScoreIcon />
                return <SubstitutionIcon />
            default:
                return <span className="text-sm text-foreground-secondary">•</span>
        }
    }

    const renderMinute = (event: MatchEvent) => {
        if (event.minuteLabel) {
            return event.minuteLabel
        }
        if (event.extraMinute) {
            return `${event.minute}+${event.extraMinute}'`
        }
        return `${event.minute}'`
    }

    const renderEventRow = (event: MatchEvent) => {
        const isHomeTeam = event.team === "home"
        const isGoal = event.type === 'goal'

        // Minute Pill Style
        // Goal: Green bg (#00FFA5), Dark Text (#0F1419)
        // Others: Dark bg (#26273B), White Text
        const minuteClass = isGoal
            ? "bg-[#00FFA5] text-[#0F1419]"
            : "bg-[#26273B] text-[#FFFFFF]"

        return (
            <div key={event.id} className="flex items-center justify-between py-1 min-h-[32px]">
                {/* Home Team Side */}
                <div className="flex-1 flex items-center justify-end pr-1">
                    {isHomeTeam && (
                        <>
                            <div className="flex flex-col items-end mr-[10px]">
                                <span className="font-['Inter'] font-normal text-[11px] leading-[15px] text-white">{event.player}</span>
                                {event.assistPlayer && (
                                    <span className="font-['Inter'] font-normal text-[11px] leading-[15px] text-[#A0A3B1]">{event.assistPlayer}</span>
                                )}
                            </div>

                            <div className="flex items-center justify-center w-6 h-6">
                                {renderEventIcon(event)}
                            </div>
                            <ConnectorLine />
                        </>
                    )}
                </div>

                {/* Center Minute Pill */}
                <div className="flex items-center justify-center w-[60px]">
                    <span
                        className={`flex items-center justify-center font-['Inter'] font-normal text-[11px] rounded-full w-[48px] h-[19px] ${minuteClass}`}
                    >
                        {renderMinute(event)}
                    </span>
                </div>

                {/* Away Team Side */}
                <div className="flex-1 flex items-center pl-1">
                    {!isHomeTeam && (
                        <>
                            <ConnectorLine />
                            <div className="flex items-center justify-center w-6 h-6">
                                {renderEventIcon(event)}
                            </div>
                            <div className="flex flex-col items-start ml-[10px]">
                                <span className="font-['Inter'] font-normal text-[11px] leading-[15px] text-white">{event.player}</span>
                                {event.assistPlayer && (
                                    <span className="font-['Inter'] font-normal text-[11px] leading-[15px] text-[#A0A3B1]">{event.assistPlayer}</span>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        )
    }

    // Format scores with spaces for "2 - 1" look
    const fullScore = match ? `${match.homeScore ?? 0}  -  ${match.awayScore ?? 0}` : "0  -  0"
    const halfScore = match ? `${match.homeScoreHalf ?? 0}  -  ${match.awayScoreHalf ?? 0}` : "0  -  0"

    return (
        <div className="w-full max-w-[800px] mx-auto flex flex-col mt-4">
            {/* Title */}
            <div className="px-4 mb-4">
                <h3 className="text-white text-[16px] font-semibold">Events</h3>
            </div>

            <div className="px-4 pb-8"> {/* px-4 = 16px left + 16px right = 32px total. 707 - 32 = 675px row width. Correct. */}

                {/* Fulltime Section */}
                <TimeDivider label="Fulltime" score={fullScore} />
                <div className="flex flex-col gap-2"> {/* gap-2 is 8px */}
                    {secondHalfEvents.map(renderEventRow)}
                </div>

                {/* Halftime Section */}
                <TimeDivider label="Halftime" score={halfScore} />
                <div className="flex flex-col gap-2"> {/* gap-2 is 8px */}
                    {firstHalfEvents.map(renderEventRow)}
                </div>

                {/* Kick Off */}
                <div className="mt-4">
                    <div className="flex items-center justify-center w-full my-4">
                        <div className="h-[1px] flex-1 bg-[#252735]"></div>
                        <div className="mx-4">
                            <span className="text-sm font-medium text-[#A0A3B1]">Kick Off - 13:00</span>
                        </div>
                        <div className="h-[1px] flex-1 bg-[#252735]"></div>
                    </div>
                </div>

            </div>
        </div>
    )
}
