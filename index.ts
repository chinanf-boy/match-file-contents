'use strict';

let oneStore:Array<TAG> = [];
interface TAG {
    hasStart: Boolean;
    hasEnd: Boolean;
    startIdx: number;
    endIdx: number;
}
/**
 * Copy from doctoc
 */
function parse(lines:Array<string>, matchesStart:Function, matchesEnd:Function, matchTag:Boolean = false): Array<TAG> {
	var startIdx = -1,
		endIdx = -1,
		hasStart = false,
		hasEnd = false,
		line;

	let tags = [];

	for (var i = 0; i < lines.length; i++) {
		line = lines[i];

		if (matchesStart(line)) {
			if (hasStart) {
				break;
			}
			startIdx = i;
			hasStart = true;
		} else if (matchesEnd(line)) {
			endIdx = i;
			hasEnd = true;
			if (!hasStart) {
				break;
			}
		}

		if (hasStart && hasEnd) {
			tags.push({
				hasStart: hasStart,
				hasEnd: hasEnd,
				startIdx: startIdx,
				endIdx: endIdx,
			});
			hasStart = false;
			hasEnd = false;
		}
	}

	if (hasStart !== hasEnd) {
		let whatLine = hasStart ? lines[startIdx] : lines[endIdx];
		throw new Error(`${whatLine} - not Closed`);
	}

	if (tags.length === 1 && matchTag) {
		oneStore = tags;
	}
	return tags;
}

export default function updateSection(
	content:String,
	section:String,
	matchesStart:Function,
	matchesEnd:Function,
	index:number
):String {
	if (!content) {
		throw new Error('content no str');
	}

	let lines = content.split('\n');

	let tags = oneStore.length > 0 ? oneStore : parse(lines, matchesStart, matchesEnd);
	oneStore = [];

	let tag = tags[index];

	let sectionLines:Array<any> = section.split('\n'),
		dropN = tag.endIdx - tag.startIdx + 1;

	[].splice.apply(lines,[tag.startIdx, dropN].concat(sectionLines));

	return lines.join('\n');
};

export {updateSection,parse}
