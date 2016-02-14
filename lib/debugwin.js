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
( 'lib/debugwin', ['jquery'], function() {
  var debug = false;
  var debugWindow;

  return {
      sendToDisplay: function(content) {
          console.warn("debugwin.sendToDisplay(content), not properly implemented:");
          console.info(content);
      },
      sendToPrinter: function(content) {
          console.warn("debugwin.sendToPrinter(content), not properly implemented:");
          console.info(content);
      },
      triggerCashDrawer: function() {
          console.warn("debugwin.triggerCashDrawer(content), not properly implemented");
      },
      init: function() {
          // detect debugging cross-platform
          var nwgui = false;
          if (window.location.hash == '#debug') {
              debug = true;
          } else if (process.versions.node !== 'none') {
              nwgui = require("nw.gui");
              if (nwgui.App.manifest.config.debug) {
                  debug = true;
              }
          }

          if (debug) {
              var win;
              /*
              if (nwgui) {
                  console.info('debugwin.init(): enabling NWJS debug window');
                  win = nwgui.Window.get(nwgui.Window.open("c-base-pos-ext.html", {
                      "title": "c-base-pos Externals",
                      "width": 314,
                      "height": 610,
                      "min_width": 314,
                      "min_height": 610,
                      "max_width": 314,
                      "max_height": 610,
                      "position": null,
                      "resizable": false
                  }));
              } else {
                  console.info('debugwin.init(): enabling Browser debug window');
              */
                  win = window.open("c-base-pos-ext.html", "c-base-pos Externals", "left=1380,top=151,innerHeight=610,innerWidth=314,dependent=yes,menubar=no,location=no,scrollbars=no,status=no");
                  // NWJS doesn't really listen to our options
                  if (nwgui) {
                      win.resizeTo(314+18,610+42);
                  }

              /*
              }
              */

              // check or problems
              if (!win) {
                  console.warn('debugwin: cannot open requested debug window');
              } else {
                  debugWindow = win;
              }

              if (debugWindow) {
                  console.info(debugWindow);
                  link = $("head").html();
                  $("head", debugWindow.document).html(html);
                  var html = $("#debugWindow").html();
                  $("body", debugWindow.document).html(html);
              }
          } else {
              console.info('debugwin.init(): not enabled.');
          }
      }
  };
});
