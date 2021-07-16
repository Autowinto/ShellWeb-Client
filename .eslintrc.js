module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/typescript/recommended',
    'prettier',
    // '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
}
