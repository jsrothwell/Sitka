// url=https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=37-912
// component=Badge
// source=platforms/swift/Sources/SitkaTokens/SitkaTokens.swift
//
// SwiftUI mapping for Badge. Sitka has no SwiftUI component library yet, so this shows
// native SwiftUI styled with the SitkaTokens package (import SitkaTokens).
import figma from 'figma'

const instance = figma.selectedInstance
const text = (layer: string, fallback: string): string => {
  const t = instance.findText(layer)
  return t && t.type === 'TEXT' ? t.textContent : fallback
}

const colors = instance.getEnum('Property 1', {
  default: ['textSecondary', 'surfaceRaised', '1'],
  primary: ['textPrimary', 'accentSubtle', '1'],
  success: ['statusSuccessText', 'statusSuccess', '0.12'],
  warning: ['statusWarningText', 'statusWarning', '0.12'],
  danger: ['statusDangerText', 'statusDanger', '0.12'],
  ghost: ['textTertiary', 'surfaceHover', '1'],
}) ?? ['textSecondary', 'surfaceRaised', '1']
const font = instance.getEnum('Property 2', { sm: '.caption2', md: '.caption', lg: '.footnote', dot: '.caption' })
const dot = instance.getEnum('Property 2', { dot: true })
const [fg, bg, alpha] = colors
const fill = alpha === '1' ? `Color.sitka(\\.${bg})` : `Color.sitka(\\.${bg}).opacity(${alpha})`

export default {
  example: figma.swift`HStack(spacing: SitkaTokens.Spacing.s1) {
${dot ? '    Circle().frame(width: 6, height: 6)\n' : ''}    Text("Label")
}
.font(${font}.weight(.semibold))
.foregroundStyle(Color.sitka(\\.${fg}))
.padding(.horizontal, SitkaTokens.Spacing.s2)
.padding(.vertical, 2)
.background(${fill}, in: Capsule())`,
  id: 'sitka-badge-swiftui',
}
