import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import path from "path";

const production = !process.env.ROLLUP_WATCH;

const outputConfigs = [
  { suffix: "global", format: "iife", min: production },
  { suffix: "esm", format: "es", min: production },
  { suffix: "cjs", format: "cjs" }
];

export default outputConfigs.map(config => {
  let filename = `dist/neon.${config.suffix}`;
  if (production) filename += ".prod";
  filename += ".js";
  return {
    input: "src/index.ts",
    output: {
      file: filename,
      name: "neon",
      format: config.format,
      sourcemap: true
    },
    plugins: [
      commonjs(),
      resolve(),
      typescript({
        check: true,
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
        tsconfigOverride: {
          compilerOptions: {
            declaration: true
          }
        }
      }),
      config.min && terser()
    ]
  };
});
