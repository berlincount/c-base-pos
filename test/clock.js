var child_process = require('child_process');
var proxyquire    = require('proxyquire').noCallThru();
var events        = require('events');
var chai          = require('chai');
var sinon         = require('sinon');
var expect        = chai.expect;
 
chai.use(require('sinon-chai'));
chai.use(require('dirty-chai'));
require('mocha-sinon');

describe('lib/clock', function clock_test() {
    describe('#init()', function clock_test_init() {
        it('should install an interval to update the clock', function clock_test_init1() {
            // let's grab the output
            this.sinon.stub(console, 'info');
            this.sinon.stub(global, 'setInterval');

            // run library
            clock = require('lib/clock');
            clock.update = sinon.stub();
            clock.init();

            // should update the display once
            clock.update.calledOnce.should.equal(true);

            // should install an interval to refresh clock display every second
            global.setInterval.calledOnce.should.equal(true);
            global.setInterval.getCall(0).args.length.should.equal(2);
            global.setInterval.getCall(0).args[0].should.equal(clock.update);
            global.setInterval.getCall(0).args[1].should.equal(1000);

            // should say what happened
            console.info.calledOnce.should.equal(true);
            console.info.getCall(0).args[0].should.equal('clock: started.');

            // clean up non-scoped variables
            delete require.cache[require.resolve('lib/clock')];
        });
    });

    describe('#update()', function clock_test_update(){
        it('should update the clock display', function clock_test_update1() {
            // stub jQuery
            var jqueryStub = sinon.stub();
            $              = jqueryStub.returns(jqueryStub);
            $.text         = sinon.stub();

            // fake time
            var faketime = sinon.useFakeTimers();

            // run library
            clock = require('lib/clock');
            clock.update();

            // unfake time
            faketime.restore();

            // should update the display
            $.calledOnce.should.equal(true);
            $.getCall(0).args.length.should.equal(1);
            $.getCall(0).args[0].should.equal('#datetime');
            $.text.calledOnce.should.equal(true);
            $.text.getCall(0).args.length.should.equal(1);
            $.text.getCall(0).args[0].should.equal('Zeit: 01.01.1970 00:00:00');

            // clean up non-scoped variables
            $ = undefined;
            delete require.cache[require.resolve('lib/clock')];
        });
    });

    describe('#stop()', function clock_test_stop() {
        it('should remove a created interval to update the clock', function clock_test_stop1() {
            // let's grab the output
            this.sinon.stub(console, 'info');
            this.sinon.stub(global, 'setInterval').returns('intervalStub');
            this.sinon.stub(global, 'clearInterval');

            // stub jQuery
            var jqueryStub = sinon.stub();
            $              = jqueryStub.returns(jqueryStub);
            $.text         = sinon.stub();

            // run library
            clock = require('lib/clock');
            clock.update = sinon.stub();
            clock.init();
            clock.stop();

            // should update the display when installing the interval
            clock.update.calledOnce.should.equal(true);

            // should install and clear an interval to refresh clock display every second
            global.setInterval.calledOnce.should.equal(true);
            global.setInterval.getCall(0).args.length.should.equal(2);
            global.setInterval.getCall(0).args[0].should.equal(clock.update);
            global.setInterval.getCall(0).args[1].should.equal(1000);
            global.clearInterval.calledOnce.should.equal(true);
            global.clearInterval.getCall(0).args.length.should.equal(1);
            global.clearInterval.getCall(0).args[0].should.equal('intervalStub');

            // should clear the display
            $.calledOnce.should.equal(true);
            $.getCall(0).args.length.should.equal(1);
            $.getCall(0).args[0].should.equal('#datetime');
            $.text.calledOnce.should.equal(true);
            $.text.getCall(0).args.length.should.equal(1);
            $.text.getCall(0).args[0].should.equal('Zeit: 00.00.0000 00:00:00');

            // should say what happened
            console.info.calledTwice.should.equal(true);
            console.info.getCall(0).args[0].should.equal('clock: started.');
            console.info.getCall(1).args[0].should.equal('clock: stopped.');

            // clean up non-scoped variables
            delete require.cache[require.resolve('lib/clock')];
        });

        it('should not remove an interval never created', function clock_test_stop2() {
            // let's grab the output
            this.sinon.stub(console, 'info');
            this.sinon.stub(global, 'setInterval');
            this.sinon.stub(global, 'clearInterval');

            // stub jQuery
            var jqueryStub = sinon.stub();
            $              = jqueryStub.returns(jqueryStub);
            $.text         = sinon.stub();

            // run library
            clock = require('lib/clock');
            clock.stop();

            // should neither install nor clear interval
            global.setInterval.callCount.should.equal(0);
            global.clearInterval.callCount.should.equal(0);

            // should clear the display
            $.calledOnce.should.equal(true);
            $.getCall(0).args.length.should.equal(1);
            $.getCall(0).args[0].should.equal('#datetime');
            $.text.calledOnce.should.equal(true);
            $.text.getCall(0).args.length.should.equal(1);
            $.text.getCall(0).args[0].should.equal('Zeit: 00.00.0000 00:00:00');

            // should say what happened
            console.info.calledOnce.should.equal(true);
            console.info.getCall(0).args[0].should.equal('clock: stopped.');

            // clean up non-scoped variables
            delete require.cache[require.resolve('lib/clock')];
        });
    });
});
