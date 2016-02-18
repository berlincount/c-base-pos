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
( 'lib/app', ['lib/views'], function app_exports(views) {
    var state = 'unknown';
    var stateTimeout;
    var previousState = 'unknown';

    var exports = {
        init   : function app_init() {
            console.info('app: init.');
        },
        run : function app_init() {
            console.warn('app: started');
            // set known states
            previousState = 'sales';
            state = 'firstabout';
            // not using view.setView so we can enable button separately
            views.showView('about');
            views.enableView('firstabout');
            // automatically switch to sales view after 3 seconds
            setTimeout(function(){ app.changeState('sales'); }, 3000);
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
        }
    };
    return exports;
});
