module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 7,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jasmine: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['prettier', 'import'],
  extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended', 'plugin:react/recommended'],
  globals: {
    insights: 'readonly',
  },
  rules: {
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'prettier/prettier': ['error', { singleQuote: true }],
    'no-prototype-builtins': 'off',
    'import/prefer-default-export': ['error'],
  },
  overrides: [
    {
      files: ['showcase/**/src/**/*.ts', 'showcase/**/src/**/*.tsx', 'showcase/*.js'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'react/prop-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
      },
    },
  ],
};
