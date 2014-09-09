'use strict';

var path = require('path');
var fs = require('fs');



var getFiles = function () {
    return [path.join(process.cwd(), 'dummy/foo.js')];
};



var getLineNumber = function (text, index) {
    var line;
    var substr = text.substr(0, index);

    // count newlines to determine which line we're on
    var matches = substr.match(/\n/g);

    return matches && matches.length + 1;
};

var getFunctionName = function (text) {
    var name;
    var match;

    var assignedFnRegex = /([^\s]+)\s*=\s*function/g;
    var methodRegex = /([^\s]+)\s*:\s*function/g;
    var namedFnRegex = /function\s+?([^\s]+)/g;

    // Is this function's expression assigned to a value?
    match = assignedFnRegex.exec(text);

    if (match) {
        name = match[1];
    } else {
        match = methodRegex.exec(text);
        if (match) {
            name = match[1];
        } else {
            match = namedFnRegex.exec(text);
            if (match) {
                name = match[1];
            }
        }
    }

    return name;
};

var getBlocks = function (text) {
    var blockRegex = /(\/\*\*(.|\n)+?\*\/)((.|\n)+?function(.|\n)+?)(?=\()/g;
    var blocks = [];
    var match = blockRegex.exec(text);

    while (match !== null) {
        blocks.push({
            lineNumber: getLineNumber(text, match.index),
            block: match[1],
            name: getFunctionName(match[3]),
            type: 'function'
        });
        match = blockRegex.exec(text);
    }

    return blocks;
};

var getFileData = function (file) {
    var data = {
        file: file
    };

    var text = fs.readFileSync(file, {
        encoding: 'utf8'
    });

    data.blocks = getBlocks(text);

    return data;
};

var files = getFiles();

files.forEach(function (file) {
    var data = getFileData(file);
    console.log('data', data);
});