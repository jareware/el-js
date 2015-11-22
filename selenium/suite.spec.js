var webdriverio = require('webdriverio');

var TARGETS = [ // @see https://code.google.com/p/selenium/wiki/DesiredCapabilities
    [ 'Chrome', '43' ],
    [ 'Firefox', '42' ],
    [ 'Internet Explorer', '10' ],
    [ 'Safari', '9' ],
    [ 'iPhone', '9.0' ]
];

describe('el.js', function() {

    this.timeout(5 * 60 * 1000); // 5 minutes
    this.slow(60 * 1000); // 1 minute

    TARGETS.forEach(function(target) {

        it('works on ' + target.join(' '), function() {
            return webdriverio.remote({
                desiredCapabilities: {
                    browserName: target[0],
                    version: target[1],
                    platform: 'ANY', // let the test runner choose (e.g. Windows for IE, Linux for Chrome)
                    name: 'el.js test suite'
                },
                host: 'ondemand.saucelabs.com',
                port: 80,
                user: process.env.SAUCE_USERNAME, // @see https://github.com/webdriverio/webdriverio/blob/master/examples/cloudservices/webdriverio.saucelabs.js
                key: process.env.SAUCE_ACCESS_KEY,
                logLevel: 'silent',
                screenshotPath: './selenium/'
            })
                .init()
                .url('http://jrw.fi/el-js/')
                .getText('#mocha-stats .failures').then(function(failures) {
                    if (failures !== 'failures: 0') {
                        throw new Error(failures);
                    }
                })
                .end();
        });

    });

});
