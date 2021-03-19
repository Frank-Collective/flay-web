export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  //mode: process.env.NUXT_MODE,
  target: process.env.NUXT_TARGET,
  //ssr: process.env.NUXT_SSR,
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        type: 'text/javascript',
        src: 'js/InstagramFeed.min.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/global.scss'],
  // Sass resources available to VUE files
  styleResources: {
    scss: [
      '~/assets/styles/resources/_vars.scss',
      '~/assets/styles/resources/_mixins.scss',
      '~/assets/styles/resources/_typography.scss',
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/preview.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/style-resources', 'nuxt-graphql-request'],

  graphql: {
    clients: {
      default: {
        endpoint: process.env.WP_GRAPHQL_ENDPOINT,
        options: {
          credentials: 'include',
          mode: 'cors',
        },
      },
    },
    options: {
      credentials: 'include',
      mode: 'cors',
    },
    useFetchPolyfill: true,
    includeNodeModules: true,
  },
  generate: {
    fallback: true,
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining'],
    },
  },
}
