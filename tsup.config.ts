import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["bin/cli.ts","src/**/*.ts"],
  format: ["esm"],
  dts: true,
  bundle: false,
  clean: true,
  sourcemap: true,
  splitting: false,

  target: "node22",
  external: [
    "inquirer",
    "ora",
    "chalk",
    "commander",
    "fs-extra",
    "execa"
  ]
});


