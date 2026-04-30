import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { TokenExport } from "@/components/docs/TokenExport";

export const metadata: Metadata = { title: "Token Export" };

export default function TokenExportPage() {
  return (
    <div>
      <PageHeader
        title="Token Export"
        description="Export the Sitka token system to JSON (W3C Design Token Community Group format) or Swift for direct use in iOS projects."
      />
      <TokenExport />
    </div>
  );
}
