module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    parser: 'babel-eslint',
  },
  rules: {
    semi: 0,
  },
}
