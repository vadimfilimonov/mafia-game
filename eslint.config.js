import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import pluginImport from 'eslint-plugin-import';
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'vite.config.js']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
    {
    // Import plugin for managing import order and grouping
    files: ['**/*.{js,jsx}'],
    plugins: { import: pluginImport },
    rules: {
      // Enforce a convention in import order
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-ins: fs, path, etc.
            'external', // Packages from node_modules
            'internal', // Internal modules (your aliases, paths)
            'parent', // Imports from parent directories
            'sibling', // Imports from sibling directories
            'index', // index files
            'object', // Imports of objects (rare)
            'type', // Type imports (TypeScript)
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'never',
        },
      ],
    },
  },
])
