import React, { useState } from "react"
import type { FilterType } from "../../types"

interface FilterBarProps {
  onFilterChange?: (filter: FilterType) => void
  liveCount?: number
  favoritesCount?: number
  totalCount?: number
}

// Live icon SVG - 16x16
const LiveIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="8" cy="12" r="1.5" fill="currentColor" />
    <path d="M5.5 9C6 8.5 7 8 8 8C9 8 10 8.5 10.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 6.5C4.2 5.3 5.9 4.5 8 4.5C10.1 4.5 11.8 5.3 13 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M1 4C2.8 2.3 5.2 1.2 8 1.2C10.8 1.2 13.2 2.3 15 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
)

const HeartIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10.9 1.5C12.5 1.5 13.8 2.8 13.8 4.5C13.8 5.2 13.7 5.8 13.5 6.4C13 7.9 12.1 9.1 11.1 9.9C10.1 10.8 9 11.3 8.3 11.6C8.3 11.6 8.2 11.6 8 11.6C7.8 11.6 7.7 11.6 7.7 11.6C7 11.3 5.9 10.8 4.9 9.9C3.9 9.1 3.0 7.9 2.5 6.4C2.3 5.8 2.2 5.2 2.2 4.5C2.2 2.8 3.5 1.5 5.1 1.5C6 1.5 6.8 1.9 7.3 2.5L8 3.3L8.7 2.5C9.2 1.9 10 1.5 10.9 1.5Z" stroke="currentColor" strokeWidth="1" />
  </svg>
)

export const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange,
  liveCount = 4,
  favoritesCount = 2,
  totalCount = 6,
}) => {
  const [active, setActive] = useState<FilterType>("all")

  const handleFilterClick = (filter: FilterType) => {
    setActive(filter)
    onFilterChange?.(filter)
  }

  const buttons = [
    {
      id: "all" as FilterType,
      label: "All",
      count: totalCount,
      icon: null,
      width: "65px"
    },
    {
      id: "live" as FilterType,
      label: "Live",
      count: liveCount,
      icon: <img src="/assets/svgs/fluent_live-20-filled.svg" alt="Live" className="w-4 h-4" />,
      width: "100px"
    },
    {
      id: "favorites" as FilterType,
      label: "Favorites",
      count: favoritesCount,
      icon: <HeartIcon className="w-4 h-4" />,
      width: "134px"
    },
  ]

  return (
    <div className="flex items-center mb-4 w-full max-w-[328px] md:max-w-full h-[36px] border-b border-border md:border-b-0" style={{ gap: "16px" }}>
      {buttons.map((btn) => {
        const isActive = active === btn.id

        // Interactive Styles
        // Active: bg-secondary (#00FFA5), text-[#0F1419], border 1px
        // Inactive: bg-card (#1D1E2B), text-white, border 1px transparent

        const baseClasses = "flex items-center justify-center rounded-lg transition-all h-[36px] cursor-pointer group border"

        const stateClasses = isActive
          ? "bg-secondary text-secondary-foreground border-secondary"
          : "bg-card text-foreground hover:bg-[#252735] hover:text-secondary border-transparent"

        // Badge styles - 16x16 with border-radius 12px
        // Active: bg-[#181921], text-secondary
        // Inactive: bg-[#181921], text-white. Hover: text-secondary
        const badgeBgClass = "bg-[#181921]"
        const badgeTextClass = isActive ? "text-secondary" : "text-white group-hover:text-secondary"

        return (
          <button
            key={btn.id}
            onClick={() => handleFilterClick(btn.id)}
            className={`${baseClasses} ${stateClasses}`}
            style={{
              width: btn.width,
              padding: "8px 12px",
              gap: "8px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "20px",
              textAlign: "center" as const,
              borderRadius: "8px"
            }}
          >
            {btn.icon}
            <span>{btn.label}</span>
            <span
              className={`flex items-center justify-center font-bold text-xs rounded-[12px] ${badgeBgClass} ${badgeTextClass}`}
              style={{
                width: "16px",
                height: "16px",
                fontSize: "10px"
              }}
            >
              {btn.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
