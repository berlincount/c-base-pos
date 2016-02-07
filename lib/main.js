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
    init: function() {
      var posVersionString = "c-base-pos v0.8";

      if (typeof console === "undefined") {
        console = require('lib/console_stub');
      }
      if (typeof process === "undefined") {
        process = require('lib/process_stub');
      }
      if (typeof navigator === "undefined") {
        navigator = require('lib/navigator_stub');
      }
      // jQuery = require('jquery');
      var sprintf = require('sprintf-js').sprintf;

      console.info(sprintf(
        "%s; using JQuery %s; node %s; userAgent %s",
        posVersionString,
        "disabled", // jQuery().jquery,
        process.versions.node //,
        // navigator.userAgent
      ));

      debugWin = require('lib/debugwin');
      serial   = require('lib/serial');
      clock    = require('lib/clock');
      app      = require('lib/app');

      debugWin.init();
      serial.init();
      clock.init();
      app.init();
    },
    run: function() {
      app.run();
    }
  };
});
