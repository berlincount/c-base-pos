/*!
 * c-base Point of Sales
 *
 * Logger module
 *
 * Copyright 2016 Andreas Kotes
 * All rights reserved (for now)
 *
 */

( this.undefine || require( 'undefine' )( module, require ) )()
( 'lib/console_stub', [], function() {
  // stub oonsole Object for headless, if necessary
  if (typeof console === 'undefined') {
      console = {
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
          init    : function() { console.warn('console.init() not implemented'); },
      };
  }
  
  return console;
});
