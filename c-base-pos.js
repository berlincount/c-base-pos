/*!
 * c-base Point of Sales
 *
 * Copyright 2013 Andreas Kotes
 * All rights reserved (for now)
 *
 * Date: 2013-11-02
 */

var posVersionString = "c-base-pos v0.8";

// stub out console logging methods if not present
if (typeof console === 'undefined') {
  console = {
    log     : function() {},
    debug   : function() {},
    info    : function() {},
    warn    : function() {},
    error   : function() {},
    assert  : function() {},
    clear   : function() {},
    clear   : function() {},
    trace   : function() {},
    time    : function() {},
    timeEnd : function() {},
  }
}
console.info(sprintf("%s; using JQuery %s", posVersionString, jQuery().jquery));

// our equipment debug window
var posDebugWindow = undefined
function posDebugWindowOpen() {
  posDebugWindow = window.open("c-base-pos-ext.html", "c-base-pos Externals", "left=1380,top=151,innerHeight=610,innerWidth=314,dependent=yes,menubar=no,location=no,scrollbars=no,status=no"); 
  console.assert(posDebugWindow, 'cannot open requested debug window')
  if (posDebugWindow) {
    link = $("head").html()
    $("head", posDebugWindow.document).html(html);
    var html = $("#debugWindow").html();
    $("body", posDebugWindow.document).html(html);
  }
}

function notify() {
  alert("notify");
}
// load serialport module when running on Node.JS
if (typeof require !== 'undefined') {
  var SerialPort = require("serialport/serialport").SerialPort;
  console.assert(SerialPort, 'node-serial could not be loaded')
} else {
  var SerialPort = undefined;
}

// our serialport object
var posSerialPort = undefined;
var posSerialAvailable = false;

// our equipment functions
function posDrawerOpen () {
  //if posSerialPort && posSerialAvailable
  //  posSerialPort.write();
  if (posDebugwindow)
    posDebugWindow.triggerDrawer();
}

function posDisplayWrite(message) {
  if (posSerialPort && posSerialAvailable)
    posSerialPort.write(sprintf("\x1b=\x02\x0c%s",message));
  if (posDebugWindow)
    posDebugWindow.displayWrite(message);
}

function posDisplayClock() {
  if (posSerialPort && posSerialAvailable) {
    var nextminute = new Date((new Date).getTime()+60000);
    window.setTimeout(function () {
        posSerialPort.write(sprintf(
          "\x1b=\x02\x1fT%c%c%19s",
          nextminute.getHours(),
          nextminute.getMinutes(),
          posVersionString))
    }, (60-nextminute.getSeconds())*1000);
  }
  if (posDebugWindow)
    posDebugWindow.displayClock();
}

if (SerialPort) {
  posSerialPort = new SerialPort("/dev/ttyUSB0", { baudrate: 19200 });
  console.assert(posSerialPort, "serialPort can't be opened");
  posSerialPort.on("open", function() {
    console.info('serialPort enabled');
    posSerialPort.on('data', function(data) {
      console.warn('serial received: '+data);
    })
    posDisplayWrite(sprintf("%19s",posVersionString))
    posSerialAvailable = true;

    // catch Node.JS program termination
    process.on('exit', function() {
      posDisplayWrite(sprintf("%s\n\rout of service.", posVersionString));
    });
    process.on('SIGINT', function() {
      posDisplayWrite(sprintf("%s\n\rout of service.", posVersionString));
    });
    process.on('SIGTERM', function() {
      posDisplayWrite(sprintf("%s\n\rout of service.", posVersionString));
    });
  });
}

// run the application
function posRun() {
  console.info('application started');
  // open debug window, if requested
  if (window.location.hash == "#debug")
    posDebugWindowOpen();
  // define initial state
  posChangeState('firstabout');
  posStartClock();
  posInstallHandlers();
}

var posClock=null;
function posStartClock() {
  console.info('clock started');
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
  $('div.button').attr('disabled', true);
  switch(view) {
    case 'about':
      $('#keypad_x').removeAttr('disabled');
      break;
    case 'sales':
      $('div.keypad').removeAttr('disabled');
      $('div.menubar').removeAttr('disabled');
      $('div.sales').removeAttr('disabled');
      $('div.list_amt').removeAttr('disabled');
      $('div.list_txt').removeAttr('disabled');
      $('div.list_sum').removeAttr('disabled');
      $('div.receipt').removeAttr('disabled');
  }
}

function posInstallHandlers() {
  // unbind all buttons
  $('div.button').unbind();
  $('div.button').unbind();

  // make all of them look touch-able
  $('div.button').hover(function(event){
    // TODO: check why I'm getting the <span> not the <div> per default
    var $target=$(event.target).parent('div');
    if ($target.attr("disabled"))
      return;
    $target.attr("touched",true);
  },function(event){
    // TODO: check why I'm getting the <span> not the <div> per default
    var $target=$(event.target).parent('div');
    if ($target.attr("disabled"))
      return;
    $target.removeAttr("touched");
  });

  // install view-specific button handlers
  $('div.button.sales').click(function(event){
    // TODO: check why I'm getting the <span> not the <div> per default
    var $target=$(event.target).parent('div');
    alert($target.attr('id'));
  });
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
