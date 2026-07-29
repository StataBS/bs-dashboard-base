<script setup lang="ts">
import { withBase } from 'ufo'

const DEFAULT_META_LINKS = [
  { href: 'https://www.bs.ch/', label: 'Startseite' },
  { href: 'https://www.bs.ch/datenschutzerklaerung', label: 'Datenschutz' },
  { href: 'https://www.bs.ch/impressum', label: 'Impressum' },
  { href: 'https://www.bs.ch/erklaerung-zur-barrierefreiheit', label: 'Barrierefreiheit' },
  { href: 'https://www.bs.ch/ombudsstelle', label: 'Ombudsstelle' },
]

const { dashboard } = useAppConfig()
const githubIconSrc = withBase('/icons/github-mark.svg', useRuntimeConfig().app.baseURL)

const contactLinks = computed(() => dashboard?.footer?.contactLinks ?? [])
const metaLinks = computed(() => {
  const configured = dashboard?.footer?.metaLinks
  return configured?.length ? configured : DEFAULT_META_LINKS
})
const copyrightYear = computed(
  () => dashboard?.footer?.copyrightYear ?? new Date().getFullYear(),
)
</script>

<template>
  <hr style="height: 4px; border: none; background-color: #32834A;" />
  <footer class="footer print:hidden">
    <h1 class="sr-only">Fusszeile</h1>
    <div class="footer-container container">
      <div>
        <FeedbackControl />
      </div>
      <nav
        v-if="contactLinks.length"
        aria-label="Kontakt & Datenquellen"
      >
        <ul class="links list-none m-0 p-0 gap-5">
          <li
            v-for="link in contactLinks"
            :key="`${link.href}-${link.label}`"
          >
            <a
              class="button is-sm"
              :class="link.showGithubIcon ? 'group' : 'is-link'"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.label }}
              <img
                v-if="link.showGithubIcon"
                :src="githubIconSrc"
                alt=""
                aria-hidden="true"
                style="width: 16px; height: 16px;"
                class="github-icon transition-all group-hover:brightness-0 group-hover:invert group-hover:animate-jump-scale"
              />
            </a>
          </li>
        </ul>
      </nav>
      <nav
        v-if="metaLinks.length"
        aria-label="Metadatenmenü"
      >
        <ul class="links links--spaced">
          <li
            v-for="link in metaLinks"
            :key="`${link.href}-${link.label}`"
          >
            <a
              class="link link--tall"
              :href="link.href"
              target="_blank"
            >{{ link.label }}</a>
          </li>
        </ul>
      </nav>
      <div class="footer-copyright">
        &copy; {{ copyrightYear }} Basel-Stadt
      </div>
    </div>
  </footer>
</template>
