import { join } from 'path'
import { fileURLToPath } from 'url'

const currentDir = fileURLToPath(new URL('.', import.meta.url))
const consumerDir = process.cwd()

const layerContentGlobs = [
  join(currentDir, './app/**/*.{vue,ts,js,mjs,cjs}'),
  join(currentDir, './.playground/**/*.{vue,ts,js,mjs,cjs}'),
]

const consumerContentGlobs = currentDir === consumerDir
  ? []
  : [
      join(consumerDir, './app.vue'),
      join(consumerDir, './error.vue'),
      join(consumerDir, './app/**/*.{vue,ts,js,mjs,cjs}'),
      join(consumerDir, './app/composables/**/*.{vue,ts,js,mjs,cjs}'),
      join(consumerDir, './app/plugins/**/*.{vue,ts,js,mjs,cjs}'),
      join(consumerDir, './pages/**/*.{vue,ts,js,mjs,cjs}'),
      join(consumerDir, './components/**/*.{vue,ts,js,mjs,cjs}'),
      join(consumerDir, './layouts/**/*.{vue,ts,js,mjs,cjs}'),
      join(consumerDir, './composables/**/*.{vue,ts,js,mjs,cjs}'),
      join(consumerDir, './plugins/**/*.{vue,ts,js,mjs,cjs}'),
    ]

export default defineNuxtConfig({
  $meta: {
    name: 'bs-dashboard-base',
  },

  compatibilityDate: '2025-01-01',
  modules: [
    ['@kanton-basel-stadt/designsystem/nuxt', {
      iconOptions: {
        compiler: 'vue3',
      },
      tailwindOptions: {
        config: {
          content: [...layerContentGlobs, ...consumerContentGlobs],
          safelist: [
            'h-0',
            {
              pattern: /^(text|bg|border)-primary-(50|100|200|300|400|500|600|700|800|900)$/,
            },
          ],
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
