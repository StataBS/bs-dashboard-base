export default defineAppConfig({
  dashboard: {
    showNavBar: true,
    logoHref: 'https://www.bs.ch',
    aboutLink: 'https://www.bs.ch',
    aboutLabel: 'Über uns',
    navItems: [] as { to: string; label: string; exact?: boolean; matchPrefix?: boolean }[],
    navLinksSections: [] as { to: string; label: string }[],
    footer: {
      contactLinks: [] as { href: string; label: string; showGithubIcon?: boolean }[],
      // Leave empty so consumer arrays replace instead of concatenating (defu merges arrays).
      // SiteFooter falls back to standard BS legal links when unset/empty.
      metaLinks: [] as { href: string; label: string }[],
      copyrightYear: new Date().getFullYear(),
    },
  },
})
