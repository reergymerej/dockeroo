'use strict';

var path = require('path');
var fs = require('fs');



var getFiles = function () {
    return [path.join(process.cwd(), 'dummy/foo.js')];
};

var files = getFiles();

var getLineNumber = function (text, index) {
    var line;
    var substr = text.substr(0, index);

    // count newlines to determine which line we're on
    var matches = substr.match(/\n/g);

    return matches && matches.length + 1;
};

var getFunctionsData = function (text) {
    var namedFunctionRegex = /function\s+(.+)(?=\()/g;
    var functions = {};

    // get fn names
    var match = namedFunctionRegex.exec(text);
    var fnName;

    while (match !== null) {
        fnName = match[1];
        functions[fnName] = {};

        // get line number
        functions[fnName].lineNumber = getLineNumber(text, match.index);


        match = namedFunctionRegex.exec(text);
    }


    return functions;
};

var getFileData = function (file) {
    var data = {
        file: file
    };

    var text = fs.readFileSync(file, {
            encoding: 'utf8'
    });

    data.functions = getFunctionsData(text);

    // console.log(text);

    return data;
};

files.forEach(function (file) {
    var data = getFileData(file);
    console.log('data', data);
});