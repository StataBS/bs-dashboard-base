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
    githubToken: process.env.GITHUB_TOKEN || '',
  },

  'feedback-control.bs.js': {
    repo: 'Feedback_playground_bs-dashboard-base',
    owner: 'StataBS',
    project: 'bs-dashboard-base',
  },
})
