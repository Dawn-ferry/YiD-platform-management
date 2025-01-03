module.exports = {
  root: true,
  env: {
    node: true,
  },
  rules: {
    // "prettier/prettier": "off",
    "no-console": "off",
    "no-debugger": "off",
    "import/prefer-default-export": "off",
    indent: [
      "warn",
      2,
      {
        SwitchCase: 1,
      },
    ],
    semi: [0, "always"],
    "use-isnan": 2,
    "no-unused-vars": [
      2,
      {
        vars: "all",
        args: "none",
      },
    ],
    "vue/no-parsing-error": [
      2,
      {
        "x-invalid-end-tag": false,
      },
    ],
  },

  parserOptions: {
    parser: "babel-eslint",
  },
  extends: ["plugin:vue/essential"],
}
