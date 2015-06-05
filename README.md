#es6-promise-debounce
a debounce function for promises

#example

    var debounce = require('es6-promise-debounce');

    var debouncedFunction = debounce(function() {
        return new Promise(function(resolve) {
            resolve();
        });
    }, 200);

    debouncedFunction().then(function() { console.log('this one should be ignored'); });
    debouncedFunction().then(function() { console.log('this one should be executed'); });
