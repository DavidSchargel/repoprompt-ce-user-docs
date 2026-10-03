const React = require('react');
const {Helmet} = require('react-helmet-async');

function isTwitterMetadata(props) {
  return [props.name, props.property].some((value) => typeof value === 'string' && /^twitter:/i.test(value));
}

function filterChildren(children) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (child.type === 'meta' && isTwitterMetadata(child.props)) return null;
    if (child.type === React.Fragment) {
      return React.cloneElement(child, {}, filterChildren(child.props.children));
    }
    return child;
  });
}

function SeoHead({children, meta, ...props}) {
  return React.createElement(Helmet, {
    ...props,
    ...(meta ? {meta: meta.filter((entry) => !isTwitterMetadata(entry))} : {}),
  }, filterChildren(children));
}

module.exports = SeoHead;
