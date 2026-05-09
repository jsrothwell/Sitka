package com.sitka.design.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.graphics.Color

// Sitka Material 3 Theme bridge
// Uses Sitka design tokens to provide consistent theming

private val DarkColorScheme = darkColorScheme(
    primary = SitkaColors.DarkAccent,
    onPrimary = Color.White,
    primaryContainer = SitkaColors.DarkAccentMuted,
    onPrimaryContainer = Color.White,
    secondary = SitkaColors.DarkAccentSubtle,
    onSecondary = SitkaColors.DarkAccent,
    tertiary = SitkaColors.DarkTextSecondary,
    onTertiary = SitkaColors.DarkSurface,
    error = SitkaColors.DarkStatusDanger,
    onError = Color.White,
    background = SitkaColors.DarkBackground,
    onBackground = SitkaColors.DarkTextPrimary,
    surface = SitkaColors.DarkSurface,
    onSurface = SitkaColors.DarkTextPrimary,
    surfaceVariant = SitkaColors.DarkSurfaceRaised,
    onSurfaceVariant = SitkaColors.DarkTextSecondary,
    outline = SitkaColors.DarkBorder,
    outlineVariant = SitkaColors.DarkBorderSubtle,
    scrim = Color.Black.copy(alpha = 0.54f),
)

private val LightColorScheme = lightColorScheme(
    primary = SitkaColors.LightAccent,
    onPrimary = Color.Black,
    primaryContainer = SitkaColors.LightAccentMuted,
    onPrimaryContainer = Color.Black,
    secondary = SitkaColors.LightAccentSubtle,
    onSecondary = SitkaColors.LightAccent,
    tertiary = SitkaColors.LightTextSecondary,
    onTertiary = SitkaColors.LightSurface,
    error = SitkaColors.LightStatusDanger,
    onError = Color.White,
    background = SitkaColors.LightBackground,
    onBackground = SitkaColors.LightTextPrimary,
    surface = SitkaColors.LightSurface,
    onSurface = SitkaColors.LightTextPrimary,
    surfaceVariant = SitkaColors.LightSurfaceRaised,
    onSurfaceVariant = SitkaColors.LightTextSecondary,
    outline = SitkaColors.LightBorder,
    outlineVariant = SitkaColors.LightBorderSubtle,
    scrim = Color.Black.copy(alpha = 0.54f),
)

@Composable
fun SitkaTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = false, // Sitka uses static tokens — no dynamic color
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    CompositionLocalProvider(
        LocalShapes provides SitkaShapes,
        LocalTypography provides SitkaTypography
    ) {
        MaterialTheme(
            colorScheme = colorScheme,
            typography = SitkaTypography.material3,
            shapes = SitkaShapes,
            content = content
        )
    }
}
