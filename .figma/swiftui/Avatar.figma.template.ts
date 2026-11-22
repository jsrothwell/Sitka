// url=https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=37-1223
// component=Avatar
// source=platforms/swift/Sources/SitkaTokens/SitkaTokens.swift
//
// SwiftUI mapping for Avatar. Sitka has no SwiftUI component library yet, so this shows
// native SwiftUI styled with the SitkaTokens package (import SitkaTokens).
import figma from 'figma'

const instance = figma.selectedInstance
const text = (layer: string, fallback: string): string => {
  const t = instance.findText(layer)
  return t && t.type === 'TEXT' ? t.textContent : fallback
}

const side = instance.getEnum('Property 1', { xs: '24', sm: '32', md: '40', lg: '48', xl: '64' })
const font = instance.getEnum('Property 1', { xs: '.caption2', sm: '.caption', md: '.footnote', lg: '.subheadline', xl: '.title3' })
const initials = text('JR', 'JR')

export default {
  example: figma.swift`Text("${initials}")
    .font(${font}.weight(.semibold))
    .foregroundStyle(Color.sitka(\\.textPrimary))
    .frame(width: ${side}, height: ${side})
    .background(Color.sitka(\\.surfaceRaised), in: Circle())
    .accessibilityLabel("Profile picture")`,
  id: 'sitka-avatar-swiftui',
}
