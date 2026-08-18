<script setup lang="ts">
const tableColumns = [
  { key: 'variante', label: 'Variante' },
  { key: 'beschreibung', label: 'Beschreibung' },
  { key: 'verwendung', label: 'Verwendung' },
]

const tableRows = [
  {
    variante: 'info (Standard)',
    beschreibung: 'Heller Hintergrund für allgemeine Hinweise.',
    verwendung: 'variant="info"',
  },
  {
    variante: 'warning',
    beschreibung: 'Roter Hintergrund für Warnungen.',
    verwendung: 'variant="warning"',
  },
  {
    variante: 'highlight',
    beschreibung: 'Grüner Hintergrund mit weisser Schrift.',
    verwendung: 'variant="highlight"',
  },
]
</script>

<template>
  <div class="space-y-30">
    <h1 class="header-title text-primary-600 hyphens-auto text-balance">Dashboard-Vorlage</h1>
    <p class="lead mt-30 hyphens-auto lg:hyphens-none text-pretty">Dies ist eine Vorlage für ein Dashboard</p>
    <div class="my-20 lg:mb-30 xl:pr-220">
      <div class="ck-content hyphens-auto lg:hyphens-none">
        <p>Diese Vorlage enthält wiederverwendbare Komponenten, die Sie für Ihr eigenes Dashboard einsetzen können. Nachfolgend finden Sie Beispiele für die wichtigsten Bausteine.</p>
      </div>
    </div>

    <div>
      <h3 class="h3 mb-20 lg:mb-30 mt-10 md:mt-40 xl:mt-50 scroll-mt-10 xl:pr-140">KPICard</h3>
      <div class="my-20 lg:mb-30 xl:pr-220">
        <div class="ck-content hyphens-auto lg:hyphens-none">
          <p>Die <strong>KPICard</strong>-Komponente zeigt eine Kennzahl mit Titel und optionaler Beschreibung an. Mit dem Parameter <code>href</code> oder <code>to</code> wird die Karte klickbar und erhält beim Hover einen violetten Schatten. Optional zeigt <code>sparkline</code> einen Flächen-Trend unter der Kennzahl.</p>
        </div>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-20">
        <KPICard title="Antwort auf alles" description="Die ultimative Antwort auf die endgültige Frage nach dem Leben, dem Universum und dem ganzen Rest" value="42" to="/grafiken/42" :sparkline="[12, 18, 15, 22, 28, 24, 31, 35, 33, 40, 38, 42]" sparkline-label-left="Jan 2025" sparkline-label-right="12. Dez 2025" />
        <KPICard title="Einzige gerade Primzahl" description="Die einzige Zahl, die sowohl gerade als auch prim ist" value="2" to="/grafiken/primzahlen" :sparkline="[5, 4, 3, 3, 2, 2]" sparkline-color="#1f77b4" />
        <KPICard title="Basis unseres Zahlensystems" description="Vermutlich weil wir 10 Finger haben" value="10" to="/grafiken/zahlensysteme" />
        <KPICard title="Kaffeepausen pro Tag" description="Empfohlene Anzahl Kaffeepausen für maximale Produktivität" value="3–5" to="/grafiken/kaffeepausen" />
        <KPICard title="Montags-Motivation" description="Anteil der Bevölkerung, die montags gerne aufsteht" value="3%" to="/grafiken/motivation" />
        <KPICard title="Wort des Jahres 2025" description="Eine bedeutungslose Zahl, die 2025 die Welt eroberte" value="67" to="/grafiken/sechs-sieben" />
      </div>
    </div>

    <div>
      <h3 class="h3 mb-20 lg:mb-30 mt-10 md:mt-40 xl:mt-50 scroll-mt-10 xl:pr-140">Box &ndash; Info</h3>
      <div class="my-20 lg:mb-30 xl:pr-220">
        <div class="ck-content hyphens-auto lg:hyphens-none">
          <p>Die Standard-Variante der <strong>Box</strong> zeigt allgemeine Hinweise auf hellem Hintergrund an. Inhalte können über den Slot oder die <code>html</code>-Eigenschaft übergeben werden.</p>
        </div>
      </div>
      <Box title="Zahlen und ihre Bedeutung" variant="info" :hide-when-empty="false">
        <p>Dieses Dashboard untersucht <strong>faszinierende Zahlen</strong> und ihre Bedeutung &ndash; von der Antwort auf die endgültige Frage bis hin zu den Bausteinen der Mathematik.</p>
        <LinkItem
          href="/grafiken/42"
          title="Die Antwort auf alles"
          description="Warum die Zahl 42 laut Douglas Adams die ultimative Antwort auf die Frage nach dem Leben, dem Universum und dem ganzen Rest ist."
          class="clear-both mt-15 w-full text-balance"
        />
        <LinkItem
          href="/grafiken/primzahlen"
          title="Primzahlen"
          description="Die Bausteine der Mathematik &ndash; warum die 2 als einzige gerade Primzahl eine Sonderstellung einnimmt."
          class="clear-both mt-15 w-full text-balance"
        />
      </Box>
    </div>

    <div>
      <h3 class="h3 mb-20 lg:mb-30 mt-10 md:mt-40 xl:mt-50 scroll-mt-10 xl:pr-140">Box &ndash; Warnung</h3>
      <div class="my-20 lg:mb-30 xl:pr-220">
        <div class="ck-content hyphens-auto lg:hyphens-none">
          <p>Die Variante <code>warning</code> hebt Warnungen mit rotem Hintergrund hervor. Über <code>title-addon</code> kann ein Zusatz zum Titel angegeben werden.</p>
        </div>
      </div>
      <Box title="Koffein-Warnung" title-addon="Über 5 Tassen pro Tag" variant="warning" :hide-when-empty="false">
        <p>Die Europäische Behörde für Lebensmittelsicherheit (EFSA) empfiehlt maximal 400&nbsp;mg Koffein pro Tag &ndash; etwa 4 bis 5 Tassen Kaffee. Darüber hinaus nehmen Nervosität und Schlafstörungen zu.</p>
        <LinkItem
          href="/grafiken/kaffeepausen"
          title="Kaffeepausen und Produktivität"
          description="Warum 3 bis 5 Tassen pro Tag nicht nur gut schmecken, sondern auch die Produktivität steigern."
          class="clear-both mt-15 w-full text-balance"
        />
        <LinkItem
          href="https://efsa.onlinelibrary.wiley.com/doi/epdf/10.2903/j.efsa.2015.4102"
          title="EFSA Scientific Opinion on caffeine (PDF)"
          description="Die vollständige Risikobewertung zu Koffein der Europäischen Behörde für Lebensmittelsicherheit."
          icon="download"
          class="clear-both mt-15 w-full text-balance"
        />
      </Box>
    </div>

    <div>
      <h3 class="h3 mb-20 lg:mb-30 mt-10 md:mt-40 xl:mt-50 scroll-mt-10 xl:pr-140">Box &ndash; Highlight</h3>
      <div class="my-20 lg:mb-30 xl:pr-220">
        <div class="ck-content hyphens-auto lg:hyphens-none">
          <p>Die Variante <code>highlight</code> verwendet einen grünen Hintergrund mit weisser Schrift und eignet sich für besonders wichtige Informationen.</p>
        </div>
      </div>
      <Box title="Wort des Jahres 2025: 67" variant="highlight" :hide-when-empty="false">
        <p>Dictionary.com ernannte «67» zum Wort des Jahres 2025 &ndash; eine bedeutungslose Zahlenkombination aus einem TikTok-Song, die die Welt eroberte, bevor sich jemand auf eine Bedeutung einigen konnte.</p>
        <LinkItem
          href="/grafiken/sechs-sieben"
          title="Das 6-7 Meme"
          description="Wie eine bedeutungslose Zahlenkombination zum weltweiten Phänomen wurde."
          :inverted="true"
          class="clear-both mt-15 w-full text-balance"
        />
        <LinkItem
          href="/grafiken/motivation"
          title="Montags-Motivation"
          description="Warum nur 3 % der Bevölkerung montags gerne aufsteht &ndash; und was die Forschung dazu sagt."
          :inverted="true"
          class="clear-both mt-15 w-full text-balance"
        />
      </Box>
    </div>

    <div>
      <h3 class="h3 mb-20 lg:mb-30 mt-10 md:mt-40 xl:mt-50 scroll-mt-10 xl:pr-140">Table</h3>
      <div class="my-20 lg:mb-30 xl:pr-220">
        <div class="ck-content hyphens-auto lg:hyphens-none">
          <p>Die <strong>Table</strong>-Komponente rendert eine konfigurierbare Tabelle. Definieren Sie die Spalten über <code>columns</code> und die Daten über <code>rows</code>.</p>
        </div>
      </div>
      <Table
        :columns="tableColumns"
        :rows="tableRows"
        caption="Übersicht der Box-Varianten"
      />
    </div>

    <div>
      <h3 class="h3 mb-20 lg:mb-30 mt-10 md:mt-40 xl:mt-50 scroll-mt-10 xl:pr-140">Weiterführende Informationen</h3>
      <div class="my-20 lg:mb-30 xl:pr-220">
        <div class="ck-content hyphens-auto lg:hyphens-none">
          <p>Hier finden Sie weitere nützliche Ressourcen und Hintergrundinformationen.</p>
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-10">
        <LinkItem
          href="/info"
          title="Info-Register"
          description="Definitionen, Datenquellen und Kontaktinformationen zum Dashboard."
        />
        <LinkItem
          href="https://www.bs.ch/fd/itbs/designsystem"
          title="Designsystem.BS"
          description="Das Designsystem des Kantons Basel-Stadt für die Entwicklung digitaler Produkte."
        />
        <LinkItem
          href="https://raw.githubusercontent.com/opendatabs/data-bs.ch/master/pdfs/OGD-Richtlinie.pdf"
          title="OGD-Richtlinie (PDF)"
          description="Richtlinie für Open Government Data des Kantons Basel-Stadt."
        />
      </div>
    </div>
  </div>
</template>
