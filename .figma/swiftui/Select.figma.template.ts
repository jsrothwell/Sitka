// url=https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=65-109
// component=Select
// source=platforms/swift/Sources/SitkaTokens/SitkaTokens.swift
//
// SwiftUI mapping for Select. Sitka has no SwiftUI component library yet, so this shows
// native SwiftUI styled with the SitkaTokens package (import SitkaTokens).
import figma from 'figma'

const instance = figma.selectedInstance
const text = (layer: string, fallback: string): string => {
  const t = instance.findText(layer)
  return t && t.type === 'TEXT' ? t.textContent : fallback
}

const size = instance.getEnum('Size', { sm: '.small', md: '.regular', lg: '.large' })
const isError = instance.getEnum('State', { Error: true })
const label = text('Label', 'Label')
const prompt = text('Choose option', 'Choose option')

export default {
  example: figma.swift`VStack(alignment: .leading, spacing: SitkaTokens.Spacing.s1) {
    Picker("${label}", selection: $selection) {
        Text("${prompt}").tag(Option?.none)
        ForEach(options) { Text($0.name).tag(Optional($0)) }
    }
    .pickerStyle(.menu)
    .controlSize(${size})
${isError ? '    Text("Required field")\n        .font(.caption)\n        .foregroundStyle(Color.sitka(\\.statusDangerText))\n' : ''}}`,
  id: 'sitka-select-swiftui',
}
