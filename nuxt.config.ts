// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '@/assets/scss/variables.scss'
  ],

  build: {
    transpile: ['vuetify']
  },

  ssr: false
})
