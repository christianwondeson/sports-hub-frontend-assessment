
import React from "react"
import { COLORS } from "../../constants/colors"

interface ButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  disabled = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: COLORS.secondary,
          color: COLORS.backgroundDark,
        }
      case "outline":
        return {
          backgroundColor: "transparent",
          color: COLORS.secondary,
          border: `1px solid ${COLORS.secondary}`,
        }
      default:
        return {
          backgroundColor: COLORS.primary,
          color: COLORS.foregroundPrimary,
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1 text-sm"
      case "lg":
        return "px-6 py-3 text-lg"
      default:
        return "px-4 py-2 text-base"
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded font-medium transition-opacity hover:opacity-80 disabled:opacity-50 ${getSizeStyles()} ${className}`}
      style={getVariantStyles()}
    >
      {children}
    </button>
  )
}
