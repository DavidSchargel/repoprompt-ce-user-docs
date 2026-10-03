import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = process.env.SITE_BASE_URL || '/repoprompt-ce-user-docs/';
const evidence = await fs.mkdtemp('/private/tmp/repoprompt-browser-');
const report = {base, evidence, checks: [], errors: [], externalFailures: [], searchRequests: []};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (!pathname.startsWith(base)) {res.writeHead(404); res.end(); return;}
    let file = path.resolve(root, 'build', pathname.slice(base.length));
    if (!file.startsWith(path.join(root, 'build'))) throw new Error('Invalid path');
    if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
    const mime = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.txt':'text/plain','.md':'text/plain','.xml':'application/xml'};
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    res.end(await fs.readFile(file));
  } catch {res.writeHead(404); res.end('Not found');}
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const chrome = spawn(process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking','--remote-debugging-port=0',`--user-data-dir=${evidence}/profile`], {stdio: ['ignore','ignore','pipe']});
chrome.stderr.on('data', (data) => {report.chromeLog = ((report.chromeLog || '') + data.toString()).slice(-4000);});
chrome.on('error', (error) => report.errors.push(error.message));
let socket;
let captureFailure;
try {
  let port;
  for (let i = 0; i < 100; i++) {
    try {port = (await fs.readFile(path.join(evidence, 'profile/DevToolsActivePort'), 'utf8')).split('\n')[0]; break;} catch {await delay(100);}
  }
  assert.ok(port, 'Chrome did not start; run with authorized browser access');
  const tab = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {method:'PUT'})).json();
  socket = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {socket.onopen = resolve; socket.onerror = reject;});
  let sequence = 0;
  const pending = new Map();
  socket.onmessage = ({data}) => {
    const msg = JSON.parse(data);
    if (msg.id) {
      const promise = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) promise.reject(new Error(JSON.stringify(msg.error))); else promise.resolve(msg.result);
    }
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') report.errors.push(msg.params.args.map((arg) => arg.value || arg.description).join(' '));
    if (msg.method === 'Network.requestWillBeSent' && /algolia|docsearch/i.test(msg.params.request.url)) report.searchRequests.push(msg.params.request.url);
    if (msg.method === 'Runtime.exceptionThrown') report.errors.push(msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text);
    if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
      const entry = msg.params.entry;
      if (entry.url && !entry.url.startsWith(origin)) report.externalFailures.push(entry);
      else report.errors.push(entry.text);
    }
    if (msg.method === 'Network.responseReceived' && msg.params.response.status >= 400 && msg.params.response.url.startsWith(origin)) report.errors.push(`${msg.params.response.status} ${msg.params.response.url}`);
  };
  function send(method, params = {}) {
    const id = ++sequence;
    return new Promise((resolve, reject) => {pending.set(id, {resolve, reject}); socket.send(JSON.stringify({id, method, params}));});
  }
  async function evaluate(expression) {
    const result = await send('Runtime.evaluate', {expression, returnByValue: true, awaitPromise: true, userGesture: true});
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text + ': ' + result.exceptionDetails.exception?.description);
    return result.result.value;
  }
  async function until(expression) {
    for (let i = 0; i < 80; i++) {if (await evaluate(expression)) return; await delay(100);}
    throw new Error(`Timed out: ${expression}`);
  }
  async function go(route) {
    await send('Page.navigate', {url: origin + base + route});
    await until(`document.readyState === 'complete' && location.pathname.startsWith(${JSON.stringify(base)}) && !!document.querySelector('main')`);
    await delay(1300);
  }
  async function click(selector) {
    const point = await evaluate(`(() => {const e=document.querySelector(${JSON.stringify(selector)}); if(!e) return null; e.scrollIntoView({block:'center'}); const r=e.getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2};})()`);
    assert.ok(point, `Missing clickable element ${selector}`);
    await send('Input.dispatchMouseEvent', {type:'mouseMoved', ...point});
    await send('Input.dispatchMouseEvent', {type:'mousePressed', button:'left', clickCount:1, ...point});
    await send('Input.dispatchMouseEvent', {type:'mouseReleased', button:'left', clickCount:1, ...point});
    await delay(150);
  }
  async function key(key, code = key) {
    await send('Input.dispatchKeyEvent', {type:'keyDown', key, code});
    await send('Input.dispatchKeyEvent', {type:'keyUp', key, code});
  }
  async function screenshot(name) {
    const {data} = await send('Page.captureScreenshot', {format:'png', captureBeyondViewport:false});
    await fs.writeFile(path.join(evidence, name + '.png'), Buffer.from(data, 'base64'));
  }
  captureFailure = () => screenshot('failure');
  for (const method of ['Page.enable','Runtime.enable','Network.enable','Log.enable']) await send(method);
  await send('Browser.grantPermissions', {origin, permissions:['clipboardReadWrite','clipboardSanitizedWrite']});
  const sampleRoutes = ['', 'docs/', 'docs/agent-mode/providers/', 'docs/agent-mode/overview/', 'docs/classic-2.1.0/rp-cli/cli-guide/', 'docs/classic-2.1.0/changelog/version-2-1/', 'blog/', 'blog/context-over-convenience/', 'privacy/', 'terms/'];
  for (const mobile of [false, true]) {
    await send('Emulation.setDeviceMetricsOverride', {width:mobile?390:1440, height:mobile?844:1000, deviceScaleFactor:1, mobile});
    for (const theme of ['light','dark']) {
      await go('docs/');
      await evaluate(`localStorage.setItem('theme', ${JSON.stringify(theme)})`);
      await send('Emulation.setEmulatedMedia', {features:[{name:'prefers-color-scheme',value:theme}]});
      for (const route of sampleRoutes) {
        await go(route);
        await evaluate('document.fonts.ready.then(() => true)');
        const info = await evaluate(`(() => {
          const heading=document.querySelector('h1') || document.querySelector('h2');
          const code=document.querySelector('pre code');
          return {
            theme:document.documentElement.dataset.theme,
            overflow:document.documentElement.scrollWidth>innerWidth+1,
            h1:heading?.textContent,
            font:heading ? getComputedStyle(heading).fontFamily : null,
            codeFont:code ? getComputedStyle(code).fontFamily : null,
            baseFont:getComputedStyle(document.documentElement).getPropertyValue('--ifm-font-family-base'),
            loadedFonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>({family:f.family,weight:f.weight})),
            images:[...document.images].filter(i=>new URL(i.src).origin===location.origin).map(i=>({src:i.getAttribute('src'),currentSrc:i.currentSrc,complete:i.complete,width:i.naturalWidth,visible:i.getBoundingClientRect().top<innerHeight && i.getBoundingClientRect().bottom>0})),
            twitter:!!document.querySelector('meta[name^="twitter:"],meta[property^="twitter:"]')
          };
        })()`);
        const check = {route, viewport:mobile?'390x844':'1440x1000', ...info, status:'checking'};
        report.checks.push(check);
        if (info.overflow) {
          check.overflowDiagnostics = await evaluate(`(() => {
            const rect = e => {
              const r=e.getBoundingClientRect(), style=getComputedStyle(e);
              return {tag:e.tagName,id:e.id,className:typeof e.className==='string'?e.className:'',left:r.left,right:r.right,width:r.width,clientWidth:e.clientWidth,scrollWidth:e.scrollWidth,display:style.display,overflowX:style.overflowX,whiteSpace:style.whiteSpace,text:e.textContent.trim().slice(0,180)};
            };
            const tables=[...document.querySelectorAll('.markdown table')];
            const headings=[...document.querySelectorAll('.markdown h2,.markdown h3,.markdown h4')];
            const before={viewport:innerWidth,pageWidth:document.documentElement.scrollWidth,
              tables:tables.map(e=>({heading:headings.filter(h=>h.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING).at(-1)?.textContent,...rect(e)})),
              outsideViewport:[...document.querySelectorAll('main *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,40).map(rect)};
            const probe=document.createElement('style');
            probe.textContent='.markdown table {display:block!important;width:100%!important;max-width:100%!important;overflow-x:auto!important}';
            document.head.append(probe);
            const tableScrollProbe={pageWidth:document.documentElement.scrollWidth,tables:tables.map(rect)};
            probe.remove();
            return {before,tableScrollProbe,restoredPageWidth:document.documentElement.scrollWidth};
          })()`);
        }
        assert.equal(info.theme, theme);
        assert.equal(info.overflow, false, `${route}: horizontal page overflow`);
        assert.equal(info.twitter, false);
        if (route === 'docs/classic-2.1.0/rp-cli/cli-guide/') {
          const tableScroll = await evaluate(`(() => {
            const table=document.querySelectorAll('.markdown table')[1];
            if (!table) return null;
            const text=table.textContent;
            const original=table.scrollLeft;
            table.scrollLeft=table.scrollWidth;
            const result={overflowX:getComputedStyle(table).overflowX,clientWidth:table.clientWidth,scrollWidth:table.scrollWidth,scrollLeft:table.scrollLeft,pageWidth:document.documentElement.scrollWidth,
              parameterListPreserved:[...table.querySelectorAll('code')].some(e=>e.textContent==='list|switch|create|delete|add_folder|remove_folder|list_tabs|select_tab|create_tab|close_tab'),
              textUnchanged:table.textContent===text};
            table.scrollLeft=original;
            return result;
          })()`);
          check.tableScroll = tableScroll;
          assert.ok(tableScroll, 'Missing MCP Tools Reference table');
          assert.equal(tableScroll.overflowX, 'auto', 'Wide table must scroll locally, not clip');
          assert.ok(tableScroll.scrollWidth > tableScroll.clientWidth, 'Wide parameter content must remain intact');
          assert.ok(tableScroll.scrollLeft > 0, 'Table content must be reachable by horizontal scrolling');
          assert.ok(Math.abs(tableScroll.scrollLeft - (tableScroll.scrollWidth - tableScroll.clientWidth)) <= 1, 'Table must reach its right edge');
          assert.ok(tableScroll.pageWidth <= (mobile ? 390 : 1440) + 1, 'Scrolling the table must not widen the page');
          assert.ok(tableScroll.parameterListPreserved && tableScroll.textUnchanged, 'Do not truncate table/code content');
        }
        assert.ok(info.h1);
        assert.match(info.font, /Outfit/, `Cosmos display font is not active: ${info.font}`);
        assert.ok(info.loadedFonts.some(font => /Outfit/.test(font.family)), 'Cosmos Outfit font asset did not load');
        if (info.codeFont) assert.match(info.codeFont, /IBM Plex Mono/, 'Cosmos code font is not active');
        for (const image of info.images) {
          assert.doesNotMatch(decodeURIComponent(image.src), /\[object\s/i, 'Image object escaped the MDX renderer');
          if (image.visible) assert.ok(image.complete && image.width > 0, `Visible local image did not decode: ${image.src}`);
        }
        if (route === '' || route === 'docs/' || route === 'docs/agent-mode/providers/') await screenshot(`${mobile?'mobile':'desktop'}-${theme}-${route.replaceAll('/','-') || 'home'}`);
        check.status = 'passed';
      }
    }
  }
  await send('Emulation.setDeviceMetricsOverride', {width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await go('docs/');
  assert.ok(await evaluate(`!!document.querySelector('.theme-doc-toc-desktop a')`));
  assert.equal(await evaluate(`document.querySelectorAll('[role="tab"]').length`), 2);
  const keyboardCheck = {interaction:'manual-activation language tabs via real CDP keys', status:'checking', states:[]};
  report.checks.push(keyboardCheck);
  async function tabState(stage) {
    const state = await evaluate(`({
      focused:document.activeElement?.matches('[role="tab"]') ? document.activeElement.textContent.trim() : null,
      selected:[...document.querySelectorAll('[role="tab"][aria-selected="true"]')].map(e=>e.textContent.trim()),
      tabStops:[...document.querySelectorAll('[role="tab"][tabindex="0"]')].map(e=>e.textContent.trim()),
      visiblePanels:[...document.querySelectorAll('[role="tabpanel"]')].filter(e=>!e.hidden && getComputedStyle(e).display!=='none').map(e=>e.textContent.trim())
    })`);
    keyboardCheck.states.push({stage, ...state});
    return state;
  }
  await click('[role="tab"]');
  const initialTab = await tabState('clicked JSON');
  assert.match(initialTab.focused, /JSON/, 'Click must focus the first tab');
  assert.equal(initialTab.selected.length, 1);
  assert.match(initialTab.selected[0], /JSON/);
  await key('ArrowRight');
  await until(`document.activeElement?.matches('[role="tab"]') && document.activeElement.textContent.includes('Bash')`);
  const movedTab = await tabState('ArrowRight focuses Bash');
  assert.match(movedTab.focused, /Bash/);
  assert.deepEqual(movedTab.selected, initialTab.selected, 'Arrow movement must not activate manual tabs');
  await key('Enter');
  await until(`document.querySelector('[role="tab"][aria-selected="true"]')?.textContent.includes('Bash')`);
  const activatedTab = await tabState('Enter activates Bash');
  assert.match(activatedTab.focused, /Bash/);
  assert.equal(activatedTab.selected.length, 1);
  assert.match(activatedTab.selected[0], /Bash/);
  assert.deepEqual(activatedTab.tabStops, activatedTab.selected, 'Only the selected tab is in the Tab sequence');
  assert.equal(activatedTab.visiblePanels.length, 1);
  assert.ok(activatedTab.visiblePanels[0].includes('rp-cli'), 'Enter must display the Bash panel');
  await key('ArrowRight');
  await until(`document.activeElement?.matches('[role="tab"]') && document.activeElement.textContent.includes('JSON')`);
  const wrappedTab = await tabState('ArrowRight wraps to JSON');
  assert.deepEqual(wrappedTab.selected, activatedTab.selected);
  await key('ArrowLeft');
  await until(`document.activeElement?.matches('[role="tab"]') && document.activeElement.textContent.includes('Bash')`);
  const returnedTab = await tabState('ArrowLeft wraps back to Bash');
  assert.deepEqual(returnedTab.selected, activatedTab.selected);
  keyboardCheck.status = 'passed';
  await click('[role="tabpanel"]:not([hidden]) button[aria-label="Copy code to clipboard"]');
  assert.ok((await evaluate('navigator.clipboard.readText()')).includes('rp-cli'));
  await click('#copy-page-button-container button');
  await click('[data-copy-page-action="copy"]');
  assert.ok((await evaluate('navigator.clipboard.readText()')).includes('Why Context Engineering Matters'));
  report.checks.push({interaction:'keyboard language tabs, real code clipboard and page clipboard',status:'passed'});
  const versionToggle = await evaluate(`(() => {const e=[...document.querySelectorAll('.navbar__link')].find(e=>e.textContent.trim()==='1.5.0');if(e){e.dataset.auditVersion='true';return true;}return false;})()`);
  assert.ok(versionToggle, 'Missing version dropdown');
  await click('[data-audit-version="true"]');
  await click('.dropdown__menu a[href="' + base + 'docs/classic-2.1.0/"]');
  await until(`location.pathname===${JSON.stringify(base+'docs/classic-2.1.0/')}`);
  assert.ok(await evaluate(`document.body.textContent.includes('Classic')`));
  report.checks.push({interaction:'version dropdown reaches Classic archive',status:'passed'});
  await send('Emulation.setDeviceMetricsOverride', {width:390,height:844,deviceScaleFactor:1,mobile:true});
  await go('docs/');
  await click('.navbar__toggle');
  await until(`document.querySelector('.navbar-sidebar')?.getBoundingClientRect().x>=-1`);
  await screenshot('mobile-navigation');
  await click('.navbar-sidebar__close');
  await send('Emulation.setDeviceMetricsOverride', {width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  report.checks.push({interaction:'mobile navigation opens and closes',status:'passed'});
  await go('docs/agent-mode/overview/');
  await until(`!!document.querySelector('img.medium-zoom-image')`);
  const zoomCheck = {interaction:'image zoom opens fully and real Escape closes; lazy responsive image decodes',status:'checking'};
  report.checks.push(zoomCheck);
  await evaluate(`(() => {
    const image=document.querySelector('img.medium-zoom-image');
    const state=window.__auditZoom={events:[],keys:[]};
    for (const type of ['open','opened','close','closed']) {
      image.addEventListener('medium-zoom:'+type, () => state.events.push({type,time:performance.now()}));
    }
    document.addEventListener('keyup', e => {
      if(e.key==='Escape') state.keys.push({key:e.key,code:e.code,trusted:e.isTrusted,target:e.target.tagName,time:performance.now()});
    }, {capture:true});
  })()`);
  try {
    await click('img.medium-zoom-image');
    await until(`window.__auditZoom.events.some(e=>e.type==='opened') && !!document.querySelector('.medium-zoom-image--opened')`);
    await screenshot('image-zoom');
    await key('Escape');
    await until(`window.__auditZoom.events.some(e=>e.type==='closed') && !document.querySelector('.medium-zoom-image--opened') && !document.querySelector('.medium-zoom-overlay')`);
    assert.ok(await evaluate(`(() => {const i=document.querySelector('.markdown img');return i.complete && i.naturalWidth>0 && i.loading==='lazy' && !!i.srcset && !i.classList.contains('medium-zoom-image--hidden');})()`));
  } finally {
    zoomCheck.diagnostics = await evaluate(`({
      ...window.__auditZoom,
      documentFocused:document.hasFocus(),activeElement:document.activeElement?.tagName,
      overlayPresent:!!document.querySelector('.medium-zoom-overlay'),
      clones:[...document.querySelectorAll('.medium-zoom-image--opened')].map(e=>({src:e.currentSrc,complete:e.complete,naturalWidth:e.naturalWidth,transform:getComputedStyle(e).transform,transition:getComputedStyle(e).transition})),
      animations:document.getAnimations().map(a=>({playState:a.playState,currentTime:a.currentTime}))
    })`);
  }
  assert.deepEqual(zoomCheck.diagnostics.events.map(e=>e.type), ['open','opened','close','closed']);
  const escapeEvent = zoomCheck.diagnostics.keys.find(e=>e.key==='Escape' && e.trusted);
  assert.ok(escapeEvent, 'A trusted Escape keyup must reach the document');
  assert.ok(escapeEvent.time >= zoomCheck.diagnostics.events.find(e=>e.type==='opened').time, 'Escape must follow completed opening');
  zoomCheck.status = 'passed';
  for (const [route, target] of [['docs/?audit=1#s=agent-mode&ss=skills','docs/agent-mode/skills/?audit=1'],['documentation/?audit=2#s=mcp-server&ss=code-reviews','docs/classic-2.1.0/code-reviews/overview/?audit=2'],['docs/#s=unknown','docs/'],['pricing/','']]) {
    await go(route);
    await until(`location.pathname + location.search === ${JSON.stringify(base + target)}`);
    assert.equal(await evaluate('location.hash'), '');
    report.checks.push({redirect:route,target,status:'passed'});
  }
  await go('docs/');
  await evaluate(`location.hash='s=agent-mode&ss=sessions'`);
  await until(`location.pathname===${JSON.stringify(base+'docs/agent-mode/sessions/')}`);
  await go('docs/#why-context-engineering-matters');
  assert.equal(await evaluate('location.hash'), '#why-context-engineering-matters');
  report.checks.push({interaction:'in-session hash mapping and ordinary heading preserved',status:'passed'});
  assert.deepEqual(report.searchRequests, [], 'Unexpected search traffic without configured credentials');
  assert.deepEqual(report.errors, []);
  report.status = 'passed';
} catch (error) {
  report.status = 'failed';
  report.failure = error.stack;
  try {await captureFailure?.();} catch (captureError) {report.screenshotFailure = captureError.message;}
  process.exitCode = 1;
} finally {
  socket?.close();
  chrome.kill('SIGTERM');
  server.close();
  await fs.writeFile(path.join(evidence, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
