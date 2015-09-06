var cli = require('aurelia-cli');

var config = {
  js: {
    "dist/app-bundle": {
      modules: [
        '*',
        'aurelia-bootstrapper',
        'aurelia-http-client',
        'aurelia-router',
        'aurelia-animator-css',
        'github:aurelia/templating-binding', 
        'github:aurelia/templating-resources',
        'github:aurelia/templating-router',
        'github:aurelia/loader-default',
        'github:aurelia/history-browser'
      ],
      options: {
        inject: true
      }
    }
  },
  template: {
    "dist/app-bundle": {
      pattern: 'dist/*.html',
      options: {
        inject:  true
     }
    }
  }
};

cli.command('bundle', config);
cli.command('unbundle', config);
