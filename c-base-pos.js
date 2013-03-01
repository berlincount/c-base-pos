/*!
 * c-base Point of Sales
 *
 * Copyright 2013 Andreas Kotes
 * All rights reserved (for now)
 *
 * Date: 2013-03-01
 */

function runPoS() {
  // define initial state
  changeState('firstabout');
}

currentState = 'unknown';
stateTimeout = false;
function changeState(state) {
  if (stateTimeout)
    window.clearTimeout(stateTimeout);
  switch (state) {
    case 'firstabout':
                  // switch to sales screen after 3 seconds
                  window.setTimeout(function(){changeState('sales')}, 3000);
    case 'about': // show only the 'about' section
                  $('section').css('display', 'none');
                  $('#about').css('display', '');

                  // enable only the 'X' button in the keypad
                  $('div').filter('.button').attr('disabled', true);
                  $('#keypad_x').removeAttr('disabled');
                  break;
    case 'sales': // show only the 'sales' section
                  $('section').css('display', 'none');
                  $('#sales').css('display', '');

                  // enable basically all visible buttons (only)
                  $('div').filter('.button').attr('disabled', true);
                  $('div').filter('.keypad').removeAttr('disabled');
                  $('div').filter('.menubar').removeAttr('disabled');
                  $('div').filter('.sales').removeAttr('disabled');
                  $('div').filter('.list_amt').removeAttr('disabled');
                  $('div').filter('.list_txt').removeAttr('disabled');
                  $('div').filter('.list_sum').removeAttr('disabled');
                  $('div').filter('.receipt').removeAttr('disabled');
                  break;
  }
}

