module.exports = function remarkIdealImages() {
  return (tree) => {
    function visit(node) {
      if (node.type === 'mdxJsxTextElement' && node.name === 'img') {
        const source = node.attributes?.find((attribute) => attribute.name === 'src');
        const statement = source?.value?.data?.estree?.body?.[0];
        const expression = statement?.expression;
        const call = expression?.left?.object;
        const request = call?.arguments?.[0]?.value;
        if (
          expression?.type === 'BinaryExpression' && expression.operator === '+' && expression.right?.value === '' &&
          expression.left?.type === 'MemberExpression' && expression.left.property?.name === 'default' &&
          call?.type === 'CallExpression' && call.callee?.name === 'require' &&
          typeof request === 'string' && request.startsWith('!') && request.includes('url-loader')
        ) {
          // Docusaurus omits the attribute when a Markdown image has empty alt.
          // Restore it only for these generated image nodes, not authored JSX.
          if (!node.attributes.some((attribute) => attribute.name === 'alt')) {
            node.attributes.push({type: 'mdxJsxAttribute', name: 'alt', value: ''});
          }
          const imagePath = request.slice(request.lastIndexOf('!') + 1);
          if (/\.(png|jpe?g)$/i.test(imagePath)) {
            call.arguments[0] = {type: 'Literal', value: imagePath, raw: JSON.stringify(imagePath)};
            statement.expression = call;
            source.value.value = `require(${JSON.stringify(imagePath)})`;
          }
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
};
