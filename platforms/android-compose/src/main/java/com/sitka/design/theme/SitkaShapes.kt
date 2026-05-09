package com.sitka.design.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.unit.dp

// Sitka shape tokens — border radius mapping from tokens
object SitkaShapes {
    val Small = RoundedCornerShape(6.dp)
    val Medium = RoundedCornerShape(10.dp)
    val Large = RoundedCornerShape(14.dp)
    val XLarge = RoundedCornerShape(20.dp)
    val XXLarge = RoundedCornerShape(28.dp)
    val Full = RoundedCornerShape(percent = 50)

    // Window chrome (visionOS / desktop)
    val WindowTitlebar = RoundedCornerShape(topStart = 12.dp, topEnd = 12.dp)
    val CardMedium = RoundedCornerShape(12.dp)
    val CardLarge = RoundedCornerShape(16.dp)
    val Input = RoundedCornerShape(10.dp)
    val Button = RoundedCornerShape(10.dp)
    val Chip = RoundedCornerShape(8.dp)
}
