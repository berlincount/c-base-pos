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
  'lib/views',
  'lib/debugwin',
  'sprintf-js',
  'jquery',
  'lib/console_stub',
  'lib/process_stub',
  'lib/navigator_stub',
], function main_exports(app, clock, serial, views, debugWin, sprintfModule, jQuery) {
    return {
        init: function main_init() {
            var posVersionString = "c-base-pos v0.9";

            sprintf = sprintfModule.sprintf;

            console.info(sprintf(
               "%s; using JQuery %s; node %s; userAgent %s",
               posVersionString,
               jQuery().jquery,
               process.versions.node,
               navigator.userAgent
            ));

            debugWin.init();
            serial.init();
            clock.init();
            views.init();
            app.init();

            // don't really like this, but we need something to call from event handlers etc
            window.app = app;
        },
        run: function main_run() {
            app.run();
        }
    };
});
