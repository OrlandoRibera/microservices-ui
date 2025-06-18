// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-plugin-prettier');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    plugins: {
      prettier
    },
    extends: [
      eslint.configs.recommended,
      // @ts-ignore
      ...tseslint.configs.recommended,
      // @ts-ignore
      ...tseslint.configs.stylistic,
      // @ts-ignore
      ...angular.configs.tsRecommended
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            accessors: 'explicit',
            constructors: 'no-public',
            methods: 'explicit',
            properties: 'explicit',
            parameterProperties: 'explicit'
          }
        }
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'classProperty',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require'
        },
        {
          selector: 'classProperty',
          modifiers: ['public'],
          format: ['camelCase'],
          leadingUnderscore: 'forbid'
        },
        {
          selector: 'classProperty',
          modifiers: ['public', 'readonly'],
          format: ['UPPER_CASE'],
          leadingUnderscore: 'forbid'
        },
        {
          selector: 'classProperty',
          modifiers: ['private', 'readonly'],
          format: ['UPPER_CASE'],
          leadingUnderscore: 'require'
        }
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ]
    }
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {}
  }
);
