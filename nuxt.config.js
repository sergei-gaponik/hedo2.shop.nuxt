const dotenv = require("dotenv").config()

export default {

  env: dotenv.parsed,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'assets/style.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/device'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['nuxt-lazy-load', { 
      directiveOnly: true
    }],
    ['nuxt-i18n',{
      locales: [
        {
          code: 'en',
          currency: "USD",
          file: 'en.js',
          deliveryTime: [ 2, 5 ]
        },
        {
          code: 'de',
          currency: "EUR",
          file: 'de.js',
          deliveryTime: [ 1, 3 ]
        },
        {
          code: 'cz',
          currency: "CZK",
          file: 'en.js',
          deliveryTime: [ 2, 5 ]
        }
      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'de'
    }]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
