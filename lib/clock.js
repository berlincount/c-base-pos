/*!
 * c-base Point of Sales
 *
 * clock implementation
 *
 * Copyright 2016 Andreas Kotes
 * All rights reserved (for now)
 *
 */

( this.undefine || require( 'undefine' )( module, require ) )()
( 'lib/clock', ['jquery'], function clock_exports() {
    var posClock = null;
    exports = {
        init   : function clock_init() {
            // update the clock now - and on a regular basis
            exports.update();
            posClock = setInterval(exports.update, 1000);

            console.info('clock: started.');
        },
        update : function clock_update() {
            // asking for strftime() would be too much ...
            var d=new Date();
            var date_str=('0'+d.getDate()).substr(-2,2)+'.'+('0'+(d.getMonth()+1)).substr(-2,2)+'.'+d.getFullYear();
            var time_str=('0'+d.getHours()).substr(-2,2)+':'+('0'+d.getMinutes()).substr(-2,2)+':'+('0'+d.getSeconds()).substr(-2,2);
            $('#datetime').text('Zeit: '+date_str+' '+time_str);
        },
        stop   : function clock_stop() {
            if (posClock !== null) {
                clearInterval(posClock);
                posClock = null;
            }
            $('#datetime').text('Zeit: 00.00.0000 00:00:00');

            console.info('clock: stopped.');
        }
    };
    return exports;
});
