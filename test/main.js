var child_process = require('child_process');
var events        = require('events');
var mockery       = require('mockery');
var chai          = require('chai');
var sinon         = require('sinon');
var expect        = chai.expect;
 
chai.use(require('sinon-chai'));
chai.use(require('dirty-chai'));
require('mocha-sinon');

describe('lib/main', function() {
    describe('#init()', function() {
        before(function(){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
        });

        beforeEach(function(){
            // stub all internal modules
            debugwinStub = sinon.stub();
            debugwinStub.init = sinon.stub();
            mockery.registerMock('lib/debugwin', debugwinStub);
            serialStub = sinon.stub();
            serialStub.init = sinon.stub();
            mockery.registerMock('lib/serial', serialStub);
            clockStub = sinon.stub();
            clockStub.init = sinon.stub();
            mockery.registerMock('lib/clock', clockStub);
            appStub = sinon.stub();
            appStub.init = sinon.stub();
            mockery.registerMock('lib/app', appStub);
        });

        after(function(){
            mockery.disable();
        });

        it('should send an info line to console', function() {
            var main = require('lib/main');
            // let's grap the output
            this.sinon.stub(console, 'info');

            main.init();
            expect( console.info.calledOnce ).to.be.true();
            expect( console.info.calledWith("c-base-pos v0.8; using JQuery disabled; node " + process.versions.node + "; userAgent undefined") ).to.be.true();
        });

        it('should load and initialize several internal modules', function() {
            var main = require('lib/main');
            // shut up ;)
            this.sinon.stub(console, 'info');

            main.init();
            expect( debugwinStub.init.calledOnce ).to.be.true();
            expect( serialStub.init.calledOnce ).to.be.true();
            expect( clockStub.init.calledOnce ).to.be.true();
            expect( appStub.init.calledOnce ).to.be.true();
        });
    });
    describe('#run()', function() {
        before(function(){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
        });

        beforeEach(function(){
            // stub all internal modules
            debugwinStub = sinon.stub();
            debugwinStub.init = sinon.stub();
            mockery.registerMock('lib/debugwin', debugwinStub);
            serialStub = sinon.stub();
            serialStub.init = sinon.stub();
            mockery.registerMock('lib/serial', serialStub);
            clockStub = sinon.stub();
            clockStub.init = sinon.stub();
            mockery.registerMock('lib/clock', clockStub);
            appStub = sinon.stub();
            appStub.init = sinon.stub();
            appStub.run = sinon.stub();
            mockery.registerMock('lib/app', appStub);
        });

        after(function(){
            mockery.disable();
        });

        it('should run the main app when run itself', function() {
            var main = require('lib/main');
            // shut up ;)
            this.sinon.stub(console, 'info');

            main.init();
            main.run();
            expect( debugwinStub.init.calledOnce ).to.be.true();
            expect( serialStub.init.calledOnce ).to.be.true();
            expect( clockStub.init.calledOnce ).to.be.true();
            expect( appStub.init.calledOnce ).to.be.true();
            expect( appStub.run.calledOnce ).to.be.true();
        });
    });
});
