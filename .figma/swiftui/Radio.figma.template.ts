// url=https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=63-119
// component=Radio
// source=platforms/swift/Sources/SitkaTokens/SitkaTokens.swift
//
// SwiftUI mapping for Radio. Sitka has no SwiftUI component library yet, so this shows
// native SwiftUI styled with the SitkaTokens package (import SitkaTokens).
import figma from 'figma'

const instance = figma.selectedInstance
const text = (layer: string, fallback: string): string => {
  const t = instance.findText(layer)
  return t && t.type === 'TEXT' ? t.textContent : fallback
}

const size = instance.getEnum('Size', { sm: '.small', md: '.regular', lg: '.large' })
const label = text('Option', 'Option')

export default {
  example: figma.swift`Picker("Choice", selection: $choice) {
    Text("${label}").tag(Choice.option)
}
.pickerStyle(.radioGroup) // macOS; on iOS use .inline inside a Form
.controlSize(${size})`,
  id: 'sitka-radio-swiftui',
}
