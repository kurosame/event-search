module.exports = {
  extends: [
    '@kurosame/eslint-config-vue',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  settings: {
    'import/core-modules': ['vue', 'vuex', 'axios', 'moment']
  },
  rules: {
    // Want to have constant property in computed
    'class-methods-use-this': 'off',
    // When Vuex actions, Netlify Functions handler and etc.. are set to export default, it does not work
    'import/prefer-default-export': 'off',
    // Mutation function args want to be named 'state'
    'no-shadow': ['error', { allow: ['state'] }],
    // Conflict to Prettier
    'space-before-function-paren': 'off'
  }
}
