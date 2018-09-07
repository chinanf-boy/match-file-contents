import path from 'path';
import os from 'os';
import fs from 'fs';
import test from 'ava';
import match from '..';
const testDir = __dirname;
function matchesStart(line) {
	return line.startsWith('<!-- doc-templite START');
}

function matchesEnd(line) {
	return line.startsWith('<!-- doc-templite END');
}

const getPath = p => path.resolve(testDir, p);
const getF = p => fs.readFileSync(p, 'utf8');

test('content no str', t => {
	const newContent1 = `hello1 match-file-contents`;

	let msg = t.throws(() => match('', newContent1, matchesStart, matchesEnd, 0));

	t.regex(msg.message, /no str/, 'content no str');
});

test('match START but no END', t => {
	const p = getPath('./error/START-no-END.md');
	const content = getF(p);

	const newContent1 = `hello1 match-file-contents`;

	let msg = t.throws(() =>
		match(content, newContent1, matchesStart, matchesEnd, 0)
	);

	t.regex(msg.message, /not Closed/, 'had START, but no END');
});

test('match END but no START', t => {
	const p = getPath('./error/END-no-START.md');
	const content = getF(p);

	const newContent1 = `hello1 match-file-contents`;

	let msg = t.throws(() =>
		match(content, newContent1, matchesStart, matchesEnd, 0)
	);

	t.regex(msg.message, /not Closed/, 'had END, but no START');
});
