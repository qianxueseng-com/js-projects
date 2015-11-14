# css-resources

[![NPM version](https://img.shields.io/npm/v/css-resources.svg?style=flat)](https://npmjs.org/package/css-resources)
[![Build Status](https://img.shields.io/travis/sorrycc/css-resources.svg?style=flat)](https://travis-ci.org/sorrycc/css-resources)
[![Coverage Status](https://img.shields.io/coveralls/sorrycc/css-resources.svg?style=flat)](https://coveralls.io/r/sorrycc/css-resources)
[![NPM downloads](http://img.shields.io/npm/dm/css-resources.svg?style=flat)](https://npmjs.org/package/css-resources)

Find and replace all *image* and *font* resources in css.

---

## Install

```bash
$ npm install css-resources -g
```

## Usage

CSS file a.css

```
body {
  background: url(./a.png);
}
@font-face {
  src: url('./font.eot');
}
```

Parse CSS with resource

```bash
var resources = require('css-resources');
resources(fs.readFileSync('a.css'));
```

Return

```
[
  {
    property: 'background',
    string: 'url(./a.png)',
    path: './a.png'
  },
  {
    property: 'src',
    string: 'url(\'./font.eot\')',
    path: './font.eot'
  }
]
```

You can add a callback to replace css file

```
resources(fs.readFileSync('a.css'), function(item) {
  return 'url("' + resolve(item.path) + '");';
});
```


## LISENCE

Copyright (c) 2015 chencheng. Licensed under the MIT license.
