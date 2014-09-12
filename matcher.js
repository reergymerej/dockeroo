// This module searches through text and finds the next matching
// tag.

'use strict';

var str = 
    'function () {\n' +
    '    console.log("We\'re not \\\"cool.\\");\n' +
    '        if (foo) {\n' +
    '            boo();\n' +
    '        }\n' +
    '}';

// var str = '"hello"dude"';

var PAIRS = {
    '{': '}',
    '<': '>',
    '"': '"',
    "'": "'",
    '(': ')'
};

/**
* Find the next paired tag.
* @param {String} haystack
* @return {Number} index of matching tag
*/
var findClosingPairIndex = function (haystack) {

    var index = 0;
    var opening = haystack[0];
    var closing = PAIRS[opening];
    var closingIndex;
    var chr;
    var nextIndex;

    if (!closing) {
        throw new Error(opening + ' doesn\'t have a closing tag');
    }

    while (closingIndex === undefined && index < haystack.length) {
        index++;

        chr = haystack[index];

        // handle escape chars
        if (chr === '\\') {
            index++;
            chr = haystack[index];
        }

        if (chr) {

            if (chr === closing) {
                closingIndex = index;
            } else {
                
                // Handle recursion.
                if (chr === opening) {
                    
                    nextIndex = findClosingPairIndex(haystack.substr(index));
                    if (nextIndex !== undefined) {
                        index += nextIndex;
                    }

                } else {

                    // Ignore stuff found in strings.
                    if (chr === '"' || chr === "'") {
                        nextIndex = findClosingPairIndex(haystack.substr(index));
                        if (nextIndex !== undefined) {
                            index += nextIndex;
                        }
                    }
                }
            }
        }
    }

    return closingIndex;
};

var openingIndex = str.indexOf('{');
var closingIndex = findClosingPairIndex(str.substr(openingIndex));
console.log(str.substr(openingIndex, openingIndex + closingIndex));
// console.log(findPair(str, '('));