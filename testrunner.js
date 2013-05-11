var page = require('webpage').create();
page.open('c-base-pos.html', function () {
  page.render('c-base-pos.png');
  phantom.exit();
});
