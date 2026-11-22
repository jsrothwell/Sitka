// url=https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=63-97
// component=Checkbox
// source=platforms/swift/Sources/SitkaTokens/SitkaTokens.swift
//
// SwiftUI mapping for Checkbox. Sitka has no SwiftUI component library yet, so this shows
// native SwiftUI styled with the SitkaTokens package (import SitkaTokens).
import figma from 'figma'

const instance = figma.selectedInstance
const text = (layer: string, fallback: string): string => {
  const t = instance.findText(layer)
  return t && t.type === 'TEXT' ? t.textContent : fallback
}

const size = instance.getEnum('Size', { sm: '.small', md: '.regular', lg: '.large' })
const state = instance.getEnum('State', { Unchecked: 'false', Checked: 'true', Indeterminate: 'mixed' })
const label = text('Label', 'Label')

export default {
  example: state === 'mixed'
    ? figma.swift`// Mixed state: bind to a collection so the checkbox shows "some selected".
Toggle("${label}", sources: $items, isOn: \\.isSelected)
    .toggleStyle(.checkbox) // macOS; iOS has no checkbox, use a Toggle
    .controlSize(${size})`
    : figma.swift`Toggle("${label}", isOn: $isOn) // isOn: ${state}
    .toggleStyle(.checkbox) // macOS; iOS has no checkbox, use a Toggle
    .controlSize(${size})`,
  id: 'sitka-checkbox-swiftui',
}
