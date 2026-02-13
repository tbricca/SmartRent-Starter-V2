const { fixupConfigRules } = require("@eslint/compat");
const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...fixupConfigRules(compat.extends("@smartrent")),
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      import: require("eslint-plugin-import"),
      "eslint-comments": require("eslint-plugin-eslint-comments"),
    },
    settings: {
      "import/internal-regex": "^@smartrent/",
    },
    rules: {
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["sibling", "parent"],
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          "newlines-between": "always-and-inside-groups",
        },
      ],
      "react/display-name": ["warn"],
      "react/jsx-key": ["warn"],
      "react/jsx-no-leaked-render": ["warn", { validStrategies: ["ternary"] }],
      "react/jsx-no-target-blank": ["warn"],
      "react/no-deprecated": ["warn"],
      "react-native/no-single-element-style-arrays": ["warn"],
      "react-native/no-inline-styles": ["off"],
      "no-case-declarations": ["warn"],
      "import/consistent-type-specifier-style": "error",
      "prefer-const": ["warn"],
      "eslint-comments/require-description": ["error"],
      "eslint-comments/no-unused-disable": ["error"],
      "eslint-comments/disable-enable-pair": ["error", { allowWholeFile: true }],
      "@typescript-eslint/no-empty-interface": [
        "warn",
        { allowSingleExtends: true },
      ],
      "react/no-unescaped-entities": [
        "error",
        {
          forbid: [
            { char: ">", alternatives: ["&gt;"] },
            { char: "<", alternatives: ["&lt;"] },
            { char: "{", alternatives: ["&#123;"] },
            { char: "}", alternatives: ["&#125;"] },
            { char: "\u2018", alternatives: ["'"] },
            { char: "\u2019", alternatives: ["'"] },
            { char: "\u201C", alternatives: ['"'] },
            { char: "\u201D", alternatives: ['"'] },
          ],
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          name: "lodash",
          message: "Would you kindly use lodash-es instead?",
        },
        {
          name: "@smartrent/shared-ui",
          message: "Would you kindly import from @smartrent/ui instead?",
        },
      ],
      "react-hooks/exhaustive-deps": [
        "error",
        { additionalHooks: "useChannel" },
      ],
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    rules: {
      "@typescript-eslint/no-var-requires": ["off"],
    },
  },
];
