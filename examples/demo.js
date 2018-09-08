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
