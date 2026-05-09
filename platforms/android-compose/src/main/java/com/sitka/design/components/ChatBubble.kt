package com.sitka.design.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.sitka.design.theme.*

enum class MessageRole {
    User,
    Assistant,
    System
}

/**
 * Sitka ChatBubble — AI-native conversation bubble for Jetpack Compose.
 * Aligns automatically (user=right, assistant=left, system=center).
 */
@Composable
fun ChatBubble(
    role: MessageRole,
    content: String,
    modifier: Modifier = Modifier,
    streaming: Boolean = false,
    timestamp: String? = null,
    onClick: (() -> Unit)? = null
) {
    val colors = MaterialTheme.colorScheme
    val shapes = SitkaShapes

    val bubbleColor = when (role) {
        MessageRole.User -> colors.primary
        MessageRole.Assistant -> colors.surfaceVariant
        MessageRole.System -> colors.surface
    }

    val textColor = when (role) {
        MessageRole.User -> Color.White
        MessageRole.Assistant -> colors.onSurfaceVariant
        MessageRole.System -> colors.onSurface.copy(alpha = 0.7f)
    }

    val alignment = when (role) {
        MessageRole.User -> Alignment.End
        MessageRole.Assistant -> Alignment.Start
        MessageRole.System -> Alignment.CenterHorizontally
    }

    val cornerRadius = when (role) {
        MessageRole.User -> shapes.Button
        MessageRole.Assistant -> RoundedCornerShape(10.dp)
        MessageRole.System -> shapes.Medium
    }

    Column(
        modifier = modifier.fillMaxWidth(),
        horizontalAlignment = alignment
    ) {
        Box(
            modifier = Modifier
                .clickable(enabled = onClick != null) { onClick?.invoke() }
                .then(
                    if (role == MessageRole.User) Modifier else Modifier
                )
                .background(
                    color = bubbleColor,
                    shape = cornerRadius
                )
                .shadow(
                    elevation = 2.dp,
                    shape = cornerRadius,
                    ambientColor = Color.Transparent,
                    spotColor = if (role == MessageRole.User) colors.primary.copy(0.3f) else Color.Transparent
                )
                .padding(horizontal = 14.dp, vertical = 8.dp)
                .widthIn(max = 280.dp)
        ) {
            Text(
                text = content + if (streaming) "|" else "",
                color = textColor,
                style = MaterialTheme.typography.bodyMedium,
                overflow = TextOverflow.Wrap,
                maxLines = Int.MAX_VALUE
            )
        }

        timestamp?.let { ts ->
            if (role != MessageRole.System) {
                Text(
                    text = ts,
                    style = MaterialTheme.typography.labelSmall,
                    color = colors.onSurfaceVariant.copy(alpha = 0.6f),
                    modifier = Modifier.padding(start = 4.dp, top = 2.dp)
                )
            }
        }
    }
}
