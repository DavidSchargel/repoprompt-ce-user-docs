const remarkIdealImages = require('./plugins/remark-ideal-images.cjs');
const organizationName = process.env.PAGES_OWNER;
const projectName = process.env.PAGES_REPOSITORY;
const url = process.env.SITE_URL || (organizationName ? `https://${organizationName}.github.io` : 'https://example.invalid');
const baseUrl = process.env.SITE_BASE_URL || (projectName && projectName !== `${organizationName}.github.io` ? `/${projectName}/` : '/');
const algoliaValues = [process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_API_KEY, process.env.ALGOLIA_INDEX_NAME];
if (algoliaValues.some(Boolean) && !algoliaValues.every(Boolean)) {
  throw new Error('Set all three ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY, and ALGOLIA_INDEX_NAME values, or none.');
}

if (!/^\/(?:[^?#]*\/)?$/.test(baseUrl)) throw new Error('SITE_BASE_URL must start and end with / and have no query or fragment.');
const origin = new URL(url);
if (!['https:', 'http:'].includes(origin.protocol) || origin.pathname !== '/' || origin.search || origin.hash || origin.username || origin.password) throw new Error('SITE_URL must be an HTTP(S) origin only.');

module.exports = {
  title: 'RepoPrompt',
  tagline: 'Community Edition documentation',
  url,
  baseUrl,
  organizationName,
  projectName,
  trailingSlash: true,
  favicon: 'favicon.ico',
  headTags: [
    {tagName: 'link', attributes: {rel: 'icon', type: 'image/png', sizes: '96x96', href: `${baseUrl}favicon-96x96.png`}},
    {tagName: 'link', attributes: {rel: 'apple-touch-icon', sizes: '180x180', href: `${baseUrl}apple-touch-icon.png`}},
    {tagName: 'link', attributes: {rel: 'manifest', href: `${baseUrl}site.webmanifest`}},
  ],
  clientModules: [require.resolve('./src/clientModules/legacyHashRedirect.js')],
  noIndex: process.env.SITE_INDEXABLE !== 'true',
  future: {v4: true},
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'throw', onBrokenMarkdownImages: 'throw'}},
  presets: [
    ['classic', {
      docs: {
        sidebarPath: require.resolve('./sidebars.js'),
        remarkPlugins: [remarkIdealImages],
        routeBasePath: 'docs',
        includeCurrentVersion: false,
        lastVersion: '1.5.0',
        versions: {
          '1.5.0': {label: '1.5.0', path: '', banner: 'none'},
          'classic-2.1.0': {label: 'Classic 2.1.0', path: 'classic-2.1.0', banner: 'unmaintained'},
        },
      },
      blog: {
        remarkPlugins: [remarkIdealImages],
        blogTitle: 'RepoPrompt CE Blog',
        blogDescription: 'News and updates from RepoPrompt CE.',
        onUntruncatedBlogPosts: 'throw',
        feedOptions: {type: ['rss', 'atom'], copyright: 'RepoPrompt CE'},
      },
      pages: {remarkPlugins: [remarkIdealImages]},
      theme: {customCss: [
        require.resolve('./src/css/responsive-tables.css'),
        require.resolve('./src/css/code-blocks.css'),
      ]},
      sitemap: {changefreq: 'weekly', priority: 0.5, ignorePatterns: ['**/privacy/**', '**/terms/**']},
    }],
  ],
  themes: [['cosmos-docusaurus-theme', {injectFavicon: false}]],
  plugins: [
    require.resolve('./plugins/seo-policy.cjs'),
    'docusaurus-plugin-image-zoom',
    ['docusaurus-plugin-llms', {
      generateLLMsTxt: true,
      generateLLMsFullTxt: true,
      generateMarkdownFiles: true,
      excludeImports: true,
      docsDir: [
        {path: 'versioned_docs/version-1.5.0', routeBasePath: 'docs', label: 'Community Edition 1.5.0'},
        {path: 'versioned_docs/version-classic-2.1.0', routeBasePath: 'docs/classic-2.1.0', label: 'Classic 2.1.0'},
      ],
    }],
    ['docusaurus-plugin-copy-page-button', {enabledActions: ['copy'], placement: 'article'}],
    ['@docusaurus/plugin-ideal-image', {quality: 85, min: 320, max: 1600, steps: 4, disableInDev: false}],
    ['@docusaurus/plugin-client-redirects', {
      redirects: [
        {from: ['/claim', '/unsubscribe', '/appcast', '/pricing', '/roadmap', '/prompt-anatomy'], to: '/'},
        {from: '/documentation', to: '/docs/'},
        {from: '/privacy-policy', to: '/privacy/'},
        {from: '/terms-and-conditions', to: '/terms/'},
      ],
    }],
  ],
  themeConfig: {
    prism: {
      darkTheme: require('prism-react-renderer').themes.palenight,
      theme: {
        plain: {color: '#24292f', backgroundColor: '#ffffff'},
        styles: [
          {types: ['comment', 'prolog', 'doctype', 'cdata'], style: {color: '#57606a', fontStyle: 'italic'}},
          {types: ['punctuation'], style: {color: '#7c3aed'}},
          {types: ['operator'], style: {color: '#087e8b'}},
          {types: ['string', 'char', 'attr-value', 'regex'], style: {color: '#287d27'}},
          {types: ['property', 'variable'], style: {color: '#1d4ed8'}},
          {types: ['number', 'boolean', 'constant', 'symbol'], style: {color: '#a94709'}},
          {types: ['keyword', 'atrule', 'deleted'], style: {color: '#cf222e'}},
          {types: ['function', 'class-name'], style: {color: '#8250df'}},
          {types: ['tag', 'selector', 'attr-name', 'inserted'], style: {color: '#116329'}},
        ],
      },
    },
    zoom: {
      selector: '.markdown img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
    },
    image: 'images/blog/repo-prompt-community-edition.png',
    metadata: [{name: 'description', content: 'Documentation for RepoPrompt Community Edition and the Classic archive.'}],
    colorMode: {defaultMode: 'dark', respectPrefersColorScheme: true},
    navbar: {
      title: 'RepoPrompt',
      items: [
        {type: 'docSidebar', sidebarId: 'docsSidebar', label: 'Docs', position: 'left'},
        {to: '/blog/', label: 'Blog', position: 'left'},
        {type: 'docsVersionDropdown', position: 'right'},
      ],
    },
    tableOfContents: {minHeadingLevel: 2, maxHeadingLevel: 3},
    ...(algoliaValues.every(Boolean) ? {
      algolia: {appId: algoliaValues[0], apiKey: algoliaValues[1], indexName: algoliaValues[2], contextualSearch: true, insights: false},
    } : {}),
  },
};
