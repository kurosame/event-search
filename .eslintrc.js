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
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/core-modules': ['vue', 'vuex']
  },
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error'
  }
}
