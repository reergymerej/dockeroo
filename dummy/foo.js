'use strict';

var globalFn;

/**
* block for foo
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
var baz=function bazName() {
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
    * @param {String} dude
* blah blah
* @return     {Array}
*/
obj.fn3 = function (arg1, arg2,arg3) {};

/**
* block for obj.fn4
* @return blah blah
* @param
*/
obj['fn4'] = function () {};