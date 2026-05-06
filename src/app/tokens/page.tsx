import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { TokensGrid } from "@/components/docs/TokensGrid";

export const metadata: Metadata = { title: "Design Tokens" };

export default function TokensPage() {
  return (
    <div>
      <PageHeader
        title="Design Tokens"
        description="All design decisions are expressed as tokens — named values that map intent to implementation across Web, iOS, and macOS. Changes to tokens propagate everywhere."
      />
      <TokensGrid />
    </div>
  );
}
