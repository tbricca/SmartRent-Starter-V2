import path from "path";

import rspack from "@rspack/core";
import ReactRefreshRspackPlugin from "@rspack/plugin-react-refresh";
import coreJsPackage from "core-js/package.json";
import * as dotenv from "dotenv";

import type { Configuration } from "@rspack/cli";

type ElementType<T> = T extends (infer U)[] ? U : T;
type RSpackPlugin = ElementType<rspack.Plugins>;

dotenv.config();

const COREJS_VERSION = coreJsPackage.version;
const NODE_ENV = process.env.NODE_ENV ?? "development";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const IS_TESTING = process.env.NODE_ENV === "testing";
const appEnvs = Object.keys(process.env)
  .filter((env) => env.startsWith("REACT_APP_"))
  .reduce((acc, cur) => {
    return { ...acc, [cur]: process.env[cur] };
  }, {});

function addPlugins({
  development = [],
  testing = [],
  production = [],
  common = [],
}: {
  development?: RSpackPlugin[];
  testing?: RSpackPlugin[];
  production?: RSpackPlugin[];
  common?: RSpackPlugin[];
}) {
  if (IS_DEVELOPMENT && development) {
    return [...common, ...development];
  }

  if (IS_PRODUCTION && production) {
    return [...common, ...production];
  }

  if (IS_TESTING && testing) {
    return [...common, ...testing];
  }

  return common;
}

function typescript({ tsx = false }: { tsx?: boolean }) {
  return {
    loader: "builtin:swc-loader",
    options: {
      jsc: {
        parser: {
          syntax: "typescript",
          tsx,
        },
        externalHelpers: true,
        transform: {
          react: {
            runtime: "automatic",
            development: IS_DEVELOPMENT,
            refresh: IS_DEVELOPMENT,
          },
        },
      },
      env: {
        targets: "Chrome >= 48",
        coreJs: COREJS_VERSION,
      },
    } satisfies rspack.SwcLoaderOptions,
  };
}

const config: Configuration = {
  mode: IS_PRODUCTION ? "production" : "development",
  devtool: IS_PRODUCTION ? "source-map" : "cheap-module-source-map",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  watchOptions: {
    poll: 1000,
  },
  cache: false,
  experiments: {
    css: true,
    lazyBarrel: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: typescript({ tsx: false }),
        type: "javascript/auto",
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: typescript({ tsx: true }),
        type: "javascript/auto",
      },
      {
        test: /\.(t|j)sx?$/,
        include: /node_modules\/(react-native-reanimated)/,
        use: ["babel-loader"],
        type: "javascript/auto",
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: addPlugins({
    common: [
      new rspack.CopyRspackPlugin({
        patterns: [{ from: "public" }],
      }),
      new rspack.CssExtractRspackPlugin(),
      new rspack.ProvidePlugin({
        process: "process/browser",
      }),
      new rspack.EnvironmentPlugin({
        NODE_ENV,
        ...appEnvs,
      }),
      new rspack.DefinePlugin({
        __DEV__: IS_DEVELOPMENT,
      }),
      new rspack.HtmlRspackPlugin({
        template: "./src/index.html",
      }),
    ],
    development: [new ReactRefreshRspackPlugin()],
  }),
  resolve: {
    alias: {
      "react-native": "react-native-web",
      "react-native-linear-gradient": "react-native-web-linear-gradient",
      "react-native-svg": "react-native-svg-web",
      "@react-native-community/async-storage": "react-native-web-async-storage",
      "@react-native-clipboard/clipboard": "react-native-web-clipboard",
      // this is needed as babel tries to read test files from react-native-gesture-handler
      "@testing-library/react-native": "@testing-library/react",
    },
    fallback: {
      path: require.resolve("path-browserify"),
    },
    tsConfig: {
      configFile: path.resolve(__dirname, "tsconfig.json"),
    },
    extensions: [
      ".web.ts",
      ".web.tsx",
      ".ts",
      ".tsx",
      ".web.js",
      ".web.jsx",
      ".js",
      ".jsx",
    ],
  },
};

export default config;
