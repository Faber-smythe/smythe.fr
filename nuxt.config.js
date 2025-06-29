export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'smythe',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Johann "FaberSmythe" Imbert' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Johann "FaberSmythe" Imbert is a JS developer studying creative technologies. See his last web projects on SMYTHE.'
      },
      {
        name: 'keywords',
        content:
          'faber, smythe, johann, imbert, javascript, js, typescript, ts, babylon, babylon.js, opengl, front-end, immersive, 3D, web, developer, creative'
      },

      {
        property: 'og:title',
        content: 'Faber Smythe | My Web Projects Portfolio'
      },
      {
        property: 'og:description',
        content:
          'Discover my front-end projects using Babylon.js, GSAP, nuxt, and other state of the art web techs'
      },
      { property: 'og:image', content: '/opengraph.jpg' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon/favicon-32.png' },
      { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/Ailerons.woff2', crossorigin: "anonymous" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous"},
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Roboto:wght@100;900&display=swap"}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/reset.css',
    '@/assets/css/global.css'
    // CSS file in the project
    // { src:  },
    // { src: , lang: 'css' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/gsap-scrolltrigger.ts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
