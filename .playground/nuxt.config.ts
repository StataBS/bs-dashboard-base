export default defineNuxtConfig({
  extends: ['..'],

  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'de' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'theme-color', content: '#00838f' },
      ],
      title: 'Dashboard',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.png' },
      ],
    },
  },

  runtimeConfig: {
    feedback: {
      repo: 'Feedback_playground_bs-dashboard-base',
      repoOwner: 'StataBS',
      project: 'bs-dashboard-base',
      githubToken: process.env.GITHUB_TOKEN || '',
    },
  },

  i18n: {
    defaultLocale: 'de',
  },
})
