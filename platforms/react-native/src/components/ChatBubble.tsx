import React from "react";
import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import { Colors, Radius, Space, Typography, Shadows, createStyle } from "../tokens";

export type MessageRole = "user" | "assistant" | "system";

export interface ChatBubbleProps {
  /** Who sent the message */
  role: MessageRole;
  /** Message text content */
  content: string;
  /** Whether this message is currently streaming */
  streaming?: boolean;
  /** Optional timestamp string */
  timestamp?: string;
  /** On press handler */
  onPress?: () => void;
  /** Custom style overrides */
  style?: any;
}

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const roleConfig = {
  user: {
    bubbleBg: Colors.brandCyan,
    textColor: "#ffffff" as SitkaColor,
    align: "flex-end" as const,
    borderBottomRightRadius: Radius.sm,
  },
  assistant: {
    bubbleBg: Colors.dark.surfaceRaised,
    textColor: Colors.dark.textPrimary,
    align: "flex-start" as const,
    borderBottomLeftRadius: Radius.sm,
  },
  system: {
    bubbleBg: Colors.dark.surface,
    textColor: Colors.dark.textSecondary,
    align: "center" as const,
    borderBottomRightRadius: Radius.md,
  },
};

export function ChatBubble({ role, content, streaming = false, timestamp, onPress, style }: ChatBubbleProps) {
  const config = roleConfig[role];

  return (
    <View style={[styles.container, { justifyContent: config.align }]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.bubble,
          {
            backgroundColor: config.bubbleBg,
            borderRadius: [Radius.lg, config.borderBottomRightRadius],
            ...Platform.select({
              ios: Shadows.glass,
              android: { elevation: pressed ? 2 : 0 },
            }),
          },
          pressed && styles.pressed,
          style,
        ]}
      >
        <Text style={[styles.text, { color: config.textColor }]} numberOfLines={0}>
          {content}
          {streaming && <Text style={{ opacity: 0.6 }}>|</Text>}
        </Text>
      </Pressable>

      {timestamp && (
        <Text style={styles.timestamp}>{timestamp}</Text>
      )}
    </View>
  );
}

const styles = createStyle({
  container: {
    marginVertical: Space[1],
    paddingHorizontal: Space[3],
    maxWidth: "80%",
  },
  bubble: {
    paddingVertical: Space[2] + 2,
    paddingHorizontal: Space[3],
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  text: {
    fontFamily: Typography.fontFamily.sans,
    fontSize: Typography.fontSize.base,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
  },
  timestamp: {
    fontSize: Typography.fontSize.xs,
    color: Colors.dark.textTertiary,
    marginTop: Space[1],
    alignSelf: "flex-end",
    opacity: 0.7,
  },
});

ChatBubble.displayName = "ChatBubble";
