const js = require('@eslint/js')
const globals = require('globals')
const reactPlugin = require('eslint-plugin-react')
const prettierConfig = require('eslint-config-prettier')
const prettierPlugin = require('eslint-plugin-prettier')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')

const normalizeGlobals = (environmentGlobals) =>
  Object.fromEntries(
    Object.entries(environmentGlobals).map(([name, config]) => [
      name.trim(),
      config
    ])
  )

module.exports = [
  {
    ignores: ['.next/**', 'coverage/**', 'node_modules/**']
  },
  js.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...normalizeGlobals(globals.browser),
        ...normalizeGlobals(globals.builtin),
        ...normalizeGlobals(globals.node)
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      react: reactPlugin
    },
    rules: {
      ...tsPlugin.configs['eslint-recommended'].overrides[0].rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      'no-console': 1,
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]
