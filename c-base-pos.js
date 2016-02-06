requirejs.config({
    baseUrl: 'lib',
    paths: {
      'sprintf': '../node_modules/sprintf-js/dist/sprintf.min',
      'jquery': '../node_modules/jquery/dist/jquery.min',
      'serialport': '../node_modules/serialport'
    }
});

requirejs(['main']);

