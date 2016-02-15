/*!
 * c-base Point of Sales
 *
 * debug window implementation
 *
 * Copyright 2016 Andreas Kotes
 * All rights reserved (for now)
 *
 */

( this.undefine || require( 'undefine' )( module, require ) )()
( 'lib/debugwin', ['jquery'], function debugwin_exports() {
    var debug = false;
    var debugWindow;

    var exports = {
        sendToDisplay: function debugwin_sendToDisplay(content) {
            console.warn("debugwin.sendToDisplay(content), not properly implemented:");
            console.info(content);
        },
        sendToPrinter: function debugwin_sendToPrinter(content) {
            console.warn("debugwin.sendToPrinter(content), not properly implemented:");
            console.info(content);
        },
        triggerCashDrawer: function debugwin_triggerCashDrawer() {
            console.warn("debugwin.triggerCashDrawer(content), not properly implemented");
        },
        clearDisplay: function debugwin_clearDisplay() {
            console.log("debugwin.cleardisplay() called.");

            // copy (mostly empty) template from main page to debug window
            var html = $("#debugWindow").html();
            debugWindow.postMessage({ 'debugWindow': html }, '*');
        },
        init: function debugwin_init() {
            // detect debugging cross-platform
            var nwgui = false;
            if (typeof window !== 'undefined' && window.location.hash == '#debug') {
                debug = true;
            } else if (process.versions.node !== 'none') {
                nwgui = require("nw.gui");
                if (nwgui.App.manifest.config.debug) {
                    debug = true;
                }
            }

            if (debug) {
                var win = window.open("c-base-pos-ext.html", "c-base-pos Externals", "left=1380,top=151,innerHeight=610,innerWidth=314,dependent=yes,menubar=no,location=no,scrollbars=no,status=no");

                // check or problems
                if (!win) {
                    console.warn('debugwin: cannot open requested debug window');

                    debugWindow = undefined;
                } else {
                    // NWJS doesn't really listen to our options
                    if (nwgui) {
                        win.resizeTo(314+18,610+42);
                    }
                    debugWindow = win;
                }

                if (debugWindow) {
                    setTimeout(exports.clearDisplay, 1000);
                    console.info('debugwin: enabled.');
                }
            } else {
                console.info('debugwin: not enabled.');
            }
        }
    };
    return exports;
});
