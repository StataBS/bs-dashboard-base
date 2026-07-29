export default defineAppConfig({
  dashboard: {
    showNavBar: true,
    logoHref: 'https://www.bs.ch',
    aboutLink: 'https://www.bs.ch',
    aboutLabel: 'Über uns',
    navItems: [
      { to: '/', label: 'Start', exact: true },
      { to: '/grafiken', label: 'Grafiken', matchPrefix: true },
      { to: '/info', label: 'Info' },
    ],
    navLinksSections: [
      { to: '/grafiken', label: 'Übersicht' },
      { to: '/grafiken/42', label: 'Die Antwort' },
      { to: '/grafiken/primzahlen', label: 'Primzahlen' },
      { to: '/grafiken/zahlensysteme', label: 'Zahlensysteme' },
      { to: '/grafiken/kaffeepausen', label: 'Kaffeepausen' },
      { to: '/grafiken/motivation', label: 'Montags-Motivation' },
      { to: '/grafiken/sechs-sieben', label: '6-7 Meme' },
    ],
    footer: {
      contactLinks: [
        { href: 'https://www.bs.ch', label: 'Link zur auftragsbearbeitenden Stelle' },
        { href: 'https://statistik.bs.ch', label: 'Statistisches Amt' },
        { href: 'https://www.bs.ch/daten/databs/dcc', label: 'DCC Data Competence Center' },
        { href: 'https://data.bs.ch/explore', label: 'Link zur Datenquelle' },
        { href: 'https://github.com/statabs', label: 'Code auf Github', showGithubIcon: true },
      ],
      metaLinks: [
        { href: 'https://www.bs.ch/', label: 'Startseite' },
        { href: 'https://www.bs.ch/datenschutzerklaerung', label: 'Datenschutz' },
        { href: 'https://www.bs.ch/impressum', label: 'Impressum' },
        { href: 'https://www.bs.ch/erklaerung-zur-barrierefreiheit', label: 'Barrierefreiheit' },
        { href: 'https://www.bs.ch/ombudsstelle', label: 'Ombudsstelle' },
      ],
      copyrightYear: new Date().getFullYear(),
    },
  },
})
