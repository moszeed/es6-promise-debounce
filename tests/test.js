(function() {

    "use strict";

    require('phantomjs-polyfill');
    require('es6-promise').polyfill();

    var test = require('tape');

    var debounce = null;

    //check if require works
    test('require', function(t) {

        try {
            debounce = require('../src/es6-promise-debounce.js');
            t.ok(true, 'require finished');
            t.end();
        }
        catch(err) {
            t.end(err);
        }
    });

    test('debounce test', function(t) {

        var debouncedFunction = debounce(function() {
            return new Promise(function(resolve) {
                resolve();
            });
        }, 200);

        debouncedFunction()
            .then(function() {
                t.fail('fist call should not be called');
                t.end();
            });

        debouncedFunction()
            .then(function() {
                t.ok(true, 'second promise is called');
                t.end();
            });
    });


})();
