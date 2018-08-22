# match-file-contents [![Build Status](https://travis-ci.org/chinanf-boy/match-file-contents.svg?branch=master)](https://travis-ci.org/chinanf-boy/match-file-contents) [![codecov](https://codecov.io/gh/chinanf-boy/match-file-contents/badge.svg?branch=master)](https://codecov.io/gh/chinanf-boy/match-file-contents?branch=master)

「 match file contents and rechange 」

## Install

```
npm install match-file-contents
```

```
yarn add match-file-contents
```

## Usage

```js
const matchFileContents = require('match-file-contents');

matchFileContents('unicorns');
//=> 'unicorns & rainbows'
```

## API

### matchFileContents(input, [options])

#### input

| name: | input        |
| ----- | ------------ |
| Type: | `string`     |
| Desc: | Lorem ipsum. |

#### options

##### foo

| name:    | foo          |
| -------- | ------------ |
| Type:    | `boolean`    |
| Default: | `false`      |
| Desc:    | Lorem ipsum. |

## Use by

- [doc-templite](https://github.com/chinanf-boy/doc-templite) templite tool for Multi-md files

## License

MIT © [chinanf-boy](http://llever.com)
