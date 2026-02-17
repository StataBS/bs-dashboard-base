import { join } from 'path'
import { fileURLToPath } from 'url'

const currentDir = fileURLToPath(new URL('.', import.meta.url))

export default defineNuxtConfig({
  $meta: {
    name: 'bs-dashboard-base',
  },

  compatibilityDate: '2025-01-01',

  modules: [
    '@dcc-bs/feedback-control.bs.js',
    ['@kanton-basel-stadt/designsystem/nuxt', {
      iconOptions: {
        compiler: 'vue3',
      },
      tailwindOptions: {
        config: {
          content: [
            join(currentDir, './app/**/*.{vue,ts,js}'),
            join(currentDir, '.playground/**/*.{vue,ts,js}'),
          ],
          safelist: ['h-0'],
          theme: {
            extend: {
              screens: { xxxl: '3200px' },
              maxWidth: { hero: '560px' },
            },
          },
        },
      },
    }],
  ],

  css: [
    'v-calendar/style.css',
    join(currentDir, './app/assets/css/tailwind.css'),
  ],
})
