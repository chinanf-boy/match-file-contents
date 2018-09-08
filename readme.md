# match-file-contents [![Build Status](https://travis-ci.org/chinanf-boy/match-file-contents.svg?branch=master)](https://travis-ci.org/chinanf-boy/match-file-contents) [![codecov](https://codecov.io/gh/chinanf-boy/match-file-contents/badge.svg?branch=master)](https://codecov.io/gh/chinanf-boy/match-file-contents?branch=master) [![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

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
var match = require('..');

var original = [
	'# Some Project',
	'',
	'Does a bunch of things',
	'',
	'START -- GENERATED GOODNESS',
	'this was painstakingly generated',
	'as was this',
	'END -- GENERATED GOODNESS',
	'',
	'',
	'## The End',
	'',
	'Til next time',
].join('\n');

let updateDate = original;

var update = [
	'START -- GENERATED GOODNESS',
	'this was painstakingly re-generated',
	'and we added another line',
	'here',
	'END -- GENERATED GOODNESS',
].join('\n');

function matchesStart(line) {
	return /START -- GENERATED GOODNESS/.test(line);
}

function matchesEnd(line) {
	return /END -- GENERATED GOODNESS/.test(line);
}

let tags = match.parse(original.split('\n'), matchesStart, matchesEnd, true);
// Array - tags.length = 1
for (let i = 0; i < tags.length; i++) {
	// note the update data is from 0 => tags.length, one run one change ,
	// next time rePut updateDate to  updateSection(updateDate...
	updateDate = match.updateSection(
		updateDate,
		update,
		matchesStart,
		matchesEnd,
		i
	);
	console.log(updateDate);
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

## API

just like [update-section#API](https://github.com/thlorenz/update-section#api)

> but

- updateSection(updateDate, update, matchesStart, matchesEnd, index)

> index = { 0 ~ tags.length}

- parse(original.split('\n', matchesStart, matchesEnd, keep)

> `keep` if `true`, when `tags.length === 1`, can store the result tags, use by
> `updateSection`

## concat

- [update-section](https://github.com/thlorenz/update-section) Updates a section inside a file with newer content while removing the old content.

> the lib is single section rechange , but `match-file-contents` can more

## Use by

- [doc-templite](https://github.com/chinanf-boy/doc-templite) templite tool for Multi-md files

## License

MIT © [chinanf-boy](http://llever.com)
