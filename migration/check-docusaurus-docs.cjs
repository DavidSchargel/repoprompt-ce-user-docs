const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {processDocMetadata} = require('@docusaurus/plugin-content-docs/lib/docs.js');
const {DEFAULT_OPTIONS} = require('@docusaurus/plugin-content-docs/lib/options.js');
const {DEFAULT_PARSE_FRONT_MATTER, resolveMarkdownLinkPathname} = require('@docusaurus/utils');
const {createProcessorUncached} = require('@docusaurus/mdx-loader/lib/processor.js');
const remarkIdealImages = require('../plugins/remark-ideal-images.cjs');
const root = path.resolve(process.argv[2] || path.join(__dirname, '..'));
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'migration/docs-manifest.json')));
const files = fs.readdirSync(path.join(root, 'versioned_docs'), {recursive: true}).filter(f=>/\.mdx?$/.test(f)).map(f=>'versioned_docs/'+f);
const noTrailingSlash = value => value.replace(/\/$/,'');
async function main() {
  let compiled = 0;
  for (const baseUrl of ['/', '/fixture-repo/']) {
    const metadata = new Map();
    for(const file of files) {
      const versionName=file.split('/')[1].slice('version-'.length);
      const contentPath=path.join(root,'versioned_docs','version-'+versionName);
      const result=await processDocMetadata({
        docFile:{source:path.relative(contentPath,path.join(root,file)),content:fs.readFileSync(path.join(root,file),'utf8'),contentPath,filePath:path.join(root,file)},
        versionMetadata:{versionName,contentPath,path:baseUrl+'docs/'+(versionName==='1.5.0'?'':'classic-2.1.0/'),tagsPath:baseUrl+'docs/tags/'},
        context:{siteDir:root,siteConfig:{markdown:{parseFrontMatter:DEFAULT_PARSE_FRONT_MATTER},future:{experimental_vcs:'git'}}},
        options:DEFAULT_OPTIONS,env:'production',tagsFile:undefined,
      });
      const entry=manifest.documents.find(d=>d.destination===file);
      const expected=entry?.route || '/docs/classic-2.1.0/';
      assert.equal(noTrailingSlash(result.permalink),noTrailingSlash(baseUrl+expected.slice(1)),file+': route differs from manifest');
      assert.equal(result.id,entry?.id||'overview',file+': ID differs from sidebar manifest');
      metadata.set(file,result);
    }
    const sourceToPermalink=new Map([...metadata.values()].map(m=>[m.source,m.permalink]));
    assert.equal(new Set([...metadata.values()].map(m=>m.permalink)).size,files.length,'Duplicate docs route');
    const processor=await createProcessorUncached({format:'mdx',options:{
      siteDir:root,staticDirs:[path.join(root,'static')],admonitions:true,remarkPlugins:[remarkIdealImages],
      markdownConfig:{anchors:{maintainCase:false},emoji:true,mermaid:false,mdx1Compat:{comments:true},hooks:{onBrokenMarkdownLinks:'throw',onBrokenMarkdownImages:'throw'}},
      resolveMarkdownLink:({sourceFilePath,linkPathname})=>resolveMarkdownLinkPathname(linkPathname,{sourceFilePath,sourceToPermalink,siteDir:root,contentPaths:{contentPath:path.dirname(sourceFilePath)}}),
    }});
    for(const [file,meta] of metadata) {
      const result=await processor.process({content:fs.readFileSync(path.join(root,file),'utf8'),filePath:path.join(root,file),frontMatter:meta.frontMatter,compilerName:'server'});
      assert.ok(result.content.includes('MDXContent'),file+': no compiled component');
      assert.doesNotMatch(result.content,/href: ["'][^"']*\.mdx?["']/,file+': unresolved Markdown file link');
      if(file==='versioned_docs/version-1.5.0/index.mdx') {
        assert.ok(result.content.includes(baseUrl+'docs/classic-2.1.0/'),file+': cross-version link lost baseUrl');
        assert.ok(result.content.includes('rate-limited_profile.jpg'),file+': primary ideal-image import missing');
        assert.ok(result.content.includes('TabItem'),file+': language tabs missing');
      }
      compiled++;
    }
  }
  console.log(JSON.stringify({status:'passed',pages:files.length,compiledDocumentVariants:compiled,baseUrls:['/','/fixture-repo/'],checks:['actual Docusaurus metadata IDs and routes','unique routes','actual Docusaurus MDX/admonition/details/image pipeline','actual cross-version Markdown-link transformation','root and project-subpath permalinks','primary code tabs and local image import'],notRun:['webpack/production build','responsive-image binary generation','browser interactions']},null,2));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
