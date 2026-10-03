const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const root = path.resolve(process.argv[2] || path.join(__dirname, '..'));
const source = process.argv[3] && path.resolve(process.argv[3]);
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'migration/docs-manifest.json')));
const hash = (value) => crypto.createHash('sha256').update(value).digest('hex');
const walk = (node, fn) => {fn(node); (node.children || []).forEach(child => walk(child, fn));};
async function main() {
  const {compile, createProcessor} = await import('@mdx-js/mdx');
  const {default: frontmatter} = await import('remark-frontmatter');
  const {default: gfm} = await import('remark-gfm');
  const {default: GithubSlugger} = await import('github-slugger');
  const files = fs.readdirSync(path.join(root, 'versioned_docs'), {recursive: true}).filter(file => /\.mdx?$/.test(file)).map(file => 'versioned_docs/' + file);
  const failures = [], docs = new Map();
  let links = 0, images = 0, codeBlocks = 0, tables = 0, sourceTextFragments = 0, resolvedDocLinks = 0, crossVersionLinks = 0, sourceTableCells = 0, exactSourceCodeBlocks = 0;
  const {resolveMarkdownLinkPathname} = require('@docusaurus/utils');
  const sourceToPermalink = new Map(manifest.documents.map(d=>['@site/'+d.destination,d.route]));
  sourceToPermalink.set('@site/versioned_docs/version-classic-2.1.0/index.md','/docs/classic-2.1.0/');
  const parser = require('@babel/parser');
  const traverse = require('@babel/traverse').default;
  const normalize = value => value.normalize('NFKC').replace(/[^\p{L}\p{N}]/gu,'').toLowerCase();
  for (const file of files) {
    const content = fs.readFileSync(path.join(root, file), 'utf8');
    try {
      await compile(content, {remarkPlugins: [frontmatter, gfm]});
      const tree = createProcessor({remarkPlugins: [frontmatter, gfm]}).parse(content);
      const ids = new Set(), slugger = new GithubSlugger();
      let lastHeading = 1;
      walk(tree, node => {
        if (node.type === 'heading') {
          assert.ok(node.depth <= lastHeading + 1, file + ': heading skips a level');
          lastHeading = node.depth;
          let text = '';
          walk(node, child => {if (child.type === 'text' || child.type === 'inlineCode') text += child.value;});
          const explicit = text.match(/\s*\{#([^}]+)\}$/);
          ids.add(explicit ? explicit[1] : slugger.slug(text));
        }
        if(node.type==='code') { assert.ok(node.lang, file + ': missing code language'); codeBlocks++; }
        if(node.type==='table') { tables++; assert.ok(node.children.every(row=>row.children.length===node.children[0].children.length),file+': inconsistent table width'); }
      });
      docs.set(file, {tree, ids, content});
      assert.doesNotMatch(content, /repo\s*bench|benchmark|cloudflare|twitter|https?:\/\/(?:www\.)?x\.com\/|mailto:|\bcontact\b|privacy officer|localization|localisation|translation|[\w.+-]+@[\w.-]+\.[a-z]{2,}/i, file + ': excluded content');
      assert.doesNotMatch(content, /(?:\/docs)?#s=|<img\b|ReactPlayer|className=|style=|foundation-fixtures|foundation placeholder/i, file + ': legacy markup or placeholder');
    } catch(error) {failures.push(file + ': ' + error.message);}
  }
  for(const [file,doc] of docs) walk(doc.tree,node=>{
    if(!['link','image'].includes(node.type))return;
    links++;
    if(node.type==='image') {images++; if(!node.alt || node.alt.length < 8)failures.push(file+': image lacks informative alt');}
    const url=node.url;
    if(/^[a-z][\w+.-]*:/i.test(url))return;
    if(url.startsWith('/')) {if(!['/','/llms.txt','/llms-full.txt','/blog/context-over-convenience/','/blog/context-over-convenience'].includes(url))failures.push(file+': root-relative link needs route audit '+url);return;}
    const [base,anchor]=url.split('#');
    const resolved=base?path.posix.normalize(path.posix.join(path.posix.dirname(file),base)):file;
    if(!fs.existsSync(path.join(root,resolved)))failures.push(file+': broken local link '+url);
    if(base && /\.mdx?$/.test(base)) {
      const version=file.split('/')[1];
      const route=resolveMarkdownLinkPathname(base,{sourceFilePath:path.join(root,file),sourceToPermalink,siteDir:root,contentPaths:{contentPath:path.join(root,'versioned_docs',version)}});
      if(!route || route!==sourceToPermalink.get('@site/'+resolved))failures.push(file+': Docusaurus did not resolve Markdown link '+url);
      else {resolvedDocLinks++;if(resolved.split('/')[1]!==version)crossVersionLinks++;}
    }
    if(anchor && docs.has(resolved) && !docs.get(resolved).ids.has(decodeURIComponent(anchor)))failures.push(file+': broken anchor '+url);
  });
  assert.equal(manifest.documents.length,81);
  assert.equal(new Set(manifest.documents.map(d=>d.source)).size,manifest.documents.length);
  assert.equal(manifest.unresolvedLinks.length,0);
  const hashRoutes=JSON.parse(fs.readFileSync(path.join(root,'migration/legacy-doc-routes.json')));
  const routes=new Set(manifest.documents.map(d=>d.route));
  for(const route of Object.values(hashRoutes))assert.ok(routes.has(route),'Unknown legacy-hash destination '+route);
  for(const d of manifest.documents.filter(d=>d.legacyHash))assert.equal(hashRoutes[d.legacyHash],d.route);
  for(const version of ['1.5.0','classic-2.1.0']) {
    const sidebar=JSON.parse(fs.readFileSync(path.join(root,'versioned_sidebars/version-'+version+'-sidebars.json')));
    const ids=[];
    const flatten=(items)=>items.forEach(item=>typeof item==='string'?ids.push(item):flatten(item.items));
    flatten(sidebar.docsSidebar);
    assert.equal(ids.length,new Set(ids).size,'Duplicate sidebar ID');
    const expected=['overview',...manifest.documents.filter(d=>d.version===version && d.id!=='overview').map(d=>d.id)];
    assert.deepEqual(ids.slice().sort(),expected.sort());
    for(const id of ids) assert.ok(id==='overview'||manifest.documents.some(d=>d.version===version&&d.id===id),'Unmapped sidebar entry');
  }
  for(const d of manifest.documents) {
    assert.ok(docs.has(d.destination),'Missing destination '+d.destination);
    if(d.source.startsWith('changelog/'))assert.equal(d.version,d.source.endsWith('CEVersion10.js')?'1.5.0':'classic-2.1.0');
    if(source) {
      const sourceText=fs.readFileSync(path.join(source,'src/docs',d.source),'utf8');
      assert.equal(hash(sourceText),d.sourceSha256,'Source changed: '+d.source);
      const ast=parser.parse(sourceText,{sourceType:'module',plugins:['jsx']});
      let name,body;
      traverse(ast,{ExportDefaultDeclaration(p){name=p.node.declaration.name;}});
      traverse(ast,{FunctionDeclaration(p){if(p.node.id.name===name)body=p.node.body.body.find(n=>n.type==='ReturnStatement')?.argument;},VariableDeclarator(p){if(p.node.id.name===name){const f=p.node.init;body=f.body.type==='BlockStatement'?f.body.body.find(n=>n.type==='ReturnStatement')?.argument:f.body;}}});
      let destText='';
      walk(docs.get(d.destination).tree,n=>{if(['text','code','inlineCode'].includes(n.type))destText+=n.value+' ';if(n.type==='image')destText+=n.alt+' ';});
      const normalized=normalize(destText);
      function check(n) {
        if(d.omissions.some(o=>n.loc && n.loc.start.line>=o.lines[0] && n.loc.end.line<=o.lines[1]))return;
        let text=n.type==='JSXText'?n.value:n.type==='JSXExpressionContainer'&&n.expression.type==='TemplateLiteral'&&!n.expression.expressions.length?n.expression.quasis.map(q=>q.value.cooked).join(''):'';
        text=normalize(text);
        if(text.length>=16) {
          sourceTextFragments++;
          if(!normalized.includes(text))failures.push(d.source+': unaccounted source text at line '+n.loc.start.line+': '+text.slice(0,100));
        }
        (n.children||[]).forEach(check);
      }
      check(body);
      const sourceTables=[],sourcePres=[];
      function collect(n) {const t=n.type==='JSXElement'?n.openingElement.name.name:'';if(t==='table')sourceTables.push(n);if(t==='pre')sourcePres.push(n);(n.children||[]).forEach(collect);}
      collect(body);
      const destTables=[],destPres=[];
      walk(docs.get(d.destination).tree,n=>{if(n.type==='table')destTables.push(n);if(n.type==='code')destPres.push(n);});
      assert.equal(sourceTables.length,destTables.length,d.source+': table count changed');
      function literal(n) {
        if(n.type==='JSXText')return n.value;
        if(n.type==='JSXExpressionContainer') {const x=n.expression;if(x.type==='StringLiteral')return x.value;if(x.type==='TemplateLiteral')return x.quasis.map(q=>q.value.cooked).join('');}
        return (n.children||[]).map(literal).join('');
      }
      function text(n) {return ['text','inlineCode','code'].includes(n.type)?n.value:(n.children||[]).map(text).join('');}
      const tight=s=>s.replace(/\s+/g,'');
      sourceTables.forEach((table,i)=>{
        const rows=[];
        function rowsOf(n){if(n.type==='JSXElement'&&n.openingElement.name.name==='tr')rows.push(n);else(n.children||[]).forEach(rowsOf);}
        rowsOf(table);
        const hasHeader=rows[0].children.some(n=>n.type==='JSXElement'&&n.openingElement.name.name==='th');
        const destRows=destTables[i].children.slice(hasHeader?0:1);
        assert.equal(rows.length,destRows.length,d.source+': table row count changed');
        rows.forEach((row,j)=>{
          const cells=row.children.filter(n=>n.type==='JSXElement'&&['td','th'].includes(n.openingElement.name.name));
          assert.equal(cells.length,destRows[j].children.length,d.source+': table cell count changed');
          cells.forEach((cell,k)=>{
            sourceTableCells++;
            const actual=tight(text(destRows[j].children[k]));
            let cursor=0;
            function fragments(n) {
              if(n.type==='JSXText'||n.type==='JSXExpressionContainer') {
                const expected=tight(literal(n));
                if(expected){const found=actual.indexOf(expected,cursor);assert.ok(found>=0,d.source+': table cell text/symbol changed: '+expected);cursor=found+expected.length;}
              } else(n.children||[]).forEach(fragments);
            }
            fragments(cell);
          });
        });
      });
      sourcePres.forEach((pre,i)=>{assert.equal(destPres[i]?.value,literal(pre).trim(),d.source+': code punctuation/whitespace changed at source block '+i);exactSourceCodeBlocks++;});
    }
  }
  for(const a of manifest.assets)assert.equal(hash(fs.readFileSync(path.join(root,a.destination))),a.sha256,'Asset mismatch '+a.destination);
  if(source) {
    assert.equal(hash(fs.readFileSync(path.join(source,manifest.registry))),manifest.registrySha256);
    const sourceFiles=fs.readdirSync(path.join(source,'src/docs'),{recursive:true}).filter(f=>f.endsWith('.js')).sort();
    assert.deepEqual(manifest.documents.map(d=>d.source).sort(),sourceFiles,'Incomplete source coverage');
  }
  if(failures.length)throw new Error(failures.join('\n'));
  console.log(JSON.stringify({status:'passed',sourceFiles:manifest.sourceFiles,registered:manifest.registeredFiles,unregistered:manifest.archivedUnregisteredFiles,versions:manifest.versionCounts,pages:files.length,links,images,localAssets:manifest.assets.length,codeBlocks,tables,sourceTextFragments,resolvedDocLinks,crossVersionLinks,sourceTableCells,exactSourceCodeBlocks,legacyHashMappings:Object.keys(hashRoutes).length,checks:['strict MDX + GFM compilation','heading hierarchy','source inventory and SHA-256','sidebar coverage and uniqueness','version split','Docusaurus local/cross-version link resolution and hash mappings','exact source code and table-cell symbols','image alt text and binary SHA-256','required exclusions','no source SPA markup or fixtures']},null,2));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
