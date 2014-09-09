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
    * block for obj.fn
    */
    fn:function doof() {

    },

    /**
    * block for obj.fn2
    */
    fn2 : function () {

    }
};

/**
* block for obj.fn3
*/
obj.fn3 = function () {};

/**
* block for obj.fn4
*/
obj['fn4'] = function () {};