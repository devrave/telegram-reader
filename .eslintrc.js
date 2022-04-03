module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint/eslint-plugin"
  ],
  extends: [
    "plugin:@typescript-eslint/recommended"
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  rules: {
    "array-bracket-spacing": [ 1, "always" ],
    "indent": [ 1, 2 ],
    "quotes": [ 1, "double" ],
    "eol-last": [ 1, "always" ],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
};
