module.exports =
  /* {
   * extends: [
   *   'eslint:recommended',
   *   'plugin:@typescript-eslint/recommended',
   *   'plugin:prettier/recommended'
   * ],
   * env: {
   *   node: true,
   *   mocha: true,
   *   es6: true
   * },
   * plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
   * parserOptions: {
   *   parser: '@typescript-eslint/parser'
   * },
   * rules: {
   *   'prettier/prettier': [
   *     'error',
   *     { endOfLine: 'auto' },
   *     { usePrettierrc: true }
   *   ], // Use our .prettierrc file as source
   *   'react/react-in-jsx-scope': 'off',
   *   'react/prop-types': 'off',
   *   'simple-import-sort/imports': 'error',
   *   'simple-import-sort/exports': 'error'
   * }
     }
   */
  {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ],
    rules: {
      'no-console': 1, // warn on console statements
      'prettier/prettier': 1 // warn on prettier errors
    }
  }
