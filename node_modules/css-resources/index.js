'use strict';

var css = require('css');
var re = /url\(["\']?(.*?)["\']?\)/gi;

module.exports = function(str, fn, opts) {
  opts = opts || {};
  if (str instanceof Buffer) str = str.toString();

  var ast = css.parse(str);
  var rules = ast.stylesheet.rules;

  function traverse(rules) {
    var ret = [];
    rules.forEach(function(rule) {
      if (rule.rules) {
        ret = ret.concat(traverse(rule.rules));
      } else {
        if (!rule.declarations) {
          return [];
        }

        rule.declarations.forEach(function(d) {
          var m;
          var found = [];
          while (m = re.exec(d.value)) {
            found.push({
              property: d.property,
              string: m[0],
              path: m[1]
            });
          }
          if (fn) {
            found.forEach(function(f) {
              d.value = d.value.replace(f.string, fn(f));
            });
          }
          ret = ret.concat(found);
        });
      }
    });
    return ret;
  }

  var ret = traverse(rules);

  if (fn) {
    if (ret.length) {
      return css.stringify(ast, {compress:opts.compress});
    } else {
      return str;
    }
  } else {
    return ret;
  }
};
