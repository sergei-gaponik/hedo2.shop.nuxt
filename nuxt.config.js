const dotenv = require("dotenv").config()

const env = dotenv.parsed

export default {

  env: env,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'HEDO Beauty - Pflege aus dem Kosmetikinstitut',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" },

    ],
    script: [
      { src: 'https://js.stripe.com/v3/', async: true },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'assets/style.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/VueClickOutside.ts',
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
    'portal-vue/nuxt',
    ['nuxt-lazy-load', {
      directiveOnly: true
    }],
    ['nuxt-i18n',{
      locales: [
        {
          code: 'en',
          numberFormat: 'en-US',
          currency: "USD",
          file: 'en.js',
          deliveryTime: [ 2, 5 ]
        },
        {
          code: 'de',
          numberFormat: 'de-DE',
          currency: "EUR",
          file: 'de.js',
          deliveryTime: [ 1, 3 ]
        },
        // {
        //   code: 'cz',
        //   numberFormat: 'cs-CZ',
        //   currency: "CZK",
        //   file: 'en.js',
        //   deliveryTime: [ 2, 5 ]
        // }
      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'de'
    }]
  ],

  server: {
    host: "0.0.0.0"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      presets(env, [preset, options]) {
        return [["@babel/preset-env", {}]];
      },
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          {
            regenerator: true
          }
        ]
      ]
    }
  },

}
