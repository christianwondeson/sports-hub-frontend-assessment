import type React from "react"
import { Navbar } from "./Navbar"

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#0F1419]">
            <Navbar />
            <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[310px] py-[10px]">
                {children}
            </main>
        </div>
    )
}
