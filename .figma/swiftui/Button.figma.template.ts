// url=https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=37-668
// component=Button
// source=platforms/swift/Sources/SitkaTokens/SitkaTokens.swift
//
// SwiftUI mapping for Button. Sitka has no SwiftUI component library yet, so this shows
// native SwiftUI styled with the SitkaTokens package (import SitkaTokens).
import figma from 'figma'

const instance = figma.selectedInstance
const text = (layer: string, fallback: string): string => {
  const t = instance.findText(layer)
  return t && t.type === 'TEXT' ? t.textContent : fallback
}

const size = instance.getEnum('Property 1', { small: '.small', medium: '.regular', large: '.large', icon: '.regular' })
const style = instance.getEnum('Property 2', {
  primary: '.buttonStyle(.borderedProminent)\n.tint(Color.sitka(\\.accent))\n.foregroundStyle(Color.sitka(\\.onAccent))',
  secondary: '.buttonStyle(.bordered)\n.tint(Color.sitka(\\.textPrimary))',
  ghost: '.buttonStyle(.borderless)\n.tint(Color.sitka(\\.textSecondary))',
  danger: '.buttonStyle(.borderedProminent)\n.tint(Color.sitka(\\.dangerSolid))',
  glass: '.buttonStyle(.glass) // iOS 26 / macOS 26',
})
const role = instance.getEnum('Property 2', { danger: 'role: .destructive' })
const isIcon = instance.getEnum('Property 1', { icon: true })
const label = text('Button', 'Button')
const open = role ? `Button(${isIcon ? '' : `"${label}", `}${role})` : (isIcon ? 'Button' : `Button("${label}")`)

export default {
  example: isIcon
    ? figma.swift`Button(${role ? role + ', ' : ''}action: {}) {
    Image(systemName: "plus")
}
.accessibilityLabel("Add")
.controlSize(${size})
${style}`
    : figma.swift`${open} {
    // action
}
.controlSize(${size})
${style}`,
  id: 'sitka-button-swiftui',
}
