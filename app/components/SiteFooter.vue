<!-- components/SiteFooter.vue -->
<script setup lang="ts">
</script>

<template>
  <hr style="height: 4px; border: none; background-color: #32834A;" />
  <footer class="footer print:hidden">
    <h1 class="sr-only">Fusszeile</h1>
    <div class="footer-container container">
      <div>
        <FeedbackControl />
      </div>
      <nav aria-label="Kontakt & Datenquellen">
        <ul class="links list-none m-0 p-0 gap-5">
          <li>
            <a
              class="button is-sm is-link"
              href="https://www.bs.ch"
              target="_blank"
              rel="noopener noreferrer"
            >
              Link zur auftragsbearbeitenden Stelle
            </a>
          </li>
          <li>
            <a
              class="button is-sm is-link"
              href="https://statistik.bs.ch"
              target="_blank"
              rel="noopener noreferrer"
            >
              Statistisches Amt
            </a>
          </li>
          <li>
            <a
              class="button is-sm is-link"
              href="https://www.bs.ch/daten/databs/dcc"
              target="_blank"
              rel="noopener noreferrer"
            >
              DCC Data Competence Center
            </a>
          </li>
          <li>
            <a
              class="button is-sm is-link"
              href="https://data.bs.ch/explore"
              target="_blank"
              rel="noopener noreferrer"
            >
              Link zur Datenquelle
            </a>
          </li>
          <li>
            <a
              class="button is-sm group"
              href="https://github.com/statabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code auf Github
              <img
                src="/icons/github-mark.svg"
                alt=""
                aria-hidden="true"
                style="width: 16px; height: 16px;"
                class="github-icon transition-all group-hover:brightness-0 group-hover:invert group-hover:animate-jump-scale"
              />
            </a>
          </li>
        </ul>
      </nav>
      <nav aria-label="Metadatenmenü">
        <ul class="links links--spaced">
          <li>
            <a class="link link--tall" href="https://www.bs.ch/" target="_blank">Startseite</a>
          </li>
          <li>
            <a class="link link--tall" href="https://www.bs.ch/datenschutzerklaerung" target="_blank">Datenschutz</a>
          </li>
          <li>
            <a class="link link--tall" href="https://www.bs.ch/impressum" target="_blank">Impressum</a>
          </li>
          <li>
            <a class="link link--tall" href="https://www.bs.ch/erklaerung-zur-barrierefreiheit" target="_blank">Barrierefreiheit</a>
          </li>
          <li>
            <a class="link link--tall" href="https://www.bs.ch/ombudsstelle" target="_blank">Ombudsstelle</a>
          </li>
        </ul>
      </nav>
      <div class="footer-copyright">
        &copy; 2026 Basel-Stadt
      </div>
    </div>
  </footer>
</template>
