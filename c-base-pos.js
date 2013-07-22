/*!
 * c-base Point of Sales
 *
 * Copyright 2013 Andreas Kotes
 * All rights reserved (for now)
 *
 * Date: 2013-07-22
 */

var posVersionString = "c-base-pos v0.8";

if (require) {
  // load dependencies
  var sprintf = require("sprintf-js").sprintf;
  var SerialPort = require("serialport/serialport").SerialPort;
}

function posRun() {
  console.log(posVersionString);

  // define initial state
  posChangeState('firstabout');
  posUpdateClock();
  posStartClock();
  posInitSerial();
}

var posClock=null;
function posStartClock() {
  posClock=self.setInterval(function(){posUpdateClock()},1000);
}

function posUpdateClock() {
  var d=new Date();
  var date_str=('0'+d.getDate()).substr(-2,2)+'.'+('0'+(d.getMonth()+1)).substr(-2,2)+'.'+d.getFullYear();
  var time_str=('0'+d.getHours()).substr(-2,2)+':'+('0'+d.getMinutes()).substr(-2,2)+':'+('0'+d.getSeconds()).substr(-2,2);
  $('#datetime').text('Zeit: '+date_str+' '+time_str);
}

function posShowView(view) {
  console.log("posShowView: "+view)
  // disable all <section> and <aside> element
  $('section').css('display', 'none');
  $('aside').css('display', 'none');
  // reenable permanent ones
  $('aside').filter('.permanent').css('display', '');
  // enable the view selected
  $('#'+view+'_main').css('display', '');
  $('#'+view+'_side').css('display', '');
}

function posEnableButtons(view) {
  console.log("posEnableButtons: "+view)
  $('div').filter('.button').attr('disabled', true);
  switch(view) {
    case 'about':
      $('#keypad_x').removeAttr('disabled');
      break;
    case 'sales':
      $('div').filter('.keypad').removeAttr('disabled');
      $('div').filter('.menubar').removeAttr('disabled');
      $('div').filter('.sales').removeAttr('disabled');
      $('div').filter('.list_amt').removeAttr('disabled');
      $('div').filter('.list_txt').removeAttr('disabled');
      $('div').filter('.list_sum').removeAttr('disabled');
      $('div').filter('.receipt').removeAttr('disabled');
  }
}

var posCurrentState = 'unknown';
var posStateTimeout = false;
function posChangeState(state) {
  console.log("posChangeState: "+state)
  if (posStateTimeout)
    window.clearTimeout(posStateTimeout);
  switch (state) {
    case 'firstabout':
      // switch to sales screen after 3 seconds
      window.setTimeout(function(){posChangeState('sales')}, 3000);
    case 'about':
      posShowView('about');
      posEnableButtons('about');
      break;
    case 'sales':
      posShowView('sales')
      posEnableButtons('sales');
      break;
  }
  posCurrentState=state;
}

var posSerialAvailable = false;
var posSerialPort;
function posInitSerial() {
  posSerialPort = new SerialPort("/dev/ttyUSB0", { baudrate: 19200 });
  posSerialPort.on("open", function() {
    console.log('serialPort enabled');
    posSerialPort.on('data', function(data) {
      console.log('serial received: '+data);
    })
    posSerialPort.write(sprintf("\x1b=\x02\x0c%19s",posVersionString))
    posSerialAvailable = true;
    var nextminute = new Date((new Date).getTime()+60000);
    window.setTimeout(function () {
        posSerialPort.write(sprintf(
          "\x1b=\x02\x1fT%c%c%19s",
          nextminute.getHours(),
          nextminute.getMinutes(),
          posVersionString))
    }, (60-nextminute.getSeconds())*1000);
    process.on('exit', function() {
      posSerialPort.write(sprintf(
        "\x1b=\x02\x0c%s\n\rout of service.",
        posVersionString));
    });
    process.on('SIGINT', function() {
      posSerialPort.write(sprintf(
        "\x1b=\x02\x0c%s\n\rout of service.",
        posVersionString));
    });
  });
}
