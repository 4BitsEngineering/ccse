import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
} from "node:fs";
import path from "node:path";
import { BancoSchema } from "../src/lib/content";

const SOURCE =
  process.env.CCSE_CONTENT_SOURCE ??
  "C:/Users/Nitropc/Desktop/OPOSICIONES/CCSE_Nacionalidad_Espanola";
const DEST = path.join(process.cwd(), "content");

function ensureDir(p: string) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function copyMatching(srcDir: string, dstDir: string, pattern: RegExp): string[] {
  ensureDir(dstDir);
  const files = readdirSync(srcDir).filter((f) => pattern.test(f));
  for (const f of files) {
    copyFileSync(path.join(srcDir, f), path.join(dstDir, f));
  }
  return files;
}

function main() {
  if (!existsSync(SOURCE)) {
    console.error(`[sync-content] origen no existe: ${SOURCE}`);
    console.error(`  define CCSE_CONTENT_SOURCE o ajusta el default.`);
    process.exit(1);
  }

  console.log(`[sync-content] origen:  ${SOURCE}`);
  console.log(`[sync-content] destino: ${DEST}`);
  ensureDir(DEST);

  // banco_300.json
  const bancoSrc = path.join(SOURCE, "preguntas_oficiales", "banco_300.json");
  const bancoDst = path.join(DEST, "banco_300.json");
  if (!existsSync(bancoSrc)) {
    console.error(`[sync-content] no se encuentra: ${bancoSrc}`);
    process.exit(1);
  }
  copyFileSync(bancoSrc, bancoDst);

  // temas/01..05_*.md
  const temas = copyMatching(
    path.join(SOURCE, "temas"),
    path.join(DEST, "temas"),
    /^0[1-5]_.+\.md$/,
  );

  // tests/simulacro_01..05.md
  const simulacros = copyMatching(
    path.join(SOURCE, "tests"),
    path.join(DEST, "simulacros"),
    /^simulacro_0[1-5]\.md$/,
  );

  // Validación Zod
  const json = JSON.parse(readFileSync(bancoDst, "utf8"));
  const result = BancoSchema.safeParse(json);
  if (!result.success) {
    console.error(`[sync-content] Zod validation FAILED:`);
    for (const issue of result.error.issues.slice(0, 10)) {
      console.error(`  ${issue.path.join(".")}: ${issue.message}`);
    }
    if (result.error.issues.length > 10) {
      console.error(`  ... y ${result.error.issues.length - 10} más`);
    }
    process.exit(2);
  }

  const banco = result.data;
  console.log(``);
  console.log(`[sync-content] OK`);
  console.log(`  manual:     ${banco.version_manual}`);
  console.log(`  preguntas:  ${banco.preguntas.length}`);
  console.log(`  temas:      ${temas.length}  (${temas.join(", ")})`);
  console.log(`  simulacros: ${simulacros.length}  (${simulacros.join(", ")})`);
}

main();
