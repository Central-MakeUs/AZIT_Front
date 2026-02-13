import { config as reactConfig } from '@azit/eslint/react';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';

const eslintConfig = [
  globalIgnores(['dist']),
  ...reactConfig,
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
          pathGroups: [
            { pattern: '@/app/**', group: 'external', position: 'after' },
            { pattern: '@/pages/**', group: 'external', position: 'after' },
            { pattern: '@/widgets/**', group: 'external', position: 'after' },
            { pattern: '@/features/**', group: 'external', position: 'after' },
            { pattern: '@/shared/**', group: 'external', position: 'after' },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
  },
];

export default defineConfig(eslintConfig);
