package com.sitka.design.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

// Sitka typography — mapped from tokens.json
// Defaults to System font; can override by passing custom fonts to SitkaTheme

val SitkaFontFamily = FontFamily.Default

val SitkaTypography = Typography(
    displayLarge = androidx.compose.material3.Typography().displayLarge.copy(
        fontFamily = SitkaFontFamily,
        fontWeight = FontWeight.Bold,
        fontSize = 48.sp,
        lineHeight = 56.sp,
        letterSpacing = (-0.5).sp
    ),
    displayMedium = androidx.compose.material3.Typography().displayMedium.copy(
        fontFamily = SitkaFontFamily,
        fontWeight = FontWeight.Bold,
        fontSize = 36.sp,
        lineHeight = 44.sp,
        letterSpacing = 0.sp
    ),
    displaySmall = androidx.compose.material3.Typography().displaySmall.copy(
        fontFamily = SitkaFontFamily,
        fontWeight = FontWeight.Bold,
        fontSize = 30.sp,
        lineHeight = 38.sp,
        letterSpacing = 0.sp
    ),
    headlineLarge = androidx.compose.material3.Typography().headlineLarge.copy(
        fontFamily = SitkaFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 24.sp,
        lineHeight = 32.sp,
        letterSpacing = 0.sp
    ),
    headlineMedium = androidx.compose.material3.Typography().headlineMedium.copy(
        fontFamily = SitkaFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 20.sp,
        lineHeight = 28.sp,
        letterSpacing = 0.sp
    ),
    headlineSmall = androidx.compose.material3.Typography().headlineSmall.copy(
        fontFamily = SitkaFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 17.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.sp
    ),
    titleLarge = androidx.compose.material3.Typography().titleLarge.copy(
        fontFamily = SitkaFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 17.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.sp
    ),
    titleMedium = androidx.compose.material3.Typography().titleMedium.copy(
        fontFamily = SitkaFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 15.sp,
        lineHeight = 22.sp,
        letterSpacing = 0.1.sp
    ),
    titleSmall = androidx.compose.material3.Typography().titleSmall.copy(
        fontFamily = SitkaFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 13.sp,
        lineHeight = 18.sp,
        letterSpacing = 0.1.sp
    ),
    bodyLarge = androidx.compose.material3.Typography().bodyLarge.copy(
        fontFamily = SitkaFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 15.sp,
        lineHeight = 24.sp, // 1.5 line height
        letterSpacing = 0.sp
    ),
    bodyMedium = androidx.compose.material3.Typography().bodyMedium.copy(
        fontFamily = SitkaFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 13.sp,
        lineHeight = 18.sp,
        letterSpacing = 0.sp
    ),
    bodySmall = androidx.compose.material3.Typography().bodySmall.copy(
        fontFamily = SitkaFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 11.sp,
        lineHeight = 16.sp,
        letterSpacing = 0.sp
    ),
    labelLarge = androidx.compose.material3.Typography().labelLarge.copy(
        fontFamily = SitkaFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 15.sp,
        lineHeight = 20.sp,
        letterSpacing = 0.1.sp
    ),
    labelMedium = androidx.compose.material3.Typography().labelMedium.copy(
        fontFamily = SitkaFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 13.sp,
        lineHeight = 16.sp,
        letterSpacing = 0.1.sp
    ),
    labelSmall = androidx.compose.material3.Typography().labelSmall.copy(
        fontFamily = SitkaFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 11.sp,
        lineHeight = 16.sp,
        letterSpacing = 0.1.sp
    ),
)
