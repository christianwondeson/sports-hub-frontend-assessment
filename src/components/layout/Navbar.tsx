"use client"
import { useState } from "react"
import { NAV_ITEMS } from "../../constants/routes"
import { COLORS } from "../../constants/colors"

export function Navbar() {
    const [activeItem, setActiveItem] = useState("matches")

    return (
        <nav
            className="w-full h-[60px] flex items-center justify-between z-50 relative"
            style={{
                backgroundColor: COLORS.primary,
                paddingLeft: "16px",
                paddingRight: "16px",
            }}
        >
            {/* Left: Logo */}
            <div className="flex items-center" style={{ gap: "17px" }}>
                <img src="/assets/svgs/logo.svg" alt="StatsCore" style={{ width: "200px", height: "60px" }} />

                {/* Center: Navigation Items */}
                <div className="flex items-center" style={{ width: "661px", height: "43px", gap: "4px" }}>
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
                                height: "27px",
                                minWidth: "34px",
                                paddingTop: "12px",
                                paddingBottom: "12px",
                                marginLeft: "8px",
                                marginRight: "8px",
                                borderBottom: activeItem === item.key ? `2px solid ${COLORS.secondary}` : "2px solid transparent",
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right: Icons and Selectors */}
            <div className="flex items-center gap-3">
                {/* Globe/World Icon - Circular Button */}
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none">
                    <img src="/assets/svgs/noto-v1_globe-showing-americas.svg" alt="World" className="w-6 h-6 object-contain" />
                </button>

                {/* Soccer Ball Icon - Circular Button */}
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none">
                    <img src="/assets/images/noto_soccer-ball.png" alt="Soccer" className="w-6 h-6 object-contain" />
                </button>

                {/* League Selector - Pill Button */}
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
                    <img src="/assets/images/Leading_Icon.png" alt="Leading Icon" style={{ width: "16px", height: "16px" }} />
                    <span style={{ flex: 1 }}>Premier League</span>
                    <img src="/assets/svgs/down-arrow.svg" alt="Dropdown" style={{ width: "10px", height: "auto", opacity: 0.7, marginLeft: "8px" }} />
                </button>

                {/* Season Selector - Pill Button */}
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
                    <span style={{ flex: 1 }}>2024/25</span>
                    <img src="/assets/svgs/down-arrow.svg" alt="Dropdown" style={{ width: "10px", height: "auto", opacity: 0.7 }} />
                </button>

                {/* UK Flag - Circular Button Container */}
                <button
                    className="flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none overflow-hidden"
                    style={{
                        width: "40px",
                        height: "40px",
                        gap: "8px",
                        borderRadius: "9999px"
                    }}
                >
                    <img src="/assets/svgs/circle-flags_uk.svg" alt="UK" style={{ width: "24px", height: "24px" }} className="object-cover" />
                </button>
            </div>
        </nav>
    )
}
