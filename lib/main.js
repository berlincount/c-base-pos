/*!
 * c-base Point of Sales
 *
 * Logger module
 *
 * Copyright 2016 Andreas Kotes
 * All rights reserved (for now)
 *
 */

define(function (require, exports, module) {
  var posVersionString = "c-base-pos v0.8";

  if (typeof console === "undefined") {
    console = require('console_stub');
  }
  if (typeof process === "undefined") {
    process = require('process_stub');
  }
  jQuery = require('jquery');
  sprintf = require('sprintf').sprintf;

  console.info(sprintf(
    "%s; using JQuery %s; node %s; userAgent %s",
    posVersionString,
    jQuery().jquery,
    process.versions.node,
    navigator.userAgent
  ));

  debugWin = require('debugwin');
  serial   = require('serial');
  clock    = require('clock');
  app      = require('app');

  debugWin.init();
  serial.init();
  clock.init();
  app.init();

  app.run();
});
