export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false, // Disable Server Side rendering

  // Global App headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Disco-online',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Prueba de datos',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/image',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-google-sheets-parser',
  ],

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/sushicdn/'
    }
  }
};
