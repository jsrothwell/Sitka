import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

export type HapticCategory = "impact" | "notification" | "selection";
export type HapticVariant =
  | "light"
  | "medium"
  | "heavy"
  | "success"
  | "warning"
  | "error"
  | "click"
  | "pick";

export type HapticType = `${
  | "impact"
  | "notification"
  | "selection"}.${"light" | "medium" | "heavy" | "success" | "warning" | "error" | "click" | "pick"}`;

interface UseHapticReturn {
  /** Trigger a haptic feedback event */
  trigger: (type: HapticType) => void;
  /** Prepare haptic engine (call before anticipated action) */
  prepare: (category?: HapticCategory) => void;
  /** Check if haptics are available on this device */
  isAvailable: boolean;
}

export function useHaptic(): UseHapticReturn {
  const isAvailable = Platform.OS === "ios" || Platform.OS === "android";

  const prepare = (category: HapticCategory = "impact") => {
    if (!isAvailable) return;
    if (Platform.OS === "ios") {
      switch (category) {
        case "impact":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case "notification":
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case "selection":
          Haptics.selectionAsync();
          break;
      }
    }
  };

  const trigger = (type: HapticType) => {
    if (!isAvailable) return;

    const [category, variant] = type.split(".") as [HapticCategory, HapticVariant];

    if (Platform.OS === "ios" || Platform.OS === "android") {
      if (category === "impact") {
        const styleMap = {
          light: Haptics.ImpactFeedbackStyle.Light,
          medium: Haptics.ImpactFeedbackStyle.Medium,
          heavy: Haptics.ImpactFeedbackStyle.Heavy,
        };
        Haptics.impactAsync(styleMap[variant] || Haptics.ImpactFeedbackStyle.Medium);
      } else if (category === "notification") {
        const notificationMap = {
          success: Haptics.NotificationFeedbackType.Success,
          warning: Haptics.NotificationFeedbackType.Warning,
          error: Haptics.NotificationFeedbackType.Error,
        };
        Haptics.notificationAsync(notificationMap[variant as keyof typeof notificationMap] || Haptics.NotificationFeedbackType.Success);
      } else if (category === "selection") {
        Haptics.selectionAsync();
      }
    }
  };

  return { trigger, prepare, isAvailable };
}

// Web fallback hook (no-op)
export function useWebHaptic() {
  return {
    trigger: (type: HapticType) => {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        const patterns: Record<HapticType, number | number[]> = {
          "impact.light": 8,
          "impact.medium": 15,
          "impact.heavy": 25,
          "notification.success": [20, 50, 20],
          "notification.warning": [30, 30, 30],
          "notification.error": [40, 40, 40],
          "selection.click": 8,
          "selection.pick": 10,
        };
        navigator.vibrate(patterns[type]);
      }
    },
    prepare: () => {},
    isAvailable: typeof navigator !== "undefined" && "vibrate" in navigator,
  };
}
