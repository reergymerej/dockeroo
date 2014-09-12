'use strict';

var globalFn;

/**
* block for foo
* @param {String} a this is the first arg
* @param This param doesn't have a 
* type defined, but it
* has a long description.
* It's for "b" by the way.
*/
var foo = function (a, b,  c,d,  
    efg) {
    // foo body
};

        /**
        * block for globalFn
        */
        globalFn = function () {

        };


    /**
    * block for bar
    * @someFakeTag blah blahl
    * blah blah
    * blah blah blah
    * @return {undefined}
    */
    function bar() {
        // bar body
    }

/**
* block for baz/bazName
*/
var baz=function bazName(undocumented, args) {
    // bazName body
    console.log('yo');
};

var obj = {
    /**
    * @return {String} a description of the return
    * block for obj.fn
    */
    fn:function doof() {

    },

    /**
    * @param {String} asdf it is the thing
    * @return a desc of return
    * block for obj.fn2
    */
    fn2 : function (asdf) {

    }
};

/**
* block for obj.fn3
* blah
* more blah
    * @param {String} arg1 hello
    * @param {Boolean} dude
* blah blah
* @return     {Array}
*/
obj.fn3 = function (arg1, arg2,arg3) {
    var foo = 123;

    if (foo % 2 === 0) {
        return 'donkey';
    }

    var doo = '34';

    return doo;
};

/**
* block for obj.fn4
* @return blah blah
* @param asdf
*/
obj['fn4'] = function (asdf) {};