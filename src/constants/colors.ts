export const COLORS = {
  primary: "#6D00FF",
  secondary: "#00FFA5",
  danger: "#EE5E52",
  backgroundDark: "#0F1419",
  backgroundSurface: "#1D1E2B",
  backgroundSurfaceAlt: "#252735",
  foregroundPrimary: "#FFFFFF",
  foregroundSecondary: "#A0A3B1",
} as const

export const STATUS_COLORS: Record<string, string> = {
  live: COLORS.secondary,
  finished: COLORS.danger,
  scheduled: COLORS.foregroundSecondary,
} as const
