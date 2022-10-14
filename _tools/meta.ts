import { BuildOptions } from "https://deno.land/x/dnt@0.31.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  typeCheck: true,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@miyauci/pattern-match",
    version,
    description: "Type-safe functional style pattern matching",
    keywords: [
      "pattern",
      "match",
      "pattern-match",
      "pattern-matching",
      "switch",
      "fp",
      "functional-programing",
    ],
    license: "MIT",
    homepage: "https://github.com/TomokiMiyauci/pattern-match",
    repository: {
      type: "git",
      url: "git+https://github.com/TomokiMiyauci/pattern-match.git",
    },
    bugs: { url: "https://github.com/TomokiMiyauci/pattern-match/issues" },
    sideEffects: false,
    type: "module",
    publishConfig: { access: "public" },
  },
  packageManager: "pnpm",
});
