'use strict';

var globalFn;

/**
* block for foo
*/
var foo = function () {
    // foo body
};

        /**
        * block for globalFn
        */
        globalFn = function () {

        };


    /**
    * block for bar
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
    * @return a desc of return
    * block for obj.fn2
    */
    fn2 : function () {

    }
};

/**
* block for obj.fn3
* blah
* more blah
* blah blah
* @return     {Array}
*/
obj.fn3 = function () {};

/**
* block for obj.fn4
* @return blah blah
* @param
*/
obj['fn4'] = function () {};