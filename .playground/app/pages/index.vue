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
      <h2 class="h2 mb-20 lg:mb-30 mt-10 md:mt-40 xl:mt-50 scroll-mt-10 xl:pr-140">KPICard</h2>
      <div class="my-20 lg:mb-30 xl:pr-220">
        <div class="ck-content hyphens-auto lg:hyphens-none">
          <p>Die <strong>KPICard</strong>-Komponente zeigt eine Kennzahl mit Titel und optionaler Beschreibung an. Mit dem Parameter <code>href</code> wird die Karte klickbar und erhält beim Hover einen violetten Schatten.</p>
        </div>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-20">
        <KPICard title="Antwort auf alles" description="Die ultimative Antwort auf die endgültige Frage nach dem Leben, dem Universum und dem ganzen Rest" value="42" to="/grafiken/42" />
        <KPICard title="Einzige gerade Primzahl" description="Die einzige Zahl, die sowohl gerade als auch prim ist" value="2" to="/grafiken/primzahlen" />
        <KPICard title="Basis unseres Zahlensystems" description="Vermutlich weil wir 10 Finger haben" value="10" to="/grafiken/zahlensysteme" />
        <KPICard title="Kaffeepausen pro Tag" description="Empfohlene Anzahl Kaffeepausen für maximale Produktivität" value="3–5" to="/grafiken/kaffeepausen" />
        <KPICard title="Montags-Motivation" description="Anteil der Bevölkerung, die montags gerne aufsteht" value="3%" to="/grafiken/motivation" />
        <KPICard title="Wort des Jahres 2025" description="Eine bedeutungslose Zahl, die 2025 die Welt eroberte" value="67" to="/grafiken/sechs-sieben" />
      </div>
    </div>

    <div>
      <h2 class="h2 mb-20 lg:mb-30 mt-10 md:mt-40 xl:mt-50 scroll-mt-10 xl:pr-140">Box &ndash; Info</h2>
      <div class="my-20 lg:mb-30 xl:pr-220">
        <div class="ck-content hyphens-auto lg:hyphens-none">
          <p>Die Standard-Variante der <strong>Box</strong> zeigt allgemeine Hinweise auf hellem Hintergrund an. Inhalte können über den Slot oder die <code>html</code>-Eigenschaft übergeben werden.</p>
        </div>
      </div>
      <Box title="Information" variant="info" :hide-when-empty="false">
        <p>Dies ist ein <strong>Beispiel-Hinweis</strong>. Hier können wichtige Informationen für die Nutzenden angezeigt werden.</p>
        <LinkItem
          href="/info"
          title="Einbürgerung"
          description="Informationen zu Pass / Identitätskarte & Einbürgerung & Beglaubigungen."
          class="clear-both mt-15 w-full text-balance"
        />
        <LinkItem
          href="https://www.bs.ch"
          title="Petition"
          class="clear-both mt-15 w-full text-balance"
        />
      </Box>
    </div>

    <div>
      <h2 class="h2 mb-20 lg:mb-30 mt-10 md:mt-40 xl:mt-50 scroll-mt-10 xl:pr-140">Box &ndash; Warnung</h2>
      <div class="my-20 lg:mb-30 xl:pr-220">
        <div class="ck-content hyphens-auto lg:hyphens-none">
          <p>Die Variante <code>warning</code> hebt Warnungen mit rotem Hintergrund hervor. Über <code>title-addon</code> kann ein Zusatz zum Titel angegeben werden.</p>
        </div>
      </div>
      <Box title="Geplante Sperrung" title-addon="Beispiel-Sperrung" variant="warning" :hide-when-empty="false">
        <p>Dies ist eine Beispiel-Warnung. Sie informiert die Nutzenden über eine geplante Einschränkung.</p>
      </Box>
    </div>

    <div>
      <h2 class="h2 mb-20 lg:mb-30 mt-10 md:mt-40 xl:mt-50 scroll-mt-10 xl:pr-140">Box &ndash; Highlight</h2>
      <div class="my-20 lg:mb-30 xl:pr-220">
        <div class="ck-content hyphens-auto lg:hyphens-none">
          <p>Die Variante <code>highlight</code> verwendet einen grünen Hintergrund mit weisser Schrift und eignet sich für besonders wichtige Informationen.</p>
        </div>
      </div>
      <Box title="Wichtige Mitteilung" variant="highlight" :hide-when-empty="false">
        <p>Dies ist ein hervorgehobener Hinweis auf grünem Hintergrund. Ideal für zentrale Informationen, die sofort ins Auge fallen sollen.</p>
        <LinkItem
          href="https://raw.githubusercontent.com/opendatabs/data.bs.ch/master/pdfs/OGD-Richtlinie.pdf"
          title="OGD-Richtlinie"
          description="Richtlinie für Open Government Data des Kantons Basel-Stadt."
          :inverted="true"
          class="clear-both mt-15 w-full text-balance"
        />
      </Box>
    </div>

    <div>
      <h2 class="h2 mb-20 lg:mb-30 mt-10 md:mt-40 xl:mt-50 scroll-mt-10 xl:pr-140">Table</h2>
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
      <h2 class="h2 mb-20 lg:mb-30 mt-10 md:mt-40 xl:mt-50 scroll-mt-10 xl:pr-140">Weiterführende Informationen</h2>
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
      </div>
    </div>
  </div>
</template>
