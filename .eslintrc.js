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
    'import/core-modules': ['vue', 'vuex', 'axios', 'moment']
  },
  rules: {
    camelcase: ['error', { properties: 'never' }],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] }
    ],
    'no-shadow': ['error', { allow: ['state'] }],
    // Want to have constant property in computed
    'class-methods-use-this': 'off',
    // When Vuex actions, Netlify Functions handler and etc.. are set to export default, it does not work
    'import/prefer-default-export': 'off',
    // Replace @typescript-eslint rules
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error'
  }
}
