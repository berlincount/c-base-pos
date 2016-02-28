var child_process = require('child_process');
var proxyquire    = require('proxyquire').noCallThru();
var events        = require('events');
var chai          = require('chai');
var sinon         = require('sinon');
var expect        = chai.expect;
 
chai.use(require('sinon-chai'));
chai.use(require('dirty-chai'));
require('mocha-sinon');

describe('lib/console_stub', function console_stub_test() {
    describe('#init()', function console_stub_test_init() {
        it('test', function console_stub_test_init1() {
            // let's grab the output
            this.sinon.stub(console, 'info');

            // run library
            console_stub = require('lib/console_stub');
        });
    });
});
