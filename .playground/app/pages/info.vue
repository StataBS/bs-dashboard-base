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
    title: 'Deep Thought',
    content:
      '<a href="https://hitchhikers.fandom.com/wiki/Deep_Thought" target="_blank" rel="noopener">Deep Thought</a> ist ein fiktiver Supercomputer aus Douglas Adams\' Roman <em>Per Anhalter durch die Galaxis</em> (1979). Er wurde von der Rasse der Magratheer gebaut, um die «Antwort auf die endgültige Frage nach dem Leben, dem Universum und dem ganzen Rest» zu berechnen. Nach 7,5&nbsp;Millionen Jahren Rechenzeit lieferte er die Antwort: <strong>42</strong>. Da niemand die eigentliche Frage kannte, schlug Deep Thought den Bau eines noch grösseren Computers vor &ndash; der <a href="https://hitchhikers.fandom.com/wiki/Earth" target="_blank" rel="noopener">Erde</a>.',
  },
  {
    title: 'Primzahlsatz',
    content:
      'Der Primzahlsatz beschreibt die asymptotische Verteilung der Primzahlen unter den natürlichen Zahlen. Er besagt, dass die Primzahlfunktion <var>&pi;</var>(<var>x</var>) &ndash; also die Anzahl der Primzahlen kleiner oder gleich <var>x</var> &ndash; für grosse <var>x</var> annähernd durch den Ausdruck<br><br><strong><var>x</var>&thinsp;/&thinsp;ln(<var>x</var>)</strong><br><br>beschrieben wird. Formal: lim<sub><var>x</var>&rarr;&infin;</sub>&thinsp;<var>&pi;</var>(<var>x</var>)&thinsp;/&thinsp;(<var>x</var>&thinsp;/&thinsp;ln(<var>x</var>)) = 1. Anders gesagt: Die Wahrscheinlichkeit, dass eine zufällig gewählte Zahl in der Nähe von <var>x</var> prim ist, beträgt ungefähr 1&thinsp;/&thinsp;ln(<var>x</var>). Der Satz wurde 1896 unabhängig von Jacques Hadamard und Charles Jean de la Vallée-Poussin bewiesen.',
  },
  {
    title: 'RSA-Verfahren',
    content:
      'RSA (benannt nach Rivest, Shamir und Adleman, 1977) ist ein asymmetrisches Verschlüsselungsverfahren und bildet die Grundlage moderner sicherer Internetverbindungen. Das Prinzip beruht auf der Tatsache, dass es einfach ist, zwei grosse Primzahlen <var>p</var> und <var>q</var> zu multiplizieren (<var>n</var> = <var>p</var>&thinsp;&times;&thinsp;<var>q</var>), aber extrem schwer, das Produkt <var>n</var> wieder in seine Primfaktoren zu zerlegen. Der öffentliche Schlüssel enthält <var>n</var>, der private Schlüssel die Kenntnis von <var>p</var> und <var>q</var>.',
  },
  {
    title: 'Hochzusammengesetzte Zahl',
    content:
      'Eine hochzusammengesetzte Zahl (englisch: <em>highly composite number</em>) ist eine natürliche Zahl, die mehr Teiler besitzt als jede kleinere natürliche Zahl. Die 12 ist eine solche Zahl &ndash; sie hat sechs Teiler (1, 2, 3, 4, 6, 12), mehr als jede Zahl unter ihr. Die Folge der hochzusammengesetzten Zahlen beginnt mit 1, 2, 4, 6, 12, 24, 36, 48, 120, 180, 240, 360,&nbsp;&hellip; Der Begriff wurde 1915 von Srinivasa Ramanujan eingeführt. Die Zahl 12 als hochzusammengesetzte Zahl erklärt, warum sie so oft als Basis in Masseinheiten auftritt: 12&nbsp;Monate, 24&nbsp;Stunden, das Dutzend.',
  },
  {
    title: 'Cortisol und circadianer Rhythmus',
    content:
      'Cortisol ist ein Steroidhormon, das in der Nebennierenrinde produziert wird und umgangssprachlich als «Stresshormon» bekannt ist. Die Cortisolausschüttung folgt einem circadianen Rhythmus: Der Spiegel ist morgens kurz nach dem Aufwachen am höchsten (sogenannte <em>Cortisol Awakening Response</em>, kurz CAR), fällt dann im Laufe des Vormittags ab und erreicht seinen Tiefpunkt in der Nacht. Da Koffein die Cortisolproduktion zusätzlich stimuliert, wirkt Kaffee am effektivsten in Phasen mit niedrigem Cortisolspiegel &ndash; also zwischen 9:30&ndash;11:30&nbsp;Uhr und 13:30&ndash;17:00&nbsp;Uhr.',
  },
  {
    title: 'Sunday Scaries',
    content:
      'Als <em>Sunday Scaries</em> (auch: <em>Sunday Blues</em>) wird das Angst- und Unbehagen-Gefühl am Sonntagabend vor der kommenden Arbeitswoche bezeichnet. In Umfragen berichten bis zu 76&nbsp;% der Arbeitnehmenden von diesem Phänomen. Es äussert sich in Schlafstörungen, Grübeln und diffuser Anspannung. Die <em>Sunday Scaries</em> gehen dem eigentlichen <em>Monday Blues</em> voraus &ndash; dem Motivationstief am Montagmorgen, bei dem lediglich 3&nbsp;% der Befragten angeben, gerne aufzustehen.',
  },
  {
    title: 'Meme',
    content:
      'Der Begriff <em>Meme</em> wurde 1976 von Richard Dawkins in seinem Buch <em>The Selfish Gene</em> geprägt und beschreibt eine kulturelle Informationseinheit, die sich durch Imitation verbreitet &ndash; analog zum Gen in der Biologie. Im Internet-Zeitalter bezeichnen Memes virale Bild-, Text- oder Videoformate, die in hoher Geschwindigkeit kopiert und variiert werden. Das «6-7»-Phänomen ist ein typisches Beispiel: Eine Phrase ohne eigentliche Bedeutung aus dem Song <em>Doot Doot (6 7)</em> von Skrilla verbreitete sich 2025 über TikTok in den Alltag und wurde von <a href="https://www.dictionary.com/e/word-of-the-year/" target="_blank" rel="noopener">Dictionary.com</a> zum Wort des Jahres erklärt.',
  },
]

const datenquellenItems: AccordionItem[] = [
  {
    title: 'Douglas Adams – «Per Anhalter durch die Galaxis»',
    content:
      'Die Zahl 42 als «Antwort auf die endgültige Frage nach dem Leben, dem Universum und dem ganzen Rest» stammt aus dem 1979 erschienenen Roman «The Hitchhiker\'s Guide to the Galaxy» von Douglas Adams. Adams erklärte, er habe die Zahl schlicht gewählt, weil sie «eine ganz gewöhnliche Zahl» sei.',
    links: [
      {
        title: 'Wikipedia – The Hitchhiker\'s Guide to the Galaxy',
        description:
          'Hintergrundinformationen zum Roman, der Romanreihe und den zahlreichen Adaptionen.',
        href: 'https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy',
      },
    ],
  },
  {
    title: 'Euklids Elemente',
    content:
      'Der Beweis, dass es unendlich viele Primzahlen gibt, stammt aus Euklids «Elementen» (ca. 300 v. Chr.) und gilt als einer der elegantesten Beweise der Mathematikgeschichte. Er zeigt per Widerspruchsbeweis, dass jede endliche Liste von Primzahlen unvollständig sein muss.',
    links: [
      {
        title: 'Wikipedia – Satz von Euklid',
        description:
          'Euklids Beweis der Unendlichkeit der Primzahlen und seine Bedeutung für die Zahlentheorie.',
        href: 'https://de.wikipedia.org/wiki/Satz_von_Euklid',
      },
    ],
  },
  {
    title: 'Europäische Behörde für Lebensmittelsicherheit (EFSA)',
    content:
      'Die EFSA hat 2015 eine umfassende Risikobewertung zu Koffein durchgeführt und kam zum Schluss, dass bis zu 400 mg Koffein pro Tag (etwa 4 bis 5 Tassen Filterkaffee) für gesunde Erwachsene unbedenklich sind. Diese Einschätzung bildet die Grundlage der im Dashboard dargestellten Empfehlung von 3 bis 5 Kaffeepausen.',
    links: [
      {
        title: 'EFSA – Scientific Opinion on caffeine (PDF)',
        description:
          'Wissenschaftliche Stellungnahme der EFSA zur Sicherheit von Koffein (EFSA Journal 2015, 120 Seiten).',
        href: 'https://efsa.onlinelibrary.wiley.com/doi/epdf/10.2903/j.efsa.2015.4102',
        icon: 'download',
      },
    ],
  },
  {
    title: 'Dictionary.com – Wort des Jahres 2025',
    content:
      'Dictionary.com ernannte «67» zum Wort des Jahres 2025. Die Zahlenkombination stammt aus dem TikTok-Song «Doot Doot (6 7)» des Rappers Skrilla und verbreitete sich von Basketball-Edits zu einem weltweiten Phänomen – ohne dass sich je eine feste Bedeutung etabliert hätte.',
    links: [
      {
        title: 'Dictionary.com – Word of the Year 2025',
        description:
          'Offizielle Bekanntgabe und Erläuterung der Wahl von «67» zum Wort des Jahres.',
        href: 'https://www.dictionary.com/e/word-of-the-year/',
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
            <p class="text-green-600 mt-20 lg:text-lg xl:w-4/6 break-words hyphens-auto">Hier werden die zentralen Begriffe und Konzepte erläutert, die in den Grafiken des Dashboards behandelt werden &ndash; von der Zahl 42 über Primzahlen bis zum 6-7 Meme.</p>
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
            <p class="text-green-600 mt-20 lg:text-lg xl:w-4/6 break-words hyphens-auto">Übersicht der Quellen und Referenzen, auf denen die Grafiken und Kennzahlen des Dashboards basieren.</p>
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
