const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://azit.app',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: '/logo.png',
    logoLink: '/',
    title: "<a href='/'>AZIT APK Center</a>",
    githubUrl: '',
    helpUrl: '',
    tweetText: '',
    social: '',
    search: {
      enabled: false,
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: ['/introduction'],
    collapsedNav: [],
    links: [],
    frontLine: false,
    ignoreIndex: true,
    title: 'AZIT APK Center',
  },
  siteMetadata: {
    title: 'AZIT APK Center',
    description: 'AZIT 안드로이드 앱 APK 다운로드 센터',
    ogImage: null,
    docsLocation: '',
    favicon: '/favicon.ico',
  },
  pwa: {
    enabled: false,
    manifest: {
      name: 'AZIT APK Center',
      short_name: 'APKCenter',
      start_url: '/',
      background_color: '#1a1a2e',
      theme_color: '#4f46e5',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [],
    },
  },
};

module.exports = config;
