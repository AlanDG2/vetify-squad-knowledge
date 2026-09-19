// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Vetify Squad Knowledge',
  tagline: 'Conocimiento compartido del squad Vetify + Iké Asistencia',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://alandg2.github.io',
  baseUrl: '/vetify-squad-knowledge/',

  organizationName: 'AlanDG2',
  projectName: 'vetify-squad-knowledge',

  // El contenido fuente (knowledge/*.md) tiene links relativos hacia el repo hermano
  // `vetify-automation/automation` (ej. `../vetify-automation/automation/docs/...`) que no
  // resuelven como página de este sitio a propósito -- son referencias de texto a otro repo, no
  // errores. 'warn' en vez de 'throw' para que esos no rompan el build.
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          id: 'knowledge',
          path: '../knowledge',
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/AlanDG2/vetify-squad-knowledge/tree/main/knowledge/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'repos',
        path: '../repos',
        routeBasePath: '/repos',
        sidebarPath: './sidebarsRepos.js',
        editUrl: 'https://github.com/AlanDG2/vetify-squad-knowledge/tree/main/repos/',
      }),
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    format: 'md',
    mermaid: true,
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Vetify Squad Knowledge',
        logo: {
          alt: 'Vetify Squad Knowledge',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            docsPluginId: 'knowledge',
            sidebarId: 'knowledgeSidebar',
            position: 'left',
            label: 'Conocimiento',
          },
          {
            type: 'docSidebar',
            docsPluginId: 'repos',
            sidebarId: 'reposSidebar',
            position: 'left',
            label: 'Repos y arquitectura',
          },
          {
            to: '/organigrama-borrador',
            label: 'Organigrama (borrador)',
            position: 'left',
          },
          {
            href: 'https://github.com/AlanDG2/vetify-squad-knowledge',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Conocimiento',
            items: [
              {label: 'Estado actual', to: '/current-state'},
              {label: 'Conocimiento del sistema', to: '/system-knowledge'},
              {label: 'Issues conocidos', to: '/known-issues'},
              {label: 'Bugs conocidos', to: '/bugs-conocidos'},
            ],
          },
          {
            title: 'Proyecto',
            items: [
              {label: 'Organigrama (borrador)', to: '/organigrama-borrador'},
              {label: 'Repos y arquitectura', to: '/repos/indice'},
            ],
          },
          {
            title: 'Repos',
            items: [
              {label: 'vetify-squad-knowledge', href: 'https://github.com/AlanDG2/vetify-squad-knowledge'},
            ],
          },
        ],
        copyright: `Iké Asistencia — Vetify Squad Knowledge. Generado ${new Date().getFullYear()}.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
