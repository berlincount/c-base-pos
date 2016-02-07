requirejs.config({
    baseUrl: '.',
    paths: {
      'sprintf-js': 'node_modules/sprintf-js/dist/sprintf.min',
      'jquery': 'node_modules/jquery/dist/jquery.min',
      'serialport': 'node_modules/serialport'
    }
});

requirejs(['lib/main'],function(main) { main.init(); main.run(); });

