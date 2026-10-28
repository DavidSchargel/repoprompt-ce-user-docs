const introduction = '/docs/';
const repoBench = '/docs/faq/paid-version/#does-repoprompt-include-every-feature-from-the-paid-app';

// Extracted from RepoPromptWeb's src/App.js, public/sitemap.xml, and
// astro-site/src/content/blog/. Retained blog slugs already match their routes.
const redirects = [
  {from: '/documentation', to: introduction},
  {from: [
    '/unsubscribe', '/appcast', '/beta-available.json', '/llm.txt',
    '/roadmap', '/prompt-anatomy', '/repo-prompt-anatomy.html',
    '/blog/file-editing-evolution',
  ], to: introduction},
  {from: ['/claim', '/pricing', '/bench', '/bench/explorer', '/blog/building-repo-bench'], to: repoBench},
  {from: '/privacy-policy', to: '/privacy/'},
  {from: '/terms-and-conditions', to: '/terms/'},
];

module.exports = {introduction, repoBench, redirects};
