'use strict';

var util = require('util');
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

var getTypeFromString = function (str) {
    var regex = /\{(.+?)\}/g;
    var match = regex.exec(str);
    var type = match ? match[1] : undefined;
    return type;
};

var getReturn = function (text) {
    var returnRegex = /@return.*/g;
    var typeRegex = /\{(.+?)\}/;
    var returnSegment = text.match(returnRegex);
    var type;
    var description;
    var rtn;

    // Before we do anything, flatten the text.
    if (returnSegment !== null) {
        returnSegment = returnSegment[0];

        // clear out redundant whitespace and *
        returnSegment = returnSegment.replace(/@return\s+/g, '').
            replace(/\*/g, '').replace(/\s+/g, ' ');

        rtn = {
            type: getTypeFromString(returnSegment)
        };

        
        if (rtn.type) {
            returnSegment = returnSegment.replace('{' + rtn.type + '}', '');
        }


        rtn.description = returnSegment.trim() || undefined;
    }

    return rtn;
};

var flattenBlock = function (block) {
    var flattened;

    flattened = block.replace(/(\/\*\*|\*\/)/g, '').
        replace(/\s*\*/g, '').
        replace(/\s+/g, ' ').
        split('@').join('\n@').trim();

    return flattened;
};

var getParams = function (block, args) {

    var params = [];
    var paramRegex = /@param.*/gi;

    args = args.replace(/[\s\(\)]/gi, '').split(',');

    // If there was nothing there, clear the empty string.
    if (args.length === 1 && !args[0]) {
        args = [];
    }

    // arguments
    // Let's document all of them.  If they provided @param tags,
    // we can add more information.
    if (args.length) {
        args.forEach(function (arg) {
            params.push({
                name: arg,
                type: undefined,
                description: undefined
            });
        });
    }

    // documented params
    if (paramRegex.test(block)) {

        block.match(paramRegex).slice(0).forEach(function (param, index) {
            // TODO: Stop recreating this regex ever time.
            var typeRegex = /\{(.+)\}/;
            var type;

            // pull out the type
            if (typeRegex.test(param)) {
                // find the type
                type = typeRegex.exec(param);
                // trim the string since we're done with that part
                param = param.substr(type.index + type[0].length);
                // pluck out the captured group
                type = type[1];
            }

            // Assume that these were defined in order.
            if (params[index]) {
                params[index].type = type;
                // assume the rest is a description
                params[index].description = param.trim();
            } else {
                throw new Error('Hey, you documented some params that do not exist.');
            }
        });
    }

    return params;
};

var getBlocks = function (text) {
    // 1 raw block
    // 2 whitespace
    // 3 trailing function
    // 4 whitespace
    // 5 whitespace
    // 6 arguments
    var blockRegex = /(\/\*\*(.|\n)+?\*\/)((.|\n)+?function(.|\n)+?)(\((\n|.)*?\))/g;
    var blocks = [];
    var match = blockRegex.exec(text);


    while (match !== null) {
        // console.log(match.slice(0));
        var flattened = flattenBlock(match[1]);

        blocks.push({
            lineNumber: getLineNumber(text, match.index),
            type: 'function',
            raw: flattened,
            name: getFunctionName(match[3]),
            params: getParams(flattened, match[6])
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
    data.blocks.forEach(function (block) {
        block.return = getReturn(block.raw);

        // Delete the raw block once we're done.
        delete block.raw;
    });

    return data;
};

var files = getFiles();

files.forEach(function (file) {
    var data = getFileData(file);
    console.log(util.inspect(data, {
        depth: null
    }));
});