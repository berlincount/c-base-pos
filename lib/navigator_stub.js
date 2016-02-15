/*!
 * c-base Point of Sales
 *
 * navigator stub
 *
 * Copyright 2016 Andreas Kotes
 * All rights reserved (for now)
 *
 */

( this.undefine || require( 'undefine' )( module, require ) )()
( 'lib/navigator_stub', [], function naviagor_stub_exports() {
    // stub Browser navigator Object for Node.JS use, if necessary
    if (typeof navigator === 'undefined') {
        navigator = {
            userAgent : 'none'
        };
    }

    return navigator;
});
