// url=https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=37-1498
// component=Input
// source=platforms/swift/Sources/SitkaTokens/SitkaTokens.swift
//
// SwiftUI mapping for Input. Sitka has no SwiftUI component library yet, so this shows
// native SwiftUI styled with the SitkaTokens package (import SitkaTokens).
import figma from 'figma'

const instance = figma.selectedInstance
const text = (layer: string, fallback: string): string => {
  const t = instance.findText(layer)
  return t && t.type === 'TEXT' ? t.textContent : fallback
}

const kind = instance.getEnum('Property 1', { email: 'email', search: 'search', password: 'password' })
const size = instance.getEnum('Property 3', { small: '.small', medium: '.regular', large: '.large' })
const field = kind === 'password'
  ? 'SecureField("Password", text: $password)\n    .textContentType(.password)'
  : kind === 'search'
    ? 'TextField("Search components…", text: $query)\n    .textInputAutocapitalization(.never)\n    .submitLabel(.search)'
    : 'TextField("you@example.com", text: $email)\n    .textContentType(.emailAddress)\n    .keyboardType(.emailAddress)\n    .textInputAutocapitalization(.never)'

export default {
  example: figma.swift`${field}
    .textFieldStyle(.roundedBorder)
    .controlSize(${size})`,
  id: 'sitka-input-swiftui',
}
