module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'airbnb-base',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/core-modules': ['vue', 'vuex', 'moment']
  },
  rules: {
    // Want to have constant property in computed
    'class-methods-use-this': 'off',
    // Replace @typescript-eslint rules
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error'
  }
}
