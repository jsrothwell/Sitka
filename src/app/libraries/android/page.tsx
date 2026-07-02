import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = { title: "Android Library" };

export default function AndroidPage() {
  return (
    <div>
      <PageHeader
        title="Android · Jetpack Compose"
        description="Native Android library for Sitka. Built with Jetpack Compose and Material 3 interoperability."
        badge="v1.0.0"
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Installation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          Add the Sitka repository and dependency to your <code className="font-mono">build.gradle.kts</code> file.
        </p>
        <CodeBlock
          language="kotlin"
          code={`dependencies {
    implementation("com.sitka.design:android-compose:1.0.0")
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Usage</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          Wrap your activity content in <code className="font-mono">SitkaTheme</code>.
        </p>
        <CodeBlock
          language="kotlin"
          code={`import com.sitka.design.theme.SitkaTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SitkaTheme(darkTheme = true) {
                HomeScreen()
            }
        }
    }
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Tokens</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          Access tokens via the <code className="font-mono">SitkaTheme</code> singleton.
        </p>
        <CodeBlock
          language="kotlin"
          code={`Text(
    text = "Hello Sitka",
    color = SitkaTheme.colors.textPrimary,
    style = SitkaTheme.typography.base,
    modifier = Modifier.padding(SitkaTheme.spacing.md)
)`}
        />
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Glass Composables</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          The Android library includes a custom <code className="font-mono">GlassCard</code> that uses RenderEffect (API 31+) for blurring.
        </p>
        <CodeBlock
          language="kotlin"
          code={`import com.sitka.design.components.GlassCard

GlassCard(
    modifier = Modifier.size(200.dp),
    blurRadius = SitkaTheme.materials.blurLarge
) {
    Text("Spatial Android")
}`}
        />
      </section>
    </div>
  );
}
