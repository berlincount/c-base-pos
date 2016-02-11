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
( 'lib/main', [
  'lib/app',
  'lib/clock',
  'lib/serial',
  'lib/debugwin',
  'sprintf-js',
  'lib/console_stub',
  'lib/process_stub',
  'lib/navigator_stub',
], function(app, clock, serial, debugWin, sprintfModule) {
  return {
    init: function() {
      var posVersionString = "c-base-pos v0.8";

      sprintf = sprintfModule.sprintf;

      console.info(sprintf(
        "%s; using JQuery %s; node %s; userAgent %s",
        posVersionString,
        "disabled", // jQuery().jquery,
        process.versions.node,
        navigator.userAgent
      ));

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
