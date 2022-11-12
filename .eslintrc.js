module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'eslint-config-prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 13,
    sourceType: 'module'
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'eslint-plugin-prettier'],
  rules: {
    'no-console': 1, // Means warning
    'prettier/prettier': 'error' // Means error
  }
};
