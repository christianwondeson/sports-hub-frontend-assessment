import React, { useState } from "react"
import type { FilterType } from "../../types"

interface FilterBarProps {
  onFilterChange?: (filter: FilterType) => void
  liveCount?: number
  favoritesCount?: number
  totalCount?: number
}


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
      icon: <img src="/assets/svgs/heart.svg" alt="Favorites" className="w-4 h-4" />,
      width: "134px"
    },
  ]

  return (
    <div
      className="flex items-center mb-4 w-full h-[36px] gap-4 md:w-[328px] md:gap-4 md:border-b md:border-border"
    >
      {buttons.map((btn) => {
        const isActive = active === btn.id

        // Interactive Styles
        // Active: bg-secondary (#00FFA5), text-[#0F1419], border 1px
        // Inactive: bg-card (#1D1E2B), text-white, border 1px transparent

        // Mobile: flex-1 for proportional scaling
        // Desktop: fixed width 100px, height 36px, gap 8px, border-radius 8px, padding 8px 12px
        const baseClasses = "flex items-center justify-center rounded-lg transition-all h-[36px] cursor-pointer group border flex-1 md:flex-none text-center"

        const stateClasses = isActive
          ? "bg-secondary text-secondary-foreground border-secondary"
          : "bg-card text-foreground hover:bg-[#252735] border-transparent hover:text-[#00FFA5]"

        // Badge styles - 16x16 with border-radius 12px
        // Active: bg-[#181921], text-secondary
        // Inactive: bg-[#181921], text-white. Hover: text-secondary
        const badgeBgClass = "bg-[#181921]"
        const badgeTextClass = isActive ? "text-secondary" : "text-white group-hover:text-secondary"

        // Desktop button width: 100px (Figma spec)
        const desktopWidthClass = "md:w-[100px]"

        return (
          <button
            key={btn.id}
            onClick={() => handleFilterClick(btn.id)}
            className={`${baseClasses} ${stateClasses} ${desktopWidthClass}`}
            style={{
              minWidth: btn.id === "all" ? "60px" : btn.id === "live" ? "90px" : "120px",
              padding: "8px 12px",
              gap: "8px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "20px"
            }}
          >
            {/* Icon and Text container - width: 52px, gap: 8px */}
            <div className="flex items-center" style={{ gap: "8px" }}>
              {/* Icon - 16x16 */}
              {btn.icon}
              {/* Text */}
              <span>{btn.label}</span>
            </div>

            {/* Badge - 16x16, border-radius 12px, gap 4px */}
            <span
              className={`flex items-center justify-center font-bold rounded-[12px] w-4 h-4 ${badgeBgClass} ${badgeTextClass}`}
              style={{
                fontSize: "12px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                lineHeight: "16px"
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
