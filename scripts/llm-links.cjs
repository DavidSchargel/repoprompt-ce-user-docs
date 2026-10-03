const path = require('node:path');

async function rewriteDocLinks(markdown, source, routes, siteUrl) {
  const {unified} = await import('unified');
  const {default: remarkParse} = await import('remark-parse');
  const tree = unified().use(remarkParse).parse(markdown);
  const edits = [];
  function visit(node) {
    if (['link', 'definition'].includes(node.type) && node.url && !/^[a-z][\w+.-]*:|^\/\//i.test(node.url)) {
      const [file, fragment] = node.url.split('#');
      let route;
      if (!file) route = routes[source];
      else if (file.startsWith('/')) route = file;
      else route = routes[path.posix.normalize(path.posix.join(path.posix.dirname(source), file))];
      if (!route) throw new Error(`Unresolved LLM link in ${source}: ${node.url}`);
      const replacement = new URL(route.replace(/^\//, '') + (fragment ? `#${fragment}` : ''), siteUrl).href;
      const start = node.position.start.offset;
      const raw = markdown.slice(start, node.position.end.offset);
      const offset = node.type === 'definition' ? raw.indexOf(node.url, raw.indexOf(']:') + 2) : raw.lastIndexOf(node.url);
      if (offset < 0) throw new Error(`Cannot locate LLM link: ${node.url}`);
      edits.push({start: start + offset, end: start + offset + node.url.length, replacement});
    }
    node.children?.forEach(visit);
  }
  visit(tree);
  for (const edit of edits.sort((a, b) => b.start - a.start)) markdown = markdown.slice(0, edit.start) + edit.replacement + markdown.slice(edit.end);
  return markdown;
}

module.exports = {rewriteDocLinks};
