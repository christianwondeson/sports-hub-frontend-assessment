"use client"
import type { MatchEvent } from "../../types"

interface EventItemProps {
  event: MatchEvent
}

const EVENT_ICONS: Record<string, string> = {
  goal: "⚽",
  substitution: "🔄",
  corner: "⚑",
  "yellow-card": "🟨",
  "red-card": "🟥",
  penalty: "⚽",
  "own-goal": "⚽",
  var: "📺",
}

export function EventItem({ event }: EventItemProps) {
  return (
    <div className="flex items-start gap-4 py-3 border-b last:border-b-0" style={{ borderBottomColor: "#252735" }}>
      {/* Time and Icon */}
      <div className="flex flex-col items-center min-w-max">
        <span className="text-sm font-semibold text-white">{event.minute}'</span>
        <span className="text-lg">{EVENT_ICONS[event.type] || "•"}</span>
      </div>

      {/* Event Details */}
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{event.player}</p>
        <p className="text-xs" style={{ color: "#A0A3B1" }}>
          {event.description || event.type.replace("-", " ")}
        </p>
      </div>

      {/* Team Info */}
      <span
        className="text-xs font-semibold px-2 py-1 rounded"
        style={{
          backgroundColor: "#252735",
          color: "#A0A3B1",
        }}
      >
        {event.team}
      </span>
    </div>
  )
}
