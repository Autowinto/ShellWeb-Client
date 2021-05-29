module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript',
    // '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  // rules: {
  //   'prettier/prettier': [
  //     'warn',
  //     {
  //       semi: false,
  //       singleQuote: true,
  //       trailingComma: 'none',
  //     },
  //   ],
  // },
}
