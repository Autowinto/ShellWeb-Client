module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    parser: 'babel-eslint',
  },
  rules: {
    semi: 0,
  },
}
