// Minimal ZIP reader (stored and deflate entries) so the Figma scripts don't depend on an
// `unzip` binary, which the Playwright CI image doesn't have. Reads the central directory,
// so it handles entries written with data descriptors.
import { readFileSync } from "node:fs";
import { inflateRawSync } from "node:zlib";

/** Returns a function that reads one entry of the ZIP at `path` as a Buffer. */
export function openZip(path) {
  const buf = readFileSync(path);
  // End of central directory record: signature 0x06054b50, within the last 64 KB + 22 bytes.
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65_557); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error(`${path} is not a ZIP file`);
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const entries = new Map();
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error(`${path}: bad central directory`);
    const method = buf.readUInt16LE(p + 10);
    const compressedSize = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const localOffset = buf.readUInt32LE(p + 42);
    const name = buf.toString("utf8", p + 46, p + 46 + nameLen);
    entries.set(name, { method, compressedSize, localOffset });
    p += 46 + nameLen + extraLen + commentLen;
  }
  return (name) => {
    const e = entries.get(name);
    if (!e) throw new Error(`${path}: no entry ${name}`);
    const lp = e.localOffset;
    if (buf.readUInt32LE(lp) !== 0x04034b50) throw new Error(`${path}: bad local header for ${name}`);
    const start = lp + 30 + buf.readUInt16LE(lp + 26) + buf.readUInt16LE(lp + 28);
    const data = buf.subarray(start, start + e.compressedSize);
    if (e.method === 0) return Buffer.from(data);
    if (e.method === 8) return inflateRawSync(data);
    throw new Error(`${path}: unsupported compression method ${e.method} for ${name}`);
  };
}
