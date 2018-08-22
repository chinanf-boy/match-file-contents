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
var updateSection = require('match-file-contents');

var original = [
    '# Some Project'
  , ''
  , 'Does a bunch of things'
  , ''
  , 'START -- GENERATED GOODNESS'
  , 'this was painstakingly generated'
  , 'as was this'
  , 'END -- GENERATED GOODNESS' , ''
  , ''
  , '## The End'
  , ''
  , 'Til next time'
].join('\n');

var update = [
    'START -- GENERATED GOODNESS'
  , 'this was painstakingly re-generated'
  , 'and we added another line'
  , 'here'
  , 'END -- GENERATED GOODNESS'
].join('\n');

function matchesStart(line) {
  return (/START -- GENERATED GOODNESS/).test(line);
}

function matchesEnd(line) {
  return (/END -- GENERATED GOODNESS/).test(line);
}

let tags = updateSection.parse(original.split('\n', matchesStart, matchesEnd, true)
// Array - tags.length = 1
for(let i = 0; i < tags.length; i ++){
	var updated = updateSection(original, update, matchesStart, matchesEnd, i);
	console.log(updated);
}
```

## Output

```
# Some Project

Does a bunch of things

START -- GENERATED GOODNESS
this was painstakingly re-generated
and we added another line
here
END -- GENERATED GOODNESS

## The End

Til next time
```

<!--
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
| Desc:    | Lorem ipsum. | -->

## concat

- [update-section](https://github.com/thlorenz/update-section) Updates a section inside a file with newer content while removing the old content.

> the lib is single section rechange , but `match-file-contents` can more

## Use by

- [doc-templite](https://github.com/chinanf-boy/doc-templite) templite tool for Multi-md files

## License

MIT © [chinanf-boy](http://llever.com)
