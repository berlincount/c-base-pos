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
( 'lib/console_stub', [], function console_exports() {
    // stub oonsole Object for headless, if necessary
    if (typeof console === 'undefined') {
        console = {
            log     : function console_log()     {},
            debug   : function console_debug()   {},
            info    : function console_info()    {},
            warn    : function console_warn()    {},
            error   : function console_error()   {},
            assert  : function console_assert()  {},
            clear   : function console_clear()   {},
            trace   : function console_trace()   {},
            time    : function console_time()    {},
            timeEnd : function console_timeEnd() {},
            init    : function console_init()    { console.warn('console.init() not implemented'); },
        };
    }

    return console;
});
