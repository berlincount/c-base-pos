var c_base_pos_version_string = "c-base-pos v0.8";
var sprintf = require("sprintf-js").sprintf;
var serialAvailable = false;
var SerialPort = require("serialport/serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyUSB0", { baudrate: 19200 });
serialPort.on("open", function() {
  console.log('serialPort enabled');
  serialPort.on('data', function(data) {
     console.log('serial received: '+data);
  })
  serialPort.write(sprintf("\x1B=\x02\x0c%19s",c_base_pos_version_string))
  serialAvailable = true;
  var nextminute = new Date((new Date).getTime()+60000);
  window.setTimeout(function () {
    serialPort.write(sprintf(
      "\x1B=\x02\x1fT%c%c%19s",
      nextminute.getHours(),
      nextminute.getMinutes(),
      c_base_pos_version_string))
  }, (60-nextminute.getSeconds())*1000);
  process.on('exit', function() {
    serialPort.write(sprintf("\x1B=\x02\x0%s\ncout of service.", c_base_pos_version_string));
  });
});
