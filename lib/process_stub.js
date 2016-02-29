/*!
 * c-base Point of Sales
 *
 * process stub
 *
 * Copyright 2016 Andreas Kotes
 * All rights reserved (for now)
 *
 */

( this.undefine || require( 'undefine' )( module, require ) )()
( 'lib/process_stub', [], function process_stub_exports() {
    // stub Node.JS process Object for in-browser use, if necessary
    if (typeof process === 'undefined') {
        process = {
            versions : {
                node: 'none'
            },
            on : function process_on() {
            }
        };
    }

    return process;
});
