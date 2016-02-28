/*!
 * c-base Point of Sales
 *
 * serial implementation
 *
 * Copyright 2016 Andreas Kotes
 * All rights reserved (for now)
 *
 */

( this.undefine || require( 'undefine' )( module, require ) )()
( 'lib/serial', ['lib/debugwin','lib/process_stub'], function serial_exports(debugWin, process) {
    var SerialPort;
    var posSerialPort = false;
    var posSerialAvailable = false;
    var exports = {
        sendToDisplay: function serial_sendToDisplay(message) {
            debugWin.sendToDisplay(message);
            if (posSerialAvailable) {
                posSerialPort.write(sprintf("\x1b=\x02\x0c%s", message));
                console.warn("serial.sendToDisplay(message), not properly implemented:");
            }
        },
        displayClock: function serial_displayClock(versionString) {
            var nextMinute = new Date((new Date()).getTime()+60000);
            debugWin.displayClock(nextMinute, versionString);
            if (posSerialAvailable) {
                posSerialPort.write(sprintf("%19s\n", versionString));
                window.setTimeout(function serial_displayClock_submit() {
                    posSerialPort.write(sprintf(
                            "\x1b=\x02\x1fT%c%c%19s",
                            nextMinute.getHours(),
                            nextMinute.getMinutes(),
                            versionString));
                    console.warn(sprintf("serial.displayClock(%02d:%02d, %s), not properly implemented:",
                            nextminute.getHours(),
                            nextminute.getMinutes(),
                            versionString));
                }, (60-nextMinute.getSeconds())*1000);
            }
        },
        sendToPrinter: function serial_sendToPrinter(content) {
            debugWin.sendToPrinter(content);
            if (posSerialAvailable) {
                console.warn("serial.sendToPrinter(content), not properly implemented:");
                console.info(content);
            }
        },
        triggerCashDrawer: function serial_triggerCashDrawer() {
            debugWin.triggerCashDrawer();
            if (posSerialAvailable) {
                console.warn("serial.triggerCashDrawer(content), not properly implemented");
            }
        },
        clearDisplay: function serial_clearDisplay() {
            debugWin.clearDisplay();
            if (posSerialAvailable) {
                console.log("serial.clearDisplay() called.");
                posSerialPort.write(sprintf("\x1b=\x02\x0c"));
            }
        },
        init : function serial_init() {
            if (process.versions.node !== 'none') {
                var os = require('os');
                if (os.platform() !== 'linux') {
                    console.warn('serial: currently only works on linux, not '+os.platform());
                } else {
                    SerialPort = require('serialport').SerialPort;
                    posSerialPort  = new SerialPort("/dev/ttyUSB0", { baudrate: 19200 });
                    console.assert(posSerialPort, 'serial: could not open serial port /dev/ttyUSB0');

                    posSerialPort.on("open", function serial_init_open() {
                        console.info('serial: enabled');

                        posSerialPort.on('data', function serial_data(data) {
                            console.warn('serial: received: '+data);
                        });
                        posSerialAvailable = true;
                    });
                }
            } else {
                console.warn('serial: currently only works under NWJS/Node.JS, not in the browser');
            }
        }
    };
    return exports;
});
