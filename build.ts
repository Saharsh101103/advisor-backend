import { bunPluginPino } from "bun-plugin-pino";

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "node",
  env: "NODE_ENV*",
  sourcemap: "inline",
  plugins: [
    bunPluginPino({
      transports: ["pino-pretty"],
    }),
  ],
});
