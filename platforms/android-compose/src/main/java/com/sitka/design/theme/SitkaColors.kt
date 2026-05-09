package com.sitka.design.theme

import androidx.compose.ui.graphics.Color

// Sitka Design Tokens — Jetpack Compose
// Color tokens mapped from src/tokens/tokens.json (v1.2.0)

object SitkaColors {
    // Brand
    val BrandCyan = Color(0xFF00C0E8)
    val Brand50 = Color(0xFFF0FAF4)
    val Brand100 = Color(0xFFDCF5E7)
    val Brand200 = Color(0xFFB9EACE)
    val Brand300 = Color(0xFF84D4A8)
    val Brand400 = Color(0xFF4DBA82)
    val Brand500 = Color(0xFF34A865)
    val Brand600 = Color(0xFF289452)
    val Brand700 = Color(0xFF1F7341)
    val Brand800 = Color(0xFF165733)
    val Brand900 = Color(0xFF0F3D24)
    val Brand950 = Color(0xFF071F12)

    // Neutral scale
    val Neutral0 = Color(0xFFFFFFFF)
    val Neutral50 = Color(0xFFFAFAFA)
    val Neutral100 = Color(0xFFF5F5F5)
    val Neutral200 = Color(0xFFE5E5E5)
    val Neutral300 = Color(0xFFD4D4D4)
    val Neutral400 = Color(0xFFA7A7AC)
    val Neutral500 = Color(0xFF747474)
    val Neutral600 = Color(0xFF525252)
    val Neutral700 = Color(0xFF404040)
    val Neutral800 = Color(0xFF282828)
    val Neutral850 = Color(0xFF1A1A1A)
    val Neutral900 = Color(0xFF171717)
    val Neutral950 = Color(0xFF0A0A0A)
    val Neutral1000 = Color(0xFF000000)

    // Semantic
    val Success = Color(0xFF22C55E)
    val Warning = Color(0xFFF59E0B)
    val Error = Color(0xFFEF4444)
    val Info = Color(0xFF3B82F6)

    // Dark theme
    val DarkBackground = Color(0xFF09090C)
    val DarkSurface = Color(0xFF0D0D11)
    val DarkSurfaceRaised = Color(0xFF16161C)
    val DarkSurfaceHover = Color(0xFF202028)
    val DarkAccent = Color(0xFF00C0E8)
    val DarkAccentSubtle = Color(0xFF00262E)
    val DarkAccentMuted = Color(0xFF004856)
    val DarkTextPrimary = Color(0xFFF2F2F6)
    val DarkTextSecondary = Color(0xFFAAAAB9)
    val DarkTextTertiary = Color(0xFF87879B)
    val DarkBorder = Color(0xFF262630)
    val DarkBorderSubtle = Color(0xFF1A1A21)
    val DarkStatusSuccess = Color(0xFF10B981)
    val DarkStatusWarning = Color(0xFFF59E0B)
    val DarkStatusDanger = Color(0xFFF87171)
    val DarkStatusCaution = Color(0xFFF97316)

    // Light theme
    val LightBackground = Color(0xFFFAFAFA)
    val LightSurface = Color(0xFFFFFFFF)
    val LightSurfaceRaised = Color(0xFFF6F6F8)
    val LightSurfaceHover = Color(0xFFF0F0F4)
    val LightAccent = Color(0xFF00C0E8)
    val LightAccentSubtle = Color(0xFFE0F7FC)
    val LightAccentMuted = Color(0xFFB3EDF9)
    val LightTextPrimary = Color(0xFF1E1E1E)
    val LightTextSecondary = Color(0xFF55555A)
    val LightTextTertiary = Color(0xFF737378)
    val LightBorder = Color(0xFFE0E0E7)
    val LightBorderSubtle = Color(0xFFF0F0F4)
    val LightStatusSuccess = Color(0xFF10B981)
    val LightStatusWarning = Color(0xFFF59E0B)
    val LightStatusDanger = Color(0xFFEF4444)
    val LightStatusCaution = Color(0xFFEA580C)

    // Glass / Materials
    val GlassOverlayDark = Color(0x33000000) // 20% opacity
    val GlassOverlayLight = Color(0x14000000) // 8% opacity
    val GlassBorderDark = Color(0x19FFFFFF) // 10% opacity
}
