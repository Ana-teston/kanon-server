// ..eslintrc.js
module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['import', 'node', 'prettier', 'standard'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    node: true,
    es2021: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    'prettier/prettier': 'error',
  },
}
