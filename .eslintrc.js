module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    // 'prettier'
  ],
  extends: [
    'airbnb-typescript/base',
    // 'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // 'prettier/prettier': 'error',
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/naming-convention': 1,
  },
};
