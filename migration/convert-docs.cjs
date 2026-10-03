const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const target = path.resolve(__dirname, '..');
const source = path.resolve(process.argv[2] || path.join(target, '../RepoPromptWeb'));
const output = path.resolve(process.argv[3] || '/tmp/repoprompt-docs-migration');
if (output === source || output.startsWith(source + path.sep)) throw new Error('Source writes are prohibited');
const parse = (text) => parser.parse(text, {sourceType: 'module', plugins: ['jsx']});
const sha = (text) => crypto.createHash('sha256').update(text).digest('hex');
const read = (file) => fs.readFileSync(path.join(source, file), 'utf8');
const write = (file, content) => {
  if (!/^(versioned_docs\/|versioned_sidebars\/|migration\/|static\/images\/docs\/|sidebars\.js$)/.test(file)) throw new Error('Unowned output: ' + file);
  const destination = path.join(output, file);
  fs.mkdirSync(path.dirname(destination), {recursive: true});
  fs.writeFileSync(destination, content);
};
const registrySource = read('src/data/documentationData.js');
const registry = Function('lazy', registrySource.slice(registrySource.indexOf('const documentationData ='), registrySource.indexOf('// Helper function')) + '; return documentationData;')((fn) => fn.toString().match(/import\(['"]\.\.\/docs\/(.*?)['"]\)/)[1] + '.js');
const ce = new Map([
  ['overview/Overview.js', 'Current overview explicitly distinguishes Classic-only IDE Mode from agent workflows.'],
  ['getting-started/Installation.js', 'CE release repository, Homebrew cask, and Classic-to-CE migration instructions.'],
  ['agent-mode/AgentModeOverview.js', 'Explicit CE onboarding instructions; agent capability family retained together.'],
  ['agent-mode/AgentProviders.js', 'Provider setup for the CE Agent Mode capability family.'],
  ['agent-mode/AgentSessions.js', 'Session guide for the CE Agent Mode capability family.'],
  ['agent-mode/AgentSkills.js', 'Skills guide for the CE Agent Mode capability family.'],
  ['agent-mode/AgentWorkflows.js', 'Workflow guide for the CE Agent Mode capability family.'],
  ['reference/SettingsReference.js', 'Explicitly described by the source as the Repo Prompt CE settings reference.'],
  ['faq/PayForServices.js', 'Explicit CE free/open-source and third-party-provider cost explanation.'],
  ['changelog/CEVersion10.js', 'CE Version 1 changelog: mandatory 1.5.0 placement.'],
]);
const entries = [];
for (const sectionId of registry.sectionOrder) {
  const section = registry.sections[sectionId];
  for (const sub of Object.values(section.subsections).sort((a,b) => a.order - b.order)) {
    entries.push({source: sub.component, section: sectionId, sectionTitle: section.title, title: sub.title, subsection: sub.id, keywords: sub.keywords, legacyHash: '#s=' + sectionId + '&ss=' + sub.id});
  }
}
const kebab = (s) => s.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
for (const file of fs.readdirSync(path.join(source, 'src/docs'), {recursive: true}).filter(f => f.endsWith('.js')).sort()) {
  if (!entries.some(e => e.source === file)) entries.push({source: file, section: 'historical-guides', sectionTitle: 'Historical guides', title: path.basename(file, '.js').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2').replace(/([a-z0-9])([A-Z])/g, '$1 $2'), subsection: file.split('/')[0] + '/' + kebab(path.basename(file, '.js')), legacyHash: null});
}
for (const e of entries) {
  if (e.source === 'faq/PayForServices.js') { e.sectionTitle = 'FAQ'; e.title = 'Do I need to pay for AI services?'; }
  e.version = ce.has(e.source) ? '1.5.0' : 'classic-2.1.0';
  e.id = e.source === 'overview/Overview.js' ? 'overview' : e.section + '/' + e.subsection;
  e.destination = 'versioned_docs/version-' + e.version + '/' + (e.id === 'overview' ? 'index.mdx' : e.id + '.mdx');
  e.route = '/docs/' + (e.version === '1.5.0' ? '' : 'classic-2.1.0/') + (e.id === 'overview' ? '' : e.id + '/');
  e.reason = ce.get(e.source) || (e.source.startsWith('changelog/') ? 'Historical Classic release notes.' : 'Conservative Classic archive placement: historical or not demonstrably CE-specific.');
  e.omissions = [];
  e.adaptations = [];
}
const bySource = (file) => entries.find(e => e.source === file);
const aliases = {
  'mcp-server/code-reviews': 'mcp/CodeReviews.js',
  'ide-mode/context-builder': 'file-selection/ContextBuilder.js',
  'building-context/overview': 'context/ContextOverview.js',
  'building-context/file-selection': 'context/FileSelection.js',
  'building-context/codemaps': 'context/Codemaps.js',
  'building-context/tokens': 'context/TokenManagement.js',
  'building-context/presets': 'context/Presets.js',
  'building-context/context-builder': 'file-selection/ContextBuilder.js',
  'getting-started/installation': 'getting-started/Installation.js',
  'getting-started/interface': 'getting-started/InterfaceOverview.js',
  'getting-started/first-prompt': 'getting-started/FirstPrompt.js',
};
const legacyLinks = [], unresolvedLinks = [], assets = new Map();
const relative = (e, dest) => {
  let result = path.posix.relative(path.posix.dirname(e.destination), dest);
  return result.startsWith('.') ? result : './' + result;
};
function link(href, e) {
  href = href.replace(/&amp;/g, '&');
  if (href === 'https://repoprompt.com/blog/context-over-convenience') return '/blog/context-over-convenience/';
  const hash = href.match(/^(?:https?:\/\/(?:www\.)?repoprompt\.com)?(?:\/docs\/?|\/documentation\/?|)?#s=([^&]+)(?:&ss=([^&]+))?/);
  if (hash) {
    const section = decodeURIComponent(hash[1]), sub = hash[2] && decodeURIComponent(hash[2]);
    let dest = sub ? entries.find(x => x.section === section && x.subsection === sub) : entries.find(x => x.section === section);
    if (!dest && aliases[section + '/' + sub]) dest = bySource(aliases[section + '/' + sub]);
    if (!dest) {
      unresolvedLinks.push({source: e.source, href});
      return href;
    }
    legacyLinks.push({source: e.source, from: href, to: dest.route});
    return relative(e, dest.destination);
  }
  if (/^(https?:\/\/(www\.)?repoprompt\.com)?\/docs\/?$/.test(href)) return relative(e, bySource('overview/Overview.js').destination);
  if (/^(https?:\/\/(www\.)?repoprompt\.com)?\/(pricing|roadmap|prompt-anatomy|claim|unsubscribe|appcast)\/?$/.test(href)) { e.adaptations.push('Retired link ' + href + ' points to the home route.'); return '/'; }
  return href;
}
const tag = (n) => n?.type === 'JSXElement' ? n.openingElement.name.name : '';
function attr(n, key) {
  const a = n.openingElement?.attributes.find(a => a.name?.name === key);
  if (!a?.value) return '';
  if (a.value.type === 'StringLiteral') return a.value.value;
  if (a.value.type === 'JSXExpressionContainer' && a.value.expression.type === 'StringLiteral') return a.value.expression.value;
  return '';
}
function jsxText(s) {
  const lines = s.replace(/\r/g, '').split('\n');
  return lines.map((line, i) => {
    line = line.replace(/\t/g, ' ');
    if (i) line = line.replace(/^ +/, '');
    if (i < lines.length - 1) line = line.replace(/ +$/, '');
    return line + (line && i < lines.length - 1 && lines.slice(i + 1).some(l => l.trim()) ? ' ' : '');
  }).join('');
}
function raw(n) {
  if (!n) return '';
  if (n.type === 'JSXText') return jsxText(n.value);
  if (n.type === 'JSXExpressionContainer') {
    const x = n.expression;
    if (x.type === 'StringLiteral') return x.value;
    if (x.type === 'TemplateLiteral' && !x.expressions.length) return x.quasis.map(q => q.value.cooked).join('');
    if (x.type === 'JSXEmptyExpression') return '';
    if (x.type === 'ConditionalExpression' && x.alternate.type === 'StringLiteral') return x.alternate.value;
    if (x.type === 'ConditionalExpression' && x.alternate.type === 'ConditionalExpression') return 'Copy Docs';
    throw new Error('Unhandled content expression ' + x.type);
  }
  return (n.children || []).map(raw).join('');
}
const escape = (s) => s.replace(/\\/g, '\\\\').replace(/([*_[\]`|])/g, '\\$1').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/{/g, '&#123;').replace(/}/g, '&#125;');
const excluded = /repo\s*bench|benchmark|cloudflare|twitter|(?:https?:\/\/)?(?:www\.)?x\.com\/|mailto:|\bcontact\b|privacy officer|localization|localisation|translation|[\w.+-]+@[\w.-]+\.[a-z]{2,}/i;
function omission(e,n,reason) {
  e.omissions.push({lines: [n.loc.start.line, n.loc.end.line], reason, text: raw(n).trim()});
}
function cleanChildren(children,e) {
  const result=[];
  let excludedHeading=0;
  for(const n of children || []) {
    const t=tag(n), level=/^h[1-6]$/.test(t) ? +t[1] : 0;
    if (level && excludedHeading && level <= excludedHeading) excludedHeading=0;
    if (level && excluded.test(raw(n))) excludedHeading=level;
    if (excludedHeading) { if (n.type !== 'JSXText' || n.value.trim()) omission(e,n,'Excluded subject section'); continue; }
    if (t==='button') { omission(e,n,'Source SPA interaction replaced by documentation Copy page and code-copy controls'); continue; }
    if (['p','li','a'].includes(t) && excluded.test(raw(n) + ' ' + attr(n,'href'))) {
      if (e.source==='changelog/ClassicVersion14.js' && t==='p' && raw(n).startsWith('The Classic')) { result.push({type:'JSXText',value:'The Classic Edition 1.4 series introduces the Presets system, macOS Tahoe support, git integration, and major performance optimizations.',loc:n.loc}); omission(e,n,'Removed only the Repo Bench clause; other features preserved'); continue; }
      if (raw(n)==='Performance improvements and benchmark view fixes') { result.push({type:'JSXElement',openingElement:{name:{name:'li'},attributes:[]},children:[{type:'JSXText',value:'Performance improvements'}],loc:n.loc}); omission(e,n,'Removed benchmark-view clause; performance improvements retained'); continue; }
      if (raw(n).includes('Agent Models settings surfaces related cross-links')) { result.push({type:'JSXElement',openingElement:{name:{name:'li'},attributes:[]},children:[{type:'JSXText',value:'Agent Models settings surfaces related cross-links (Oracle Model Presets, Delegated Edits) in a Related Settings section'}],loc:n.loc}); omission(e,n,'Removed Benchmark Model from the related-settings list'); continue; }
      omission(e,n,'Required exclusion'); continue;
    }
    if (e.source==='changelog/ClassicVersion14.js' && t==='div' && raw(n).includes('1.4.25 - September 29, 2025')) {
      const headings=(n.children||[]).filter(x=>tag(x)==='h5');
      if(headings.length===1 && raw(headings[0]).includes('1.4.25')) { omission(e,n,'Entire release entry concerns Repo Bench and global rankings'); continue; }
    }
    result.push(n);
  }
  return result;
}
function render(n,e,state) {
  if (n.type==='JSXText') return escape(jsxText(n.value));
  if(n.type==='JSXExpressionContainer') return escape(raw(n));
  if(n.type==='JSXFragment') return children(n,e,state);
  const t=tag(n);
  if(t==='source') return '';
  if(['ExploreDots','CurateDots','Arrow'].includes(t)) { e.adaptations.push('Decorative '+t+' SVG omitted; adjacent pipeline labels retained.'); return ''; }
  if(t==='HandoffCard') return '\n\nExample handoff: `auth.ts L5–89`, `api.ts L22–58`, `useAuth.ts L1–41`, `Header.tsx L12–67`.\n\n';
  if(t==='OrchestrationFlow') { e.adaptations.push('Interactive orchestration diagram represented as a textual workflow.'); return '\n\n**Orchestration flow:** task → context discovery → planning → delegated implementation → verification.\n\n'; }
  if(t==='ReactPlayer') { e.adaptations.push('Embedded player replaced by a descriptive external video link.'); return '\n\n[Watch the '+escape(e.title)+' video walkthrough]('+attr(n,'src')+')\n\n'; }
  if(t==='pre') {
    const code=raw(n).replace(/^\n/, '').replace(/\n\s*$/, '');
    const codeChild=(n.children||[]).find(c=>tag(c)==='code');
    let lang=(attr(n,'className')+' '+(codeChild?attr(codeChild,'className'):'')).match(/language-([\w-]+)/)?.[1];
    if(!lang) { try { JSON.parse(code);lang='json'; } catch { lang=/^\s*(?:#|\$ |rp-cli |brew |npm |npx |claude |codex |export |curl |chmod |cd |mkdir |\/Applications\/)/m.test(code)?'bash':/^\s*<[\w!?]/.test(code)?'xml':'text'; } }
    const fence='`'.repeat(Math.max(3,...(code.match(/`+/g)||[]).map(s=>s.length+1)));
    state.codeBlocks++;
    return '\n\n'+fence+lang+'\n'+code+'\n'+fence+'\n\n';
  }
  if(t==='code') {
    const code=raw(n).trim().replace(/\n/g,' ');
    const fence='`'.repeat(Math.max(1,...(code.match(/`+/g)||[]).map(s=>s.length+1)));
    return fence+(code.startsWith('`')?' ':'')+code+(code.endsWith('`')?' ':'')+fence;
  }
  if(t==='img') {
    const src=attr(n,'src');
    let alt=attr(n,'alt') || e.title+' illustration';
    if(!/screenshot|showing|diagram|interface|workflow|panel|settings|view|illustration|podcast/i.test(alt)) alt += ' — '+e.title+' documentation illustration';
    let url=src;
    if(src.startsWith('/')) {
      let assetSrc=src;
      if (!fs.existsSync(path.join(source,'public'+assetSrc)) && fs.existsSync(path.join(source,'public'+assetSrc.replace(/\.(png|jpe?g)$/,'.webp')))) {
        assetSrc=assetSrc.replace(/\.(png|jpe?g)$/,'.webp');
        e.adaptations.push('Missing source image '+src+' replaced by its existing WebP counterpart.');
      }
      const destination='static/images/docs'+assetSrc;
      const origin='public'+assetSrc;
      if(!fs.existsSync(path.join(source,origin))) throw new Error('Missing asset '+origin);
      assets.set(origin,{source:origin,destination,sha256:sha(fs.readFileSync(path.join(source,origin)))});
      url=relative(e,destination);
    }
    state.images++;
    return '\n\n!['+escape(alt)+']('+url+')\n\n';
  }
  if(t==='table') {
    const rows=[];
    function collect(x) { if(tag(x)==='tr')rows.push(x);else (x.children||[]).forEach(collect); }
    collect(n);
    const cells=rows.map(row=>(row.children||[]).filter(x=>['td','th'].includes(tag(x))).map(c=>children(c,e,state).trim().replace(/\n\s*\n/g,'<br />').replace(/\n/g,'<br />').replace(/(?<!\\)\|/g,'\\|').replace(/\s+/g,' ')));
    const width=Math.max(...cells.map(r=>r.length));
    const line=(r)=>'| '+Array.from({length:width},(_,i)=>r[i]||'').join(' | ')+' |';
    if(!cells.length)return '';
    state.tables++;
    const hasHeader=rows[0].children.some(c=>tag(c)==='th');
    const synthesized=e.source==='workflows/ModelRecommendations.js'?['Plan','Historical price','Use']:['Shortcut or gesture','Action'];
    const header=hasHeader?cells.shift():Array.from({length:width},(_,i)=>synthesized[i]||'Column '+(i+1));
    if(!hasHeader)e.adaptations.push('Source table at line '+n.loc.start.line+' had no header; descriptive Markdown column headings added without dropping rows.');
    return '\n\n'+[line(header),line(Array(width).fill('---')),...cells.map(line)].join('\n')+'\n\n';
  }
  if(t==='ul'||t==='ol') {
    let index=0;
    return '\n\n'+cleanChildren(n.children,e).filter(c=>tag(c)==='li').map(c=>{
      const prefix=t==='ol'?String(++index)+'. ':'- ';
      return prefix+children(c,e,state).trim().split('\n').map((line,i)=>i?' '.repeat(prefix.length)+line:line).join('\n');
    }).join('\n')+'\n\n';
  }
  if(t==='details') return '\n\n<details>\n\n'+children(n,e,state).trim()+'\n\n</details>\n\n';
  if(t==='summary') return '<summary>'+children(n,e,state).trim()+'</summary>\n\n';
  if(t==='a') {
    const content=children(n,e,state).trim();
    if(!attr(n,'href'))return content;
    const label=content.replace(/\n+/g,' ').replace(/\s+/g,' ');
    const result='['+label+']('+link(attr(n,'href'),e)+')';
    return (n.children||[]).some(c=>['div','p','img','picture'].includes(tag(c)))?'\n\n'+result+'\n\n':result;
  }
  const content=children(n,e,state);
  if(/^h[1-6]$/.test(t)) {
    let level=Math.max(2,+t[1]-state.headingOffset);
    level=Math.min(level,state.lastHeading+1);
    state.lastHeading=level; state.headings++;
    return '\n\n'+'#'.repeat(level)+' '+content.trim()+(attr(n,'id')?' {#'+attr(n,'id')+'}':'')+'\n\n';
  }
  if(t==='strong')return '**'+content.trim()+'**';
  if(t==='em')return '*'+content.trim()+'*';
  if(t==='br')return '<br />';
  if(t==='span')return content;
  if(t==='div' && /tip-box|warning-box|note-box|info-box/.test(attr(n,'className'))) {
    const style=n.openingElement.attributes.find(a=>a.name?.name==='style');
    const warning=/warning/.test(attr(n,'className')) || /color-warning/.test(JSON.stringify(style?.value || ''));
    const kind=warning?'warning':/tip/.test(attr(n,'className'))?'tip':/info/.test(attr(n,'className'))?'info':'note';
    state.admonitions++;
    return '\n\n:::'+kind+'\n\n'+content.trim()+'\n\n:::\n\n';
  }
  if(['p','div','section','picture','li'].includes(t))return '\n\n'+content.trim()+'\n\n';
  throw new Error('Unhandled JSX element '+t+' in '+e.source);
}
function children(n,e,state) { return cleanChildren(n.children,e).map(c=>render(c,e,state)).join(''); }
function page(e) {
  const src=read('src/docs/'+e.source), ast=parse(src);
  let exportName, body;
  traverse(ast,{ExportDefaultDeclaration(p){exportName=p.node.declaration.name;}});
  traverse(ast,{FunctionDeclaration(p){if(p.node.id.name===exportName)body=p.node.body.body.find(n=>n.type==='ReturnStatement')?.argument;},VariableDeclarator(p){if(p.node.id.name===exportName){const f=p.node.init;body=f.body.type==='BlockStatement'?f.body.body.find(n=>n.type==='ReturnStatement')?.argument:f.body;}}});
  if(!body)throw new Error('No component return '+e.source);
  const levels=[];
  function findLevels(n){if(/^h[1-6]$/.test(tag(n)))levels.push(+tag(n)[1]);(n.children||[]).forEach(findLevels);}
  findLevels(body);
  const state={headingOffset:Math.max(0,Math.min(...levels)-2),lastHeading:1,headings:0,codeBlocks:0,images:0,tables:0,admonitions:0};
  let content=render(body,e,state).replace(/\n[ \t]+\n/g,'\n\n').replace(/\n{3,}/g,'\n\n').trim();
  if(e.source==='overview/Overview.js') content=content.replace(/\*\*Talk to These Docs\*\*[\s\S]*?(?=\n## )/,'**Talk to These Docs**\n\nOpen all documentation in an AI assistant for guided help. Use the Copy page button to copy this article for an AI assistant. Complete machine-readable documentation is available through the site’s LLM exports.\n');
  e.sourceSha256=sha(src); e.features=state;
  e.adaptations.push('Source presentation styles removed; headings normalized under the document title; lists, tables, code, and prose retained as MDX.');
  if(e.source==='getting-started/GettingStarted.js'||e.source==='reference/Reference.js') content=':::caution Historical source\n\nThis archived guide mixes later CE availability wording with historical IDE/Apply and token-limit descriptions. It is preserved for reference, not as the current CE feature or pricing specification.\n\n:::\n\n'+content;
  let header='---\nid: '+JSON.stringify(e.id==='overview'?'overview':path.posix.basename(e.id))+'\ntitle: '+JSON.stringify(e.title)+'\ndescription: '+JSON.stringify(e.title+' — '+(e.version==='1.5.0'?'Repo Prompt Community Edition':'Repo Prompt Classic archive')+' documentation.')+'\n';
  header+='slug: '+JSON.stringify(e.id==='overview'?'/':'/'+e.id)+'\n';
  if(e.keywords) {
    e.excludedKeywords=e.keywords.filter(word=>excluded.test(word));
    header+='keywords: '+JSON.stringify(e.keywords.filter(word=>!excluded.test(word)))+'\n';
  }
  header+='hide_table_of_contents: false\ntoc_min_heading_level: 2\ntoc_max_heading_level: 4\n---\n\n';
  return header+content+'\n';
}
const pages=new Map(entries.map(e=>[e.destination,page(e)]));
if(unresolvedLinks.length) { console.error(JSON.stringify(unresolvedLinks,null,2)); throw new Error('Unmapped legacy links'); }
function categoryIndex(version, current) {
  const grouped=new Map();
  for(const e of entries.filter(e=>e.version===version && e.id!=='overview')) {if(!grouped.has(e.sectionTitle))grouped.set(e.sectionTitle,[]);grouped.get(e.sectionTitle).push(e);}
  return [...grouped].map(([title,docs])=>'### '+title+'\n\n'+docs.map(e=>'- ['+e.title+']('+relative(current,e.destination)+')').join('\n')).join('\n\n');
}
const primary=bySource('overview/Overview.js');
let overview=pages.get(primary.destination);
overview=overview.replace('---\n\n','---\n\nimport Tabs from \'@theme/Tabs\';\nimport TabItem from \'@theme/TabItem\';\n\n');
overview+='\n## Documentation table of contents\n\nThe current documentation version is **1.5.0**. Historical guides remain in the [Classic 2.1.0 archive](../version-classic-2.1.0/index.md), with cross-version links where the source guide is not demonstrably CE-specific.\n\n'+categoryIndex('1.5.0',primary)+'\n\n## Code examples: MCP and shell\n\nThe following language tabs show the same read-only settings request. Code blocks provide a Copy button. The full historical references are [App Settings Tool]('+relative(primary,bySource('mcp/AppSettings.js').destination)+') and [App Settings from the CLI]('+relative(primary,bySource('mcp/CLIAppSettings.js').destination)+').\n\n<Tabs groupId="settings-language">\n<TabItem value="json" label="JSON · MCP" default>\n\nCall `app_settings` with:\n\n```json\n{"op":"get","key":"ui.appearance_mode"}\n```\n\n</TabItem>\n<TabItem value="bash" label="Bash · rp-cli">\n\n```bash\nrp-cli -e \'app_settings op=get key=ui.appearance_mode\'\n```\n\n</TabItem>\n</Tabs>\n';
pages.set(primary.destination,overview);
const classicIndex={destination:'versioned_docs/version-classic-2.1.0/index.md'};
pages.set(classicIndex.destination,'---\nid: overview\ntitle: Repo Prompt Classic 2.1.0\ndescription: Historical Repo Prompt guides and Classic release notes.\nslug: /\nhide_table_of_contents: false\n---\n\n## About this archive\n\nThis archive preserves the Classic documentation and historical guides, including older material no longer linked from the source navigation. Commands, model recommendations, prices, limits, and feature descriptions reflect the source rather than a newly verified current specification. For CE installation and agent workflows, start with [Repo Prompt CE 1.5.0](../version-1.5.0/index.mdx).\n\n:::note Version history\n\nAll Classic changelogs are retained here. The CE Version 1 changelog belongs to the [1.5.0 documentation](../version-1.5.0/changelog/ce-version-1-0.mdx).\n\n:::\n\n## Documentation table of contents\n\n'+categoryIndex('classic-2.1.0',classicIndex)+'\n');
for(const [file,content]of pages)write(file,content);
for(const version of ['1.5.0','classic-2.1.0']) {
  const groups=new Map();
  for(const e of entries.filter(e=>e.version===version&&e.id!=='overview')) {if(!groups.has(e.sectionTitle))groups.set(e.sectionTitle,[]);groups.get(e.sectionTitle).push(e.id);}
  write('versioned_sidebars/version-'+version+'-sidebars.json',JSON.stringify({docsSidebar:['overview',...[...groups].map(([label,items])=>({type:'category',label,items}))]},null,2)+'\n');
}
write('sidebars.js',"module.exports = {docsSidebar: [{type: 'autogenerated', dirName: '.'}]};\n");
for(const asset of assets.values())write(asset.destination,fs.readFileSync(path.join(source,asset.source)));
const report={registry:'src/data/documentationData.js',registrySha256:sha(registrySource),sourceFiles:entries.length,registeredFiles:entries.filter(e=>e.legacyHash).length,archivedUnregisteredFiles:entries.filter(e=>!e.legacyHash).length,versionCounts:Object.fromEntries(['1.5.0','classic-2.1.0'].map(v=>[v,entries.filter(e=>e.version===v).length])),documents:entries,assets:[...assets.values()],legacyLinks,unresolvedLinks};
write('migration/docs-manifest.json',JSON.stringify(report,null,2)+'\n');
const hashRoutes=Object.fromEntries(entries.filter(e=>e.legacyHash).map(e=>[e.legacyHash,e.route]));
for(const section of registry.sectionOrder)hashRoutes['#s='+section]=entries.find(e=>e.section===section).route;
for(const [key,file]of Object.entries(aliases)){const [section,subsection]=key.split('/');hashRoutes['#s='+section+'&ss='+subsection]=bySource(file).route;}
write('migration/legacy-doc-routes.json',JSON.stringify(hashRoutes,null,2)+'\n');
console.log(JSON.stringify({output,sourceFiles:report.sourceFiles,registered:report.registeredFiles,unregistered:report.archivedUnregisteredFiles,versions:report.versionCounts,assets:assets.size,pages:pages.size,omissions:entries.reduce((n,e)=>n+e.omissions.length,0)},null,2));
