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
  'lib/datastore',
  'sprintf-js',
  'jquery',
  'lib/console_stub',
  'lib/process_stub',
  'lib/navigator_stub',
], function main_exports(app, clock, serial, views, debugWin, datastore, sprintfModule, jQuery) {
    return {
        init: function main_init() {
            sprintf = sprintfModule.sprintf;

            console.info(sprintf(
               "%s; using JQuery %s; node %s; userAgent %s",
               app.versionString,
               jQuery().jquery,
               process.versions.node,
               navigator.userAgent
            ));

            debugWin.init();
            serial.init();
            clock.init();
            views.init();
            datastore.init();
            app.init();

            // don't really like this, but we need something to call from event handlers etc
            window.app = app;
        },
        run: function main_run() {
            app.run();
        }
    };
});
