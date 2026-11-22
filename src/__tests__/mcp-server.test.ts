import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/** Sends JSON-RPC requests to packages/mcp/server.mjs over stdio and returns the responses by id. */
async function rpc(requests: object[]): Promise<Map<number, any>> {
  const child = spawn(process.execPath, [resolve(__dirname, "../../packages/mcp/server.mjs")]);
  const ids = requests.filter((r: any) => r.id !== undefined).length;
  const out = new Map<number, any>();
  let buf = "";
  return new Promise((done, fail) => {
    const timer = setTimeout(() => (child.kill(), fail(new Error("MCP server timed out"))), 10_000);
    child.stdout.on("data", (chunk) => {
      buf += chunk;
      let nl;
      while ((nl = buf.indexOf("\n")) >= 0) {
        const msg = JSON.parse(buf.slice(0, nl));
        buf = buf.slice(nl + 1);
        out.set(msg.id, msg);
        if (out.size === ids) {
          clearTimeout(timer);
          child.kill();
          done(out);
        }
      }
    });
    for (const r of requests) child.stdin.write(JSON.stringify({ jsonrpc: "2.0", ...r }) + "\n");
  });
}

const call = (id: number, name: string, args: object = {}) => ({ id, method: "tools/call", params: { name, arguments: args } });
const text = (msg: any) => msg.result.content[0].text as string;

describe("Sitka MCP server", () => {
  it("answers the MCP handshake and every tool", async () => {
    const res = await rpc([
      { id: 1, method: "initialize", params: { protocolVersion: "2025-06-18" } },
      { method: "notifications/initialized" },
      { id: 2, method: "tools/list" },
      call(3, "get_component", { name: "button" }),
      call(4, "get_tokens", { path: "color.themes.light" }),
      call(5, "check_contrast", { foreground: "textTertiary", background: "background", theme: "light" }),
      call(6, "search_docs", { query: "contrast" }),
      call(7, "get_component", { name: "Nope" }),
      { id: 8, method: "no/such" },
    ]);
    expect(res.get(1).result.serverInfo.name).toBe("sitka");
    expect(res.get(2).result.tools.map((t: any) => t.name)).toEqual([
      "list_components",
      "get_component",
      "get_tokens",
      "search_docs",
      "check_contrast",
    ]);
    expect(JSON.parse(text(res.get(3))).import).toContain('from "sitka-ui"');
    expect(text(res.get(4))).toContain("color.themes.light.onAccent");
    expect(text(res.get(5))).toMatch(/Normal text AA \(4\.5\): pass/);
    expect(text(res.get(6))).toContain("/foundations/contrast/");
    expect(res.get(7).result.isError).toBe(true);
    expect(res.get(8).error.code).toBe(-32601);
  });
});
