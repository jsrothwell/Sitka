// url=https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=67-157
// component=CodeBlock
// source=platforms/swift/Sources/SitkaTokens/SitkaTokens.swift
//
// SwiftUI mapping for CodeBlock. Sitka has no SwiftUI component library yet, so this shows
// native SwiftUI styled with the SitkaTokens package (import SitkaTokens).
import figma from 'figma'

const instance = figma.selectedInstance
const text = (layer: string, fallback: string): string => {
  const t = instance.findText(layer)
  return t && t.type === 'TEXT' ? t.textContent : fallback
}

const code = instance.getEnum('Language', {
  tsx: "import { Button } from 'sitka-ui'",
  bash: 'npm install sitka-ui',
  json: '{ "name": "sitka", "type": "module" }',
  css: ':root { --accent: 0 192 232; }',
})

export default {
  example: figma.swift`Text(${JSON.stringify(code ?? '')})
    .font(.system(.footnote, design: .monospaced))
    .textSelection(.enabled)
    .padding(SitkaTokens.Spacing.s3)
    .frame(maxWidth: .infinity, alignment: .leading)
    .background(Color.sitka(\\.surfaceRaised), in: RoundedRectangle(cornerRadius: SitkaTokens.Radius.md))`,
  id: 'sitka-codeblock-swiftui',
}
