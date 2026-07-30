import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Switch } from "@/components/ui/Switch";
import { Checkbox } from "@/components/ui/Checkbox";
import { Radio, RadioGroup } from "@/components/ui/Radio";
import { Box } from "@/components/ui/Box";
import { Stack, Inline } from "@/components/ui/Stack";
import { Avatar } from "@/components/ui/Avatar";
import { Spinner } from "@/components/ui/Spinner";
import { Divider } from "@/components/ui/Divider";
import { ArrowRight, Download, Mail, Search } from "lucide-react";

export const metadata: Metadata = { title: "Kitchen Sink" };

const TYPE_SCALE = [
  { name: "Display", size: "48px", weight: 600, tracking: "-0.02em" },
  { name: "H1", size: "36px", weight: 600, tracking: "-0.02em" },
  { name: "H2", size: "24px", weight: 600, tracking: "-0.01em" },
  { name: "H3", size: "20px", weight: 600, tracking: "0" },
  { name: "Body", size: "15px", weight: 400, tracking: "0" },
  { name: "Caption", size: "11px", weight: 500, tracking: "0.04em" },
];

const BUTTON_VARIANTS = ["primary", "secondary", "ghost", "danger", "glass"] as const;
const BUTTON_SIZES = ["sm", "md", "lg"] as const;
const BADGE_VARIANTS = ["default", "primary", "success", "warning", "danger", "ghost"] as const;
const CARD_VARIANTS = ["default", "elevated", "ghost", "accent"] as const;

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-14 scroll-mt-24">
      <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">{title}</h2>
      {description && (
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
      <div
        id={`${id}-preview`}
        className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8"
      >
        {children}
      </div>
    </section>
  );
}

export default function KitchenSinkPage() {
  return (
    <div id="kitchen-sink-page">
      <PageHeader
        title="Kitchen Sink"
        badge="Internal"
        description="Every core Sitka component rendered live in one place — for visual QA, token verification, and quick copy-paste reference. Not a navigation page; not linked from the sidebar."
      />

      {/* ── Buttons ──────────────────────────────────── */}
      <Section id="buttons" title="Buttons" description="All variants at all sizes, plus icon and loading states.">
        <Stack gap="6">
          {BUTTON_VARIANTS.map((variant) => (
            <Inline key={variant} gap="4" align="center">
              <span className="w-20 flex-shrink-0 text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                {variant}
              </span>
              {BUTTON_SIZES.map((size) => (
                <Button key={size} variant={variant} size={size}>
                  Button
                </Button>
              ))}
              <Button variant={variant} leftIcon={<Download className="w-4 h-4" />}>
                Download
              </Button>
              <Button variant={variant} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Continue
              </Button>
              <Button variant={variant} loading>
                Loading
              </Button>
              <Button variant={variant} disabled>
                Disabled
              </Button>
            </Inline>
          ))}
        </Stack>
      </Section>

      {/* ── Inputs ───────────────────────────────────── */}
      <Section id="inputs" title="Inputs" description="Text inputs, textarea, and selection controls across states.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Email" placeholder="you@example.com" leftIcon={<Mail className="w-full h-full" />} />
          <Input label="Search" placeholder="Search components…" leftIcon={<Search className="w-full h-full" />} />
          <Input label="Disabled" placeholder="Can't touch this" disabled />
          <Input label="Error state" placeholder="you@example.com" error="Enter a valid email address" />
          <div className="md:col-span-2">
            <Textarea label="Message" placeholder="Write something…" rows={3} />
          </div>
          <Stack gap="3">
            <Inline gap="2" align="center">
              <Switch defaultChecked /> <span className="text-[13px] text-[rgb(var(--text-secondary))]">Switch</span>
            </Inline>
            <Inline gap="2" align="center">
              <Checkbox defaultChecked /> <span className="text-[13px] text-[rgb(var(--text-secondary))]">Checkbox</span>
            </Inline>
            <RadioGroup name="ks-radio" value="on" orientation="horizontal">
              <Radio value="on" label="Radio" />
            </RadioGroup>
          </Stack>
        </div>
      </Section>

      {/* ── Cards ────────────────────────────────────── */}
      <Section id="cards" title="Cards" description="All card variants with header, body, and footer slots.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARD_VARIANTS.map((variant) => (
            <Card key={variant} variant={variant}>
              <CardHeader>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                  {variant}
                </span>
              </CardHeader>
              <CardBody>
                <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed">
                  Card body content for the {variant} variant.
                </p>
              </CardBody>
              <CardFooter>
                <Button variant="ghost" size="sm">Action</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── Badges ───────────────────────────────────── */}
      <Section id="badges" title="Badges" description="Status and label badges, with and without a leading dot.">
        <Inline gap="3">
          {BADGE_VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant} dot>
              {variant}
            </Badge>
          ))}
        </Inline>
        <Inline gap="3" className="mt-4">
          {BADGE_VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </Inline>
      </Section>

      {/* ── Typography ───────────────────────────────── */}
      <Section id="typography" title="Typography" description="Core type scale rendered at true size and weight.">
        <Stack gap="4">
          {TYPE_SCALE.map((t) => (
            <div key={t.name} className="flex items-baseline gap-6">
              <span className="w-16 flex-shrink-0 text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                {t.name}
              </span>
              <span
                className="text-[rgb(var(--text-primary))]"
                style={{ fontSize: t.size, fontWeight: t.weight, letterSpacing: t.tracking }}
              >
                The quick brown fox jumps
              </span>
            </div>
          ))}
        </Stack>
      </Section>

      {/* ── Layout containers ───────────────────────── */}
      <Section id="layout" title="Layout Containers" description="Box and Stack primitives used to compose every page in Sitka.">
        <Stack gap="6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">
              Stack (direction=&quot;row&quot;, gap=&quot;4&quot;)
            </p>
            <Stack direction="row" gap="4">
              {[1, 2, 3].map((n) => (
                <Box
                  key={n}
                  className="h-16 w-16 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] flex items-center justify-center text-[13px] text-[rgb(var(--text-secondary))]"
                >
                  {n}
                </Box>
              ))}
            </Stack>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">
              Stack (direction=&quot;col&quot;, gap=&quot;2&quot;)
            </p>
            <Stack direction="col" gap="2" className="max-w-xs">
              {[1, 2, 3].map((n) => (
                <Box
                  key={n}
                  className="h-10 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] flex items-center px-3 text-[13px] text-[rgb(var(--text-secondary))]"
                >
                  Row {n}
                </Box>
              ))}
            </Stack>
          </div>
          <Divider />
          <Inline gap="4" align="center">
            <Avatar alt="Jamie Rothwell" size="sm" />
            <Avatar alt="Jamie Rothwell" size="md" />
            <Avatar alt="Jamie Rothwell" size="lg" />
            <Spinner />
          </Inline>
        </Stack>
      </Section>

      {/* ── Glassmorphism surfaces ───────────────────── */}
      <Section
        id="glass"
        title="Glassmorphism Surfaces"
        description="The .glass utility class and glass Button/Card variants, shown over a busy background so the blur and translucency are visible."
      >
        <div
          className="rounded-lg p-10 flex flex-wrap gap-6 items-center"
          style={{
            background:
              "linear-gradient(135deg, rgb(139,109,255) 0%, rgb(52,168,101) 50%, rgb(9,9,12) 100%)",
          }}
        >
          <div className="glass rounded-xl px-6 py-5 w-56">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-1">
              .glass
            </p>
            <p className="text-[13px] text-[rgb(var(--text-primary))]">
              blur(20px) saturate(180%)
            </p>
          </div>
          <Button variant="glass">Glass button</Button>
          <Card variant="default" className="glass w-56 !bg-transparent !border-white/[0.12]">
            <CardBody>
              <p className="text-[13px] text-[rgb(var(--text-primary))]">Glass card surface</p>
            </CardBody>
          </Card>
        </div>
      </Section>
    </div>
  );
}
