// Team logo mapping utility
// Maps team names from the API to local SVG assets

const TEAM_LOGO_MAP: Record<string, string> = {
    // Exact matches
    "Arsenal": "/assets/svgs/clubs/arsenal.svg",
    "Burnley": "/assets/svgs/clubs/burnley.svg",
    "Chelsea": "/assets/svgs/clubs/chelsea.svg",
    "Liverpool": "/assets/svgs/clubs/liverpool.svg",
    "Manchester City": "/assets/svgs/clubs/man-city.svg",
    "Man City": "/assets/svgs/clubs/man-city.svg",
    "Manchester United": "/assets/svgs/clubs/man-utd.svg",
    "Man Utd": "/assets/svgs/clubs/man-utd.svg",
    "Newcastle": "/assets/svgs/clubs/newcastle.svg",
    "Newcastle United": "/assets/svgs/clubs/newcastle.svg",
    "Real Madrid": "/assets/svgs/clubs/realmadrid.svg",
    "Southampton": "/assets/svgs/clubs/southampton.svg",
    "Valencia": "/assets/svgs/clubs/valenica.svg",
    "Leicester": "/assets/svgs/clubs/leicester.svg",
    "Leicester City": "/assets/svgs/clubs/leicester.svg",
    "Swansea": "/assets/svgs/clubs/swansea-city.svg",
    "Swansea City": "/assets/svgs/clubs/swansea-city.svg",

    // Add more mappings as needed
}

/**
 * Get team logo path from team name
 * @param teamName - Team name from API
 * @param apiBadge - Badge URL from API (if available)
 * @returns Local SVG path or fallback
 */
export function getTeamLogo(teamName: string, apiBadge?: string | null): string {
    // If API provides a badge, use it
    if (apiBadge && apiBadge !== "null") {
        return apiBadge
    }

    // Try exact match first
    if (TEAM_LOGO_MAP[teamName]) {
        return TEAM_LOGO_MAP[teamName]
    }

    // Try case-insensitive match
    const lowerName = teamName.toLowerCase()
    for (const [key, value] of Object.entries(TEAM_LOGO_MAP)) {
        if (key.toLowerCase() === lowerName) {
            return value
        }
    }

    // Try partial match (e.g., "Man City" matches "Manchester City")
    for (const [key, value] of Object.entries(TEAM_LOGO_MAP)) {
        if (key.toLowerCase().includes(lowerName) || lowerName.includes(key.toLowerCase())) {
            return value
        }
    }

    // Fallback to generic badge
    return "/team-badge.png"
}
