export default defineNuxtConfig({
  extends: ['..'],

  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
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
      repo: 'Feedback_dashboard-base',
      repoOwner: 'StataBS',
      project: 'bs-dashboard-base',
      githubToken: process.env.FEEDBACK_GITHUB_TOKEN || '',
    },
  },

})
