import js from '@eslint/js';
import node from 'eslint-plugin-node';
import promise from 'eslint-plugin-promise';
import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/**',
      'coverage/**',
      'dist/**',
      '.env',
      '*.log',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      node,
      promise,
    },
    rules: {
      /* ---------- correctness ---------- */
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-throw-literal': 'error',

      /* ---------- node ---------- */
      'node/no-missing-require': 'off',
      'node/no-unpublished-require': 'off',
      'node/no-process-exit': 'off',

      /* ---------- async ---------- */
      'promise/no-nesting': 'warn',

      /* ---------- style ---------- */
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],

      /* ---------- backend ---------- */
      'no-console': 'off',
    },
  },
];
