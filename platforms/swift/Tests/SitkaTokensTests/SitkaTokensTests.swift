import XCTest
@testable import SitkaTokens

/// Mirrors src/__tests__/color-decisions.test.ts so the Swift output is held to the same rules.
final class SitkaTokensTests: XCTestCase {
    private func luminance(_ c: SitkaRGBA) -> Double {
        func lin(_ v: Double) -> Double { v <= 0.03928 ? v / 12.92 : pow((v + 0.055) / 1.055, 2.4) }
        return 0.2126 * lin(c.red) + 0.7152 * lin(c.green) + 0.0722 * lin(c.blue)
    }

    private func ratio(_ a: SitkaRGBA, _ b: SitkaRGBA) -> Double {
        let (l1, l2) = (luminance(a), luminance(b))
        return (max(l1, l2) + 0.05) / (min(l1, l2) + 0.05)
    }

    func testStatusTextClearsAAOnSurfaces() {
        for theme in [SitkaTokens.light, SitkaTokens.dark] {
            for text in [theme.statusSuccessText, theme.statusWarningText, theme.statusDangerText, theme.statusCautionText] {
                for surface in [theme.background, theme.surface, theme.surfaceRaised, theme.surfaceHover] {
                    XCTAssertGreaterThanOrEqual(ratio(text, surface), 4.5)
                }
            }
        }
    }

    func testTextOnSolidFillsClearsAA() {
        for theme in [SitkaTokens.light, SitkaTokens.dark] {
            XCTAssertGreaterThanOrEqual(ratio(theme.onAccent, theme.accent), 4.5)
            XCTAssertGreaterThanOrEqual(ratio(theme.onDanger, theme.dangerSolid), 4.5)
        }
    }

    func testScalesArePresent() {
        XCTAssertEqual(SitkaTokens.Spacing.s4, 16)
        XCTAssertEqual(SitkaTokens.Radius.md, 10)
        XCTAssertFalse(SitkaTokens.version.isEmpty)
    }
}
