/*!
 * c-base Point of Sales
 *
 * application implementation
 *
 * Copyright 2016 Andreas Kotes
 * All rights reserved (for now)
 *
 */

( this.undefine || require( 'undefine' )( module, require ) )()
( 'lib/app', ['lib/views', 'lib/datastore', 'lib/serial'], function app_exports(views, datastore, serial) {
    var state = 'unknown';
    var stateTimeout;
    var previousState = 'unknown';

    var exports = {
        versionString : "c-base-pos v0.9",
        init : function app_init() {
            console.info('app: init.');

            // install hooks to ensure clean exit
            process.on('exit', exports.exit);
            process.on('SIGINT', exports.exit);
            process.on('SIGTERM', exports.exit);
        },
        run : function app_run() {
            console.info('app: started');
            // set known states
            previousState = 'sales';
            state = 'firstabout';
            // not using view.setView so we can enable button separately
            views.showView('about');
            views.enableView('firstabout');
            // populate our datastore
            datastore.populate('http://hoschi:16006/rest', 'c-base-pos-config');
            // show clock & version on external display
            setTimeout(function app_run_displayClock(){ serial.displayClock(app.versionString); }, 1000);
            // automatically switch to sales view after 3 seconds
            setTimeout(function app_run_changeState(){ app.changeState('sales'); }, 3000);
        },
        changeState: function app_changeState(newState) {
            // catch special case at beginning
            if (state == 'firstabout') { state = 'about'; }

            // cancel any possible timeout
            if (stateTimeout) {
                clearTimeout(stateTimeout);
                stateTimeout = undefined;
            }

            // if there is a valid main view for a state, switch to it
            if (views.checkView(newState)) {
                console.log('app: switching to state "'+newState+'".');
                previousState = state;
                state = newState;
                views.setView(newState);
            } else {
                console.log('app: switch to invalid state "'+newState+'" requested.');
            }
        },
        exit: function app_exit() {
            serial.displayWrite(sprintf("%s\n\rout of service.", exports.versionString));
        }
    };
    return exports;
});
