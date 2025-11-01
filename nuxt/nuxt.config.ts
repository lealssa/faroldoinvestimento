// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/main.css','@fortawesome/fontawesome-svg-core/styles.css'],
  modules: ['@pinia/nuxt'],
})