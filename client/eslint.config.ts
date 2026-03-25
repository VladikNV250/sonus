import js from '@eslint/js'
import type { ESLint } from 'eslint'
import { defineConfig } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
    {
        ignores: ['eslint.config.ts', 'dist/**', '.react-router/**', '**/__generated__/**'],
    },
    {
        files: ['**/*.{ts,tsx}'],
        ignores: ['**/*.test.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            // Type-checked rules: catches floating promises, misused promises, etc.
            // Requires parserOptions.project to be set.
            tseslint.configs.recommendedTypeChecked,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            jsxA11y.flatConfigs.recommended,
            // Must be last — disables ESLint rules that conflict with Prettier
            prettierConfig,
        ],
        plugins: {
            react: reactPlugin as unknown as ESLint.Plugin,
            'simple-import-sort': simpleImportSort,
            prettier: prettierPlugin,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                // Needed for recommendedTypeChecked
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            react: {
                // Automatically detect React version
                version: '19.2.4',
            },
        },
        rules: {
            // --- Prettier ---
            'prettier/prettier': 'warn',

            // --- React ---
            'react/jsx-key': 'error',
            'react/no-array-index-key': 'warn',
            'react/self-closing-comp': 'warn',
            'react/jsx-boolean-value': ['warn', 'never'],
            'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
            'react/function-component-definition': [
                'error',
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function',
                },
            ],

            // --- Import sorting ---
            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn',

            // --- General ---
            'no-console': ['warn', { allow: ['warn', 'error'] }],

            // --- TypeScript ---
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
        },
    },
    {
        // Lighter config for test files - skip type-checking but keep other rules
        files: ['**/*.test.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended, // non-type-checked version
            prettierConfig,
        ],
        plugins: {
            'simple-import-sort': simpleImportSort,
            prettier: prettierPlugin,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        rules: {
            'prettier/prettier': 'warn',
            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    },
])
