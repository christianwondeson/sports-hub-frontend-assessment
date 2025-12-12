export interface Team {
  id: string
  name: string
  logo: string
  abbreviation?: string
  status?: string
  hasRedCard?: boolean
}

export interface Match {
  id: string
  homeTeam: Team
  awayTeam: Team
  homeScore?: number
  awayScore?: number
  homeScoreHalf?: number
  awayScoreHalf?: number
  status: "scheduled" | "live" | "finished" | "postponed" | "cancelled" | "halftime"
  minute?: number
  startTime: string
  league: string
  leagueId: string
  venue?: string
  round?: string
  season?: string
}

export interface MatchEvent {
  id: string
  type: "goal" | "substitution" | "corner" | "yellow-card" | "red-card" | "penalty" | "own-goal" | "var"
  minute: number
  extraMinute?: number
  minuteLabel?: string
  team: "home" | "away"
  player: string
  assistPlayer?: string
  description?: string
}

export type Event = MatchEvent

export interface League {
  id: string
  name: string
  country: string
  logo?: string
  season?: string
}

// TheSportsDB API Response Types
export interface SportsDBEvent {
  idEvent: string
  strEvent: string
  strHomeTeam: string
  strAwayTeam: string
  idHomeTeam: string
  idAwayTeam: string
  intHomeScore: string | null
  intAwayScore: string | null
  intRound: string
  strLeague: string
  idLeague: string
  strSeason: string
  dateEvent: string
  strTime: string
  strTimestamp: string
  strStatus: string | null
  strVenue: string
  strHomeTeamBadge: string
  strAwayTeamBadge: string
  strProgress?: string
  intHomeScoreHalf?: string | null
  intAwayScoreHalf?: string | null
  strHomeGoalDetails?: string | null
  strAwayGoalDetails?: string | null
  strHomeRedCards?: string | null
  strAwayRedCards?: string | null
  strHomeYellowCards?: string | null
  strAwayYellowCards?: string | null
}

export interface SportsDBEventsResponse {
  events: SportsDBEvent[] | null
}

export interface SportsDBEventResponse {
  events: SportsDBEvent[] | null
}

export interface SportsDBTimelineEvent {
  idTimeline: string
  idEvent: string
  strTimeline: string
  strTimelineDetail: string
  strHome: string
  strEvent: string
  idAPIfootball: string
  idPlayer: string
  strPlayer: string
  strCountry: string | null
  idAssist: string | null
  strAssist: string
  intTime: string
  idTeam: string
  strTeam: string
  strComment: string
  dateEvent: string
  strSeason: string
}

export interface SportsDBTimelineResponse {
  timeline: SportsDBTimelineEvent[] | null
}

export type FilterType = "all" | "live" | "favorites"
