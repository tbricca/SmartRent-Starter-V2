const COREJS_VERSION = require("core-js/package.json").version;

const presetEnv = {
  default: {
    modules: false,
    useBuiltIns: "usage",
    corejs: {
      version: COREJS_VERSION,
      proposals: true,
    },
  },
  test: {
    targets: {
      node: "current",
    },
  },
};

module.exports = (api) => {
  const isTest = api.env("test");
  const isProd = api.env("production");

  api.cache(true);

  return {
    presets: [
      ["@babel/preset-env", isTest ? presetEnv.test : presetEnv.default],
      ["@babel/preset-react", { runtime: "automatic" }],
      ["@babel/preset-typescript", { onlyRemoveTypeImports: true }],
    ],
    plugins: [
      // "babel-plugin-dev-expression",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      !isTest && !isProd && "react-refresh/babel",
      "react-native-reanimated/plugin",
    ].filter(Boolean),
  };
};
