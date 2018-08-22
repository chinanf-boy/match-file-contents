import path from 'path';
import os from 'os';
import fs from 'fs';
import test from 'ava';
import match from '../index';
const testDir = __dirname;
function matchesStart(line) {
	return line.startsWith('<!-- doc-templite START');
}

function matchesEnd(line) {
	return line.startsWith('<!-- doc-templite END');
}

const getPath = p => path.resolve(testDir, p);
const getF = p => fs.readFileSync(p, 'utf8');

test('one match will keep', t => {
	const p = getPath('./feature/one-match.md');
	const content = getF(p);

	let tags = match.parse(content.split(os.EOL), matchesStart, matchesEnd, true);
	t.is(tags.length, 1);

	const newContent1 = `hello1 match-file-contents`;
	let data1 = match(content, newContent1, matchesStart, matchesEnd, 0);

	t.regex(
		data1,
		/hello1 match-file-contents/,
		'match and change first content'
	);
});

test('more match', t => {
	const p = getPath('./feature/more-match.md');
	const content = getF(p);

	const newContent1 = `hello1 match-file-contents`;
	const newContent2 = `hello2 match-file-contents`;

	let data1 = match(content, newContent1, matchesStart, matchesEnd, 0);
	let data2 = match(content, newContent2, matchesStart, matchesEnd, 1);

	t.regex(
		data1,
		/hello1 match-file-contents/,
		'match and change first content'
	);
	t.regex(
		data2,
		/hello2 match-file-contents/,
		'match and change second content'
	);
});
