/*!
 * c-base Point of Sales
 *
 * Logger module
 *
 * Copyright 2016 Andreas Kotes
 * All rights reserved (for now)
 *
 */

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function (require, exports, module) {
  module.exports = {
    log     : function() {},
    debug   : function() {},
    info    : function() {},
    warn    : function() {},
    error   : function() {},
    assert  : function() {},
    clear   : function() {},
    trace   : function() {},
    time    : function() {},
    timeEnd : function() {},
  };
});
