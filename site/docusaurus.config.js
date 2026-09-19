// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Vetify',
  tagline: 'Todo lo que el squad necesita saber sobre el producto',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://alandg2.github.io',
  baseUrl: '/vetify-squad-knowledge/',

  organizationName: 'AlanDG2',
  projectName: 'vetify-squad-knowledge',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap',
      type: 'text/css',
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'content',
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
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
        id: 'onboarding',
        path: 'onboarding-content',
        routeBasePath: '/onboarding',
        sidebarPath: './sidebarsOnboarding.js',
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Vetify',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'contentSidebar',
            position: 'left',
            label: 'Guía',
          },
          {
            type: 'docSidebar',
            docsPluginId: 'onboarding',
            sidebarId: 'onboardingSidebar',
            position: 'left',
            label: 'Onboarding',
          },
          {
            to: '/organigrama',
            label: 'El equipo',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'La guía',
            items: [
              {label: 'Qué es Vetify', to: '/que-es-vetify'},
              {label: 'Tipos de clientes', to: '/tipos-de-clientes'},
              {label: 'Los planes', to: '/los-planes'},
              {label: 'Reintegros', to: '/reintegros'},
            ],
          },
          {
            title: 'Onboarding',
            items: [
              {label: 'Empezar acá', to: '/onboarding/bienvenida'},
              {label: 'Primeros pasos', to: '/onboarding/primeros-pasos'},
            ],
          },
          {
            title: 'El equipo',
            items: [
              {label: 'Organigrama', to: '/organigrama'},
            ],
          },
        ],
        copyright: `Squad Vetify — Iké Asistencia`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
