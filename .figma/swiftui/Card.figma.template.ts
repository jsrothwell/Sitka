// url=https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=25-273
// component=Card
// source=platforms/swift/Sources/SitkaTokens/SitkaTokens.swift
//
// SwiftUI mapping for Card. Sitka has no SwiftUI component library yet, so this shows
// native SwiftUI styled with the SitkaTokens package (import SitkaTokens).
import figma from 'figma'

const instance = figma.selectedInstance
const text = (layer: string, fallback: string): string => {
  const t = instance.findText(layer)
  return t && t.type === 'TEXT' ? t.textContent : fallback
}

export default {
  example: figma.swift`VStack(alignment: .leading, spacing: SitkaTokens.Spacing.s3) {
    Text("Card title").font(.headline)
    Divider()
    Text("Card body content goes here.")
        .foregroundStyle(Color.sitka(\\.textSecondary))
}
.padding(SitkaTokens.Spacing.s5)
.background(Color.sitka(\\.surface), in: RoundedRectangle(cornerRadius: SitkaTokens.Radius.lg))
.overlay(RoundedRectangle(cornerRadius: SitkaTokens.Radius.lg).strokeBorder(Color.sitka(\\.border)))`,
  id: 'sitka-card-swiftui',
}
