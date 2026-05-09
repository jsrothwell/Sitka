import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = { title: "React Native Library" };

export default function ReactNativePage() {
  return (
    <div>
      <PageHeader
        title="React Native"
        description="Bridge Sitka design tokens and glass aesthetics to mobile apps using React Native."
        badge="v1.0.0"
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Installation</h2>
        <CodeBlock
          language="bash"
          code="npm install @sitka/react-native framer-motion-react-native"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Usage</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          Import the Sitka theme provider to wrap your application. This provides access to tokens and glass materials.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { SitkaProvider, Colors, Theme } from '@sitka/react-native';

export default function App() {
  return (
    <SitkaProvider theme={Theme.dark}>
      <YourApp />
    </SitkaProvider>
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Tokens</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          Tokens are available as a typed object for use in your StyleSheet.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { StyleSheet } from 'react-native';
import { Theme } from '@sitka/react-native';

const styles = StyleSheet.create({
  container: {
    padding: Theme.space[4],
    backgroundColor: Theme.colors.dark.surface,
    borderRadius: Theme.radius.lg,
  },
  text: {
    color: Theme.colors.dark.textPrimary,
    fontSize: Theme.typography.fontSize.base,
  }
});`}
        />
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Glass on Mobile</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          Use the BlurView component (powered by expo-blur or similar) to achieve the Sitka glass look.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { BlurView } from '@sitka/react-native';

<BlurView 
  intensity={Theme.materials.blur.lg} 
  style={styles.glassPanel}
>
  <Text>Liquid Glass Mobile</Text>
</BlurView>`}
        />
      </section>
    </div>
  );
}
