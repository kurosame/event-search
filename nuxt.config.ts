import { Configuration } from '@nuxt/types'

const nuxtConfig: Configuration = {
  mode: 'universal',
  head: {
    title: 'Event Search',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Event search App' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  modules: ['@nuxtjs/axios', '@nuxtjs/moment', '@nuxtjs/proxy', '@nuxtjs/pwa'],
  axios: { baseURL: '/', retry: true },
  moment: { locales: ['ja'] },
  proxy: {
    '/.netlify/functions/atnd': { target: 'http://localhost:9000' },
    '/.netlify/functions/connpass': { target: 'http://localhost:9000' }
  },
  pwa: {
    workbox: { dev: true },
    manifest: {
      /* eslint-disable @typescript-eslint/camelcase */
      name: 'Event Search',
      short_name: 'Event Search',
      icons: [
        {
          src: '/favicon.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      theme_color: 'black'
      /* eslint-enable @typescript-eslint/camelcase */
    }
  },
  build: {
    extend(config, ctx): void {
      if (config.module && ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  buildModules: [
    [
      '@nuxt/typescript-build',
      { typeCheck: true, ignoreNotFoundWarnings: true }
    ],
    ['@nuxtjs/vuetify', { theme: { dark: true } }],
    '@nuxtjs/eslint-module'
  ]
}

export default nuxtConfig
