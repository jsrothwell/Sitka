// swift-tools-version: 5.9
// Sitka design tokens for Swift. Sources are generated from src/tokens/tokens.json by
// `npm run tokens:build`; CI fails if they're out of date, so a tagged release always matches.
import PackageDescription

let package = Package(
    name: "Sitka",
    platforms: [.iOS(.v16), .macOS(.v13), .watchOS(.v9), .tvOS(.v16), .visionOS(.v1)],
    products: [
        .library(name: "SitkaTokens", targets: ["SitkaTokens"]),
    ],
    targets: [
        .target(name: "SitkaTokens", path: "platforms/swift/Sources/SitkaTokens"),
        .testTarget(name: "SitkaTokensTests", dependencies: ["SitkaTokens"], path: "platforms/swift/Tests/SitkaTokensTests"),
    ]
)
