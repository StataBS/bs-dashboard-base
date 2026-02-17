<script setup lang="ts">
interface AccordionLink {
  title: string
  description?: string
  href: string
  icon?: 'auto' | 'internal' | 'external' | 'download'
}

interface AccordionItem {
  title: string
  content: string
  links?: AccordionLink[]
}

interface TabItem {
  label: string
  value: string
  slot?: string
}

const route = useRoute()
const router = useRouter()

const tabs: TabItem[] = [
  { label: 'Definitionen', value: 'definitionen' },
  { label: 'Datenquellen', value: 'datenquellen' },
  { label: 'Kontakte', value: 'kontakte' },
]

const activeTab = computed({
  get() {
    return (route.query.tab as string) || 'definitionen'
  },
  set(tab: string) {
    router.push({ path: '/info', query: { tab } })
  },
})

const definitionenItems: AccordionItem[] = [
  {
    title: 'Bevölkerung',
    content:
      'Die Bevölkerungszahlen umfassen alle Personen mit Hauptwohnsitz im Kanton Basel-Stadt. Stichtag ist jeweils der letzte Tag des Berichtsmonats.',
    links: [
      {
        title: 'Bevölkerungsstatistik Basel-Stadt',
        description:
          'Detaillierte Informationen zur Erhebungsmethodik und den verwendeten Definitionen der Bevölkerungsstatistik.',
        href: 'https://www.bs.ch/',
      },
      {
        title: 'Glossar demografische Begriffe',
        description:
          'Erläuterungen zu den wichtigsten Begriffen wie Wohnbevölkerung, Zuzüge, Wegzüge und natürliche Bevölkerungsbewegung.',
        href: 'https://www.bs.ch/',
      },
    ],
  },
  {
    title: 'Wirtschaftsindikatoren',
    content:
      'Die Wirtschaftsindikatoren basieren auf den aktuellsten verfügbaren Daten der kantonalen Statistikämter und des Bundesamtes für Statistik.',
    links: [
      {
        title: 'Methodische Grundlagen',
        description:
          'Informationen zu Berechnungsmethoden und Datengrundlagen der Wirtschaftsindikatoren.',
        href: 'https://www.bs.ch/',
      },
    ],
  },
  {
    title: 'Umweltkennzahlen',
    content:
      'Die Umweltkennzahlen werden aus verschiedenen Messnetzen und Erhebungen zusammengestellt. Die Luftqualitätsdaten stammen von den kantonalen Messstationen.',
    links: [
      {
        title: 'Messnetz Luftqualität',
        description:
          'Übersicht der Messstationen und deren Standorte im Kanton Basel-Stadt.',
        href: 'https://www.bs.ch/',
      },
      {
        title: 'Umweltbericht Basel-Stadt',
        description:
          'Umfassende Dokumentation zur Umweltsituation im Kanton.',
        href: 'https://www.bs.ch/',
      },
    ],
  },
]

const datenquellenItems: AccordionItem[] = [
  {
    title: 'Statistisches Amt Basel-Stadt',
    content:
      'Das Statistische Amt ist die zentrale Fachstelle für Statistik im Kanton Basel-Stadt. Es erhebt, verarbeitet und veröffentlicht statistische Informationen.',
    links: [
      {
        title: 'Open Data Basel-Stadt',
        description:
          'Zugang zu den offenen Daten des Kantons Basel-Stadt im maschinenlesbaren Format.',
        href: 'https://www.bs.ch/',
      },
      {
        title: 'Statistisches Jahrbuch',
        description:
          'Das Statistische Jahrbuch bietet einen umfassenden Überblick über die wichtigsten Kennzahlen des Kantons.',
        href: 'https://www.bs.ch/',
      },
    ],
  },
  {
    title: 'Bundesamt für Statistik (BFS)',
    content:
      'Für schweizweite Vergleichsdaten werden Erhebungen des Bundesamtes für Statistik herangezogen, insbesondere die Strukturerhebung und die STATPOP-Daten.',
    links: [
      {
        title: 'BFS – Regionalstatistik',
        description:
          'Statistische Daten auf Gemeindeebene für Vergleiche zwischen Kantonen und Gemeinden.',
        href: 'https://www.bfs.admin.ch/',
      },
    ],
  },
]
</script>

<template>
  <div>
    <h1 class="header-title text-green-600 hyphens-auto text-balance">Informationen</h1>
    <p class="lead mt-30 hyphens-auto lg:hyphens-none text-pretty">Informationen zum Dashboard</p>
    <div class="my-20 lg:mb-30 xl:pr-220">
      <div class="ck-content hyphens-auto lg:hyphens-none">
        <p>Hier finden Sie Informationen zum Dashboard und zu den verwendeten Daten.</p>
      </div>
    </div>

    <Tabs :items="tabs" v-model="activeTab">
      <!-- Definitionen -->
      <div v-if="activeTab === 'definitionen'" class="full-bleed bg-green-100 py-25 lg:py-30 xl:py-40">
        <div class="container">
          <header class="mb-10 lg:mb-20 xl:mb-30">
            <h2 class="hyphens-auto break-words text-green-600 font-bold text-2xl lg:text-3xl xl:text-4xl">
              Definitionen und Erläuterungen
            </h2>
            <p class="text-green-600 mt-20 lg:text-lg xl:w-4/6 break-words hyphens-auto">Hier werden die wichtigsten Begriffe erläutert und ergänzende Hintergrundinformationen zum Thema bereitgestellt.</p>
          </header>
          <Accordion :items="definitionenItems" />
        </div>
      </div>

      <!-- Datenquellen -->
      <div v-if="activeTab === 'datenquellen'" class="full-bleed bg-green-100 py-25 lg:py-30 xl:py-40">
        <div class="container">
          <header class="mb-10 lg:mb-20 xl:mb-30">
            <h2 class="hyphens-auto break-words text-green-600 font-bold text-2xl lg:text-3xl xl:text-4xl">
              Datenquellen
            </h2>
            <p class="text-green-600 mt-20 lg:text-lg xl:w-4/6 break-words hyphens-auto">Übersicht der verwendeten Datenquellen und deren Herkunft.</p>
          </header>
          <Accordion :items="datenquellenItems" />
        </div>
      </div>

      <!-- Kontakte -->
      <div v-if="activeTab === 'kontakte'">
        <Contact
          name="Statistisches Amt Basel-Stadt"
          description="Das Statistische Amt ist Ihre Anlaufstelle für Fragen zu den im Dashboard dargestellten Daten und Kennzahlen."
          phone="+41 61 267 87 27"
          email="statistik@bs.ch"
        />
        <div class="mt-30">
          <Contact
            name="Orhan Saeedi"
            description="Wissenschaftlicher Mitarbeiter, Statistisches Amt Basel-Stadt"
            phone="+41 61 267 59 21"
            email="opendata@bs.ch"
          />
        </div>
      </div>
    </Tabs>
  </div>
</template>

<style scoped>
.full-bleed {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
</style>
