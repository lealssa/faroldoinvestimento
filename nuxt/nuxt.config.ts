// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    define: {
      // Isso aumenta o tamanho do bundle, use apenas para debug e remova depois
      "__VUE_PROD_HYDRATION_MISMATCH_DETAILS__": false
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  modules: ['@pinia/nuxt'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      },
      titleTemplate: '%s - Seu guia de investimentos',
      link: [
        { rel: 'icon', type: 'image/png', href: '/img/farol_do_investimento_logo.png' }
      ],
      meta: [
        { name: 'description', content: 'Aprenda sobre investimentos em Renda Fixa com nosso simulador exclusivo. Compare rendimentos, calcule impostos e tome decisões inteligentes.' },
        { name: 'keywords', content: 'investimentos, renda fixa, simulador, CDI, SELIC, IPCA, tesouro direto, CDB, LCI, LCA' },
        { name: 'author', content: 'Farol do Investimento' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', content: 'Farol do Investimento - Seu guia de investimentos' },
        { property: 'og:description', content: 'Aprenda sobre investimentos em Renda Fixa com nosso simulador exclusivo. Compare rendimentos e tome decisões inteligentes.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'pt_BR' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Farol do Investimento - Seu guia de investimentos' },
        { name: 'twitter:description', content: 'Aprenda sobre investimentos em Renda Fixa com nosso simulador exclusivo.' }
      ]
    }
  }
})