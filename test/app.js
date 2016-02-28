var child_process = require('child_process');
var proxyquire    = require('proxyquire').noCallThru();
var events        = require('events');
var chai          = require('chai');
var sinon         = require('sinon');
var expect        = chai.expect;
 
chai.use(require('sinon-chai'));
chai.use(require('dirty-chai'));
require('mocha-sinon');

describe('lib/app', function app_test() {
    describe('#init()', function app_test_init() {
        it('test', function app_test_init1() {
            // let's grab the output
            this.sinon.stub(console, 'info');

            // run library
            app = require('lib/app');
        });
    });
});
