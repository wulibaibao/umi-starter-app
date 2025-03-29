import { defineConfig } from "@umijs/max";
import routes from "./routes";
import proxy from "./proxy";

export default defineConfig({
  hash: true,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: "starter-web",
  },
  crossorigin: {},
  favicons: [],
  clickToComponent: {},
  devtool: process.env.NODE_ENV === "development" ? "eval" : false,
  icons: { autoInstall: {} },
  moment2dayjs: {},
  headScripts: [],
  routes,
  proxy,
  npmClient: "pnpm",
  valtio: {},
  styledComponents: {},
  reactQuery: {},
  extraPostCSSPlugins: [require("@tailwindcss/postcss")],
  tailwindcss: {},
});
