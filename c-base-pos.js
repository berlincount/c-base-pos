/*!
 * c-base Point of Sales
 *
 * Copyright 2013 Andreas Kotes
 * All rights reserved (for now)
 *
 * Date: 2013-03-01
 */

function posRun() {
  // define initial state
  posChangeState('firstabout');
  posUpdateClock();
  posStartClock();
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

