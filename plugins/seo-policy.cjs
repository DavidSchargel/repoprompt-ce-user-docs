const fs = require('node:fs/promises');
const path = require('node:path');

module.exports = function seoPolicy(context) {
  return {
    name: 'repoprompt-seo-policy',
    configureWebpack() {
      return {resolve: {alias: {'@docusaurus/Head': require.resolve('../src/components/SeoHead.js')}}};
    },
    async postBuild({outDir}) {
      const {url, baseUrl, noIndex} = context.siteConfig;
      const policy = noIndex
        ? `User-agent: *\nDisallow: ${baseUrl}\n`
        : `User-agent: *\nAllow: ${baseUrl}\nSitemap: ${new URL(baseUrl + 'sitemap.xml', url).href}\n`;
      await fs.writeFile(path.join(outDir, 'robots.txt'), policy);
    },
  };
};
