import { config as reactConfig } from '@azit/eslint/react';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';

/**
 * FSD (Feature Sliced Design) import rules
 *
 * Layer hierarchy (can only import from same or lower layer):
 *   app → pages → widgets → features → entities → shared
 *
 * Cross-slice rules:
 *   @/features/{Slice} can only be imported from pages/{Slice}, features/{Slice}, or widgets/
 *   @/widgets/{Slice} can only be imported from pages/ or widgets/{Slice} itself
 *   @/entities/{Slice} cannot be imported from another entities/{Slice}
 */

// Layers that each layer is forbidden from importing
const LAYER_FORBIDDEN_IMPORTS = {
  shared: ['pages', 'widgets', 'features', 'entities'],
  entities: ['pages', 'widgets', 'features'],
  features: ['pages', 'widgets'],
  widgets: ['pages'],
};

const LAYERS = Object.keys(LAYER_FORBIDDEN_IMPORTS);

const featureSlicePlugin = {
  rules: {
    'no-cross-slice-import': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'features/{Slice} 파일은 pages/{Slice} 또는 widgets/ 내부에서만 import 가능합니다.',
        },
        messages: {
          restricted:
            "'@/features/{{slice}}' 는 'pages/{{slice}}' 또는 'widgets/{{slice}}' 내부에서만 import 할 수 있습니다.",
        },
        schema: [],
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            const importPath = node.source.value;
            const match = importPath.match(/^@\/features\/([^/]+)/);
            if (!match) return;

            const slice = match[1];
            const filename = context.filename.replace(/\\/g, '/');

            const isInMatchingPage = filename.includes(`/src/pages/${slice}/`);
            const isInSameFeature = filename.includes(
              `/src/features/${slice}/`
            );
            const isInWidgets = filename.includes('/src/widgets/');

            if (!isInMatchingPage && !isInSameFeature && !isInWidgets) {
              context.report({
                node,
                messageId: 'restricted',
                data: { slice },
              });
            }
          },
        };
      },
    },

    'no-cross-widget-import': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'widgets/{Slice}는 다른 widgets/{Slice}에서 import할 수 없습니다.',
        },
        messages: {
          restricted:
            "'@/widgets/{{slice}}' 는 'widgets/{{slice}}' 내부에서만 import 할 수 있습니다. (다른 widgets 슬라이스에서 참조 불가)",
        },
        schema: [],
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            const importPath = node.source.value;
            const match = importPath.match(/^@\/widgets\/([^/]+)/);
            if (!match) return;

            const importedSlice = match[1];
            const filename = context.filename.replace(/\\/g, '/');

            const currentWidgetMatch = filename.match(
              /\/src\/widgets\/([^/]+)\//
            );
            if (!currentWidgetMatch) return;

            const currentSlice = currentWidgetMatch[1];
            if (currentSlice !== importedSlice) {
              context.report({
                node,
                messageId: 'restricted',
                data: { slice: importedSlice },
              });
            }
          },
        };
      },
    },

    'no-cross-entity-import': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'entities/{Slice}는 다른 entities/{Slice}에서 import할 수 없습니다.',
        },
        messages: {
          restricted:
            "'@/entities/{{slice}}' 는 'entities/{{slice}}' 내부에서만 import 할 수 있습니다. (다른 entities 슬라이스에서 참조 불가)",
        },
        schema: [],
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            const importPath = node.source.value;
            const match = importPath.match(/^@\/entities\/([^/]+)/);
            if (!match) return;

            const importedSlice = match[1];
            const filename = context.filename.replace(/\\/g, '/');

            const currentEntityMatch = filename.match(
              /\/src\/entities\/([^/]+)\//
            );
            if (!currentEntityMatch) return;

            const currentSlice = currentEntityMatch[1];
            if (currentSlice !== importedSlice) {
              context.report({
                node,
                messageId: 'restricted',
                data: { slice: importedSlice },
              });
            }
          },
        };
      },
    },

    'no-upper-layer-import': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'FSD 계층 규칙: 하위 레이어는 상위 레이어를 import할 수 없습니다.',
        },
        messages: {
          restricted:
            "'{{currentLayer}}' 레이어는 '{{importLayer}}' 레이어를 import할 수 없습니다. (pages → features → entities → shared)",
        },
        schema: [],
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            const importPath = node.source.value;
            const filename = context.filename.replace(/\\/g, '/');

            const layerPattern = new RegExp(`/src/(${LAYERS.join('|')})/`);
            const currentMatch = filename.match(layerPattern);
            if (!currentMatch) return;
            const currentLayer = currentMatch[1];

            const importMatch = importPath.match(
              new RegExp(`^@/(${LAYERS.join('|')})/`)
            );
            if (!importMatch) return;
            const importLayer = importMatch[1];

            const forbidden = LAYER_FORBIDDEN_IMPORTS[currentLayer] ?? [];
            if (forbidden.includes(importLayer)) {
              context.report({
                node,
                messageId: 'restricted',
                data: { currentLayer, importLayer },
              });
            }
          },
        };
      },
    },
  },
};

const eslintConfig = [
  globalIgnores(['dist']),
  ...reactConfig,
  {
    plugins: {
      import: importPlugin,
      'feature-slice': featureSlicePlugin,
    },
    rules: {
      'feature-slice/no-cross-slice-import': 'error',
      'feature-slice/no-cross-entity-import': 'error',
      'feature-slice/no-upper-layer-import': 'error',
      'feature-slice/no-cross-widget-import': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
          pathGroups: [
            { pattern: '@/app/**', group: 'external', position: 'after' },
            { pattern: '@/pages/**', group: 'external', position: 'after' },
            { pattern: '@/widgets/**', group: 'external', position: 'after' },
            { pattern: '@/features/**', group: 'external', position: 'after' },
            { pattern: '@/entities/**', group: 'external', position: 'after' },
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
