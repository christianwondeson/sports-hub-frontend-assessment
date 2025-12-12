"use client"
import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import { NAV_ITEMS } from "../../constants/routes"
import { COLORS } from "../../constants/colors"
import { API_ENDPOINTS } from "../../constants/api"

export function Navbar() {
    const location = useLocation()
    const [activeItem, setActiveItem] = useState("standings")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [currentSeason, setCurrentSeason] = useState("2024-2025")

    // Determine active item based on path
    const getActiveItem = () => {
        const path = location.pathname
        if (path === "/" || path.startsWith("/match")) return "matches"
        // Add other mappings as needed
        return "standings" // Default fallback
    }

    const activeItemState = getActiveItem()

    // Fetch current season
    useEffect(() => {
        const fetchSeason = async () => {
            // Skip fetch if on match detail page to reduce API calls
            if (location.pathname.startsWith("/match/")) {
                return
            }

            try {
                // Fetch Premier League details (ID 4328)
                const response = await fetch(API_ENDPOINTS.LEAGUE_DETAILS("4328"))
                const data = await response.json()
                if (data.leagues && data.leagues[0]) {
                    setCurrentSeason(data.leagues[0].strCurrentSeason)
                }
            } catch (error) {
                console.error("Failed to fetch season:", error)
            }
        }
        fetchSeason()
    }, [location.pathname])

    return (
        <>
            <nav
                className="w-full flex justify-center z-50 relative"
                style={{
                    backgroundColor: COLORS.primary,
                    height: "60px",
                }}
            >
                {/* Desktop Content Container - 1440px max-width, centered */}
                <div
                    className="w-full max-w-[1440px] flex items-center justify-between h-full"
                    style={{
                        paddingLeft: "16px",
                        paddingRight: "16px",
                    }}
                >
                    {/* Logo - 200px width */}
                    <div className="flex items-center justify-start" style={{ width: "200px", height: "60px" }}>
                        <img
                            src="/assets/svgs/logo.svg"
                            alt="StatsCore"
                            className="hidden md:block w-full h-full object-contain object-left"
                        />
                        {/* Mobile Logo */}
                        <img
                            src="/assets/svgs/logo.svg"
                            alt="StatsCore"
                            className="block md:hidden"
                            style={{ width: "82px", height: "26.1px" }}
                        />
                    </div>

                    {/* Desktop: Navigation Items - 661px width, 43px height, 4px gap */}
                    <div className="hidden md:flex items-center justify-center" style={{ width: "661px", height: "43px", gap: "4px" }}>
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.key}
                                to={item.href || "/"}
                                className="transition-colors duration-200 bg-transparent border-none cursor-pointer outline-none focus:outline-none flex items-center justify-center no-underline"
                                style={{
                                    color: activeItemState === item.key ? COLORS.secondary : "rgba(255, 255, 255, 0.7)",
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 400,
                                    fontSize: "18px",
                                    lineHeight: "150%",
                                    letterSpacing: "0%",
                                    height: "43px",
                                    width: activeItemState === item.key ? "94px" : "auto",
                                    paddingTop: "8px",
                                    paddingBottom: "8px",
                                    paddingLeft: "8px",
                                    paddingRight: "8px",
                                    borderBottom: activeItemState === item.key ? `2px solid ${COLORS.secondary}` : "2px solid transparent",
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Icons and Selectors - Desktop: 513px width, 40px height, 16px gap */}
                    <div className="flex items-center justify-end gap-2 md:gap-4" style={{ width: "auto", minWidth: "0" }}>
                        {/* Desktop Container Wrapper to enforce 513px on desktop */}
                        <div className="hidden md:flex items-center" style={{ width: "513px", height: "40px", gap: "16px" }}>
                            {/* Desktop: Soccer Ball Icon - 24px container */}
                            <button className="flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none w-6 h-6">
                                <img src="/assets/images/noto_soccer-ball.png" alt="Soccer" className="w-4 h-4 object-contain" />
                            </button>

                            {/* Desktop: Globe Icon - 24px container */}
                            <button className="flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none w-6 h-6">
                                <img src="/assets/svgs/noto-v1_globe-showing-americas.svg" alt="World" className="w-4 h-4 object-contain" />
                            </button>

                            {/* Desktop: League Selector */}
                            <button
                                className="flex items-center rounded-full text-sm font-medium border-none cursor-pointer hover:bg-white/20 transition-colors"
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                                    color: "#FFFFFF",
                                    width: "206px",
                                    height: "40px",
                                    gap: "10px",
                                    paddingTop: "12px",
                                    paddingBottom: "12px",
                                    paddingLeft: "16px",
                                    paddingRight: "16px"
                                }}
                            >
                                <img src="/assets/images/Leading_Icon.png" alt="Leading Icon" className="w-4 h-4" />
                                <span style={{ flex: 1, textAlign: "left" }}>Premier League</span>
                                <img src="/assets/svgs/down-arrow.svg" alt="Dropdown" className="w-[10px] h-auto opacity-70 ml-2" />
                            </button>

                            {/* Desktop: Season Selector */}
                            <button
                                className="flex items-center rounded-full text-sm font-medium border-none cursor-pointer hover:bg-white/20 transition-colors"
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                                    color: "#FFFFFF",
                                    height: "40px",
                                    gap: "8px",
                                    paddingTop: "8px",
                                    paddingBottom: "8px",
                                    paddingLeft: "16px",
                                    paddingRight: "16px",
                                    borderRadius: "9999px"
                                }}
                            >
                                <span style={{ flex: 1 }}>{currentSeason}</span>
                                <img src="/assets/svgs/down-arrow.svg" alt="Dropdown" className="w-[10px] h-auto opacity-70" />
                            </button>

                            {/* Desktop: UK Flag - 24px container */}
                            <button
                                className="flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none overflow-hidden w-6 h-6"
                            >
                                <img src="/assets/svgs/circle-flags_uk.svg" alt="UK" className="w-4 h-4 object-cover" />
                            </button>
                        </div>

                        {/* Mobile Icons (Hidden on Desktop) */}
                        <div className="flex md:hidden items-center gap-2">
                            <button className="flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none w-6 h-6">
                                <img src="/assets/images/noto_soccer-ball.png" alt="Soccer" className="w-4 h-4 object-contain" />
                            </button>

                            <button className="flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none w-6 h-6">
                                <img src="/assets/svgs/noto-v1_globe-showing-americas.svg" alt="World" className="w-4 h-4 object-contain" />
                            </button>

                            <button className="flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none overflow-hidden w-6 h-6">
                                <img src="/assets/svgs/circle-flags_uk.svg" alt="UK" className="w-4 h-4 object-cover" />
                            </button>

                            <button
                                className="flex items-center rounded-full text-sm font-light border-none cursor-pointer hover:bg-white/20 transition-colors"
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                                    color: "#FFFFFF",
                                    width: "85px",
                                    height: "32px",
                                    gap: "8px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    fontFamily: "Roboto",
                                    fontSize: "12px",
                                    fontWeight: 300,
                                    lineHeight: "16px",
                                }}
                            >
                                <span>2024/25</span>
                                <img src="/assets/svgs/down-arrow.svg" alt="Dropdown" className="w-2 h-auto opacity-70" />
                            </button>

                            <button
                                className="flex items-center justify-center cursor-pointer border-none bg-transparent w-8 h-8"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <img src="/assets/svgs/burger-menu.svg" alt="Menu" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile: Expanded Navigation Menu */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden w-full flex flex-col"
                    style={{
                        backgroundColor: COLORS.primary,
                        gap: "16px",
                        paddingTop: "12px",
                        paddingRight: "16px",
                        paddingBottom: "12px",
                        paddingLeft: "16px",
                    }}
                >
                    {/* Horizontal Navigation Items */}
                    <div className="flex items-center overflow-x-auto" style={{ gap: "8px" }}>
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => {
                                    setActiveItem(item.key)
                                    setIsMobileMenuOpen(false)
                                }}
                                className="transition-colors duration-200 border-none cursor-pointer outline-none focus:outline-none flex items-center justify-center whitespace-nowrap flex-shrink-0"
                                style={{
                                    color: activeItem === item.key ? COLORS.onSecondary : "#FFFFFF",
                                    backgroundColor: activeItem === item.key ? COLORS.secondary : "transparent",
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 400,
                                    fontSize: "12px",
                                    lineHeight: "150%",
                                    letterSpacing: "0%",
                                    height: "26px",
                                    paddingTop: "4px",
                                    paddingBottom: "4px",
                                    paddingLeft: "8px",
                                    paddingRight: "8px",
                                    borderRadius: activeItem === item.key ? "4px" : "0",
                                    borderBottom: activeItem === item.key ? `2px solid ${COLORS.secondary}` : "none",
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
