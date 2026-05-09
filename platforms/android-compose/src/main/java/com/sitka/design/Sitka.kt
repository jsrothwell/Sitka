package com.sitka.design

import androidx.compose.material3.*
import com.sitka.design.theme.*

/**
 * Sitka Design System — Jetpack Compose
 * AI-native, glass-aesthetic design system for Android
 *
 * Usage:
 * @Composable
 * fun MyApp() {
 *   SitkaTheme {
 *     // Your UI here
 *   }
 * }
 */

@Composable
fun SitkaTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = SitkaTypography,
        shapes = SitkaShapes,
        content = content
    )
}

// Re-export common components and tokens for easy access
object Sitka {
    object Colors {
        val BrandCyan get() = SitkaColors.BrandCyan
        val Success get() = SitkaColors.Success
        val Warning get() = SitkaColors.Warning
        val Error get() = SitkaColors.Error
    }

    object Shapes {
        val Small get() = SitkaShapes.Small
        val Medium get() = SitkaShapes.Medium
        val Large get() = SitkaShapes.Large
        val XLarge get() = SitkaShapes.XLarge
    }
}
