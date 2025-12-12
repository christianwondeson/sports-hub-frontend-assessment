"use client"
import { useState } from "react"
import { NAV_ITEMS } from "../../constants/routes"
import { COLORS } from "../../constants/colors"

export function Navbar() {
    const [activeItem, setActiveItem] = useState("standings")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <>
            <nav
                className="w-full flex items-center justify-between z-50 relative"
                style={{
                    backgroundColor: COLORS.primary,
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    height: "60px",
                }}
            >
                {/* Desktop & Mobile: Logo and Right Icons Container */}
                <div className="flex items-center justify-between w-full">
                    {/* Left: Logo + Navigation */}
                    <div className="flex items-center gap-[25px]">
                        <img
                            src="/assets/svgs/logo.svg"
                            alt="StatsCore"
                            className="hidden md:block"
                            style={{ width: "200px", height: "60px" }}
                        />
                        {/* Mobile Logo */}
                        <img
                            src="/assets/svgs/logo.svg"
                            alt="StatsCore"
                            className="block md:hidden"
                            style={{ width: "82px", height: "26.1px" }}
                        />

                        {/* Desktop: Navigation Items - 661px width, 43px height, 4px gap */}
                        <div className="hidden md:flex items-center" style={{ width: "661px", height: "43px", gap: "4px" }}>
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => setActiveItem(item.key)}
                                    className="transition-colors duration-200 bg-transparent border-none cursor-pointer outline-none focus:outline-none flex items-center justify-center"
                                    style={{
                                        color: activeItem === item.key ? COLORS.secondary : "rgba(255, 255, 255, 0.7)",
                                        fontFamily: "Poppins, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "18px",
                                        lineHeight: "150%",
                                        letterSpacing: "0%",
                                        height: "43px",
                                        width: activeItem === item.key ? "94px" : "auto",
                                        paddingTop: "8px",
                                        paddingBottom: "8px",
                                        paddingLeft: "8px",
                                        paddingRight: "8px",
                                        borderBottom: activeItem === item.key ? `2px solid ${COLORS.secondary}` : "2px solid transparent",
                                    }}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Icons and Selectors - Desktop: 513px width, 40px height, 16px gap */}
                    <div className="flex items-center gap-2 md:w-[513px] md:h-[40px] md:gap-4">
                        {/* Desktop: Soccer Ball Icon - 24px container */}
                        <button className="hidden md:flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none w-6 h-6">
                            <img src="/assets/images/noto_soccer-ball.png" alt="Soccer" className="w-4 h-4 object-contain" />
                        </button>

                        {/* Desktop: Globe Icon - 24px container */}
                        <button className="hidden md:flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none w-6 h-6">
                            <img src="/assets/svgs/noto-v1_globe-showing-americas.svg" alt="World" className="w-4 h-4 object-contain" />
                        </button>

                        {/* Mobile Icons */}
                        <button className="flex md:hidden items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none w-6 h-6">
                            <img src="/assets/images/noto_soccer-ball.png" alt="Soccer" className="w-4 h-4 object-contain" />
                        </button>

                        <button className="flex md:hidden items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none w-6 h-6">
                            <img src="/assets/svgs/noto-v1_globe-showing-americas.svg" alt="World" className="w-4 h-4 object-contain" />
                        </button>

                        {/* Mobile: UK Flag Icon */}
                        <button className="flex md:hidden items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none overflow-hidden w-6 h-6">
                            <img src="/assets/svgs/circle-flags_uk.svg" alt="UK" className="w-4 h-4 object-cover" />
                        </button>

                        {/* Mobile: Season Selector */}
                        <button
                            className="flex md:hidden items-center rounded-full text-sm font-light border-none cursor-pointer hover:bg-white/20 transition-colors"
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

                        {/* Desktop: League Selector */}
                        <button
                            className="hidden md:flex items-center rounded-full text-sm font-medium border-none cursor-pointer hover:bg-white/20 transition-colors"
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
                            <span style={{ flex: 1 }}>Premier League</span>
                            <img src="/assets/svgs/down-arrow.svg" alt="Dropdown" className="w-[10px] h-auto opacity-70 ml-2" />
                        </button>

                        {/* Desktop: Season Selector */}
                        <button
                            className="hidden md:flex items-center rounded-full text-sm font-medium border-none cursor-pointer hover:bg-white/20 transition-colors"
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
                            <span style={{ flex: 1 }}>2024/25</span>
                            <img src="/assets/svgs/down-arrow.svg" alt="Dropdown" className="w-[10px] h-auto opacity-70" />
                        </button>

                        {/* Desktop: UK Flag - 24px container */}
                        <button
                            className="hidden md:flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none overflow-hidden w-6 h-6"
                        >
                            <img src="/assets/svgs/circle-flags_uk.svg" alt="UK" className="w-4 h-4 object-cover" />
                        </button>

                        {/* Mobile: Burger Menu */}
                        <button
                            className="flex md:hidden items-center justify-center cursor-pointer border-none bg-transparent w-8 h-8"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <img src="/assets/svgs/burger-menu.svg" alt="Menu" className="w-6 h-6" />
                        </button>
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
