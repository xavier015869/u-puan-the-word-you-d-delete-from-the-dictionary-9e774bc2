import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The word to erase from the dictionary forever: "whom".
// Deleting it ends a century of corrections at once — nobody can ever
// be wrong about who/whom again, because the word that made them wrong
// no longer exists.
const WORD = "whom";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 77 characters,
// not only white space, and the entry must be exactly one word, spelled
// correctly, with nothing added around it. Fail loudly instead of
// shipping an invalid entry.
if (WORD.length < 1 || WORD.length > 77) {
  throw new Error(`entry word must be 1-77 characters, got ${WORD.length}`);
}
if (!/^[A-Za-z]+$/.test(WORD)) {
  throw new Error(`entry must be exactly one word, got ${JSON.stringify(WORD)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");
