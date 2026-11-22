// url=https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=25-246
// component=Switch
// source=platforms/swift/Sources/SitkaTokens/SitkaTokens.swift
//
// SwiftUI mapping for Switch. Sitka has no SwiftUI component library yet, so this shows
// native SwiftUI styled with the SitkaTokens package (import SitkaTokens).
import figma from 'figma'

const instance = figma.selectedInstance
const text = (layer: string, fallback: string): string => {
  const t = instance.findText(layer)
  return t && t.type === 'TEXT' ? t.textContent : fallback
}

export default {
  example: figma.swift`Toggle("Notifications", isOn: $isOn)
    .tint(Color.sitka(\\.accent))`,
  id: 'sitka-switch-swiftui',
}
