var child_process = require('child_process');
var proxyquire    = require('proxyquire').noCallThru();
var events        = require('events');
var chai          = require('chai');
var sinon         = require('sinon');
var expect        = chai.expect;
 
chai.use(require('sinon-chai'));
chai.use(require('dirty-chai'));
require('mocha-sinon');

describe('lib/main', function() {
    beforeEach(function(){
            // stub internal modules
            debugwinStub       = sinon.stub();
            debugwinStub.init  = sinon.stub();
            serialStub         = sinon.stub();
            serialStub.init    = sinon.stub();
            clockStub          = sinon.stub();
            clockStub.init     = sinon.stub();
            appStub            = sinon.stub();
            appStub.init       = sinon.stub();
            appStub.run        = sinon.stub();

            // stub stub modules
            consoleStub        = sinon.stub();
            consoleStub.init   = sinon.stub();
            processStub        = sinon.stub();
            processStub.init   = sinon.stub();
            navigatorStub      = sinon.stub();
            navigatorStub.init = sinon.stub();

            main = proxyquire('lib/main', {
                'lib/debugwin':       debugwinStub,
                'lib/serial':         serialStub,
                'lib/clock':          clockStub,
                'lib/app':            appStub,

                'lib/console_stub':   consoleStub,
                'lib/process_stub':   processStub,
                //'lib/navigator_stub': navigatorStub,
            });
    });

    describe('#init()', function() {
        it('should init several internal modules', function() {
            // shut up ;)
            this.sinon.stub(console, 'info');

            main.init();
            expect( debugwinStub.init.calledOnce ).to.be.true();
            expect( serialStub.init.calledOnce   ).to.be.true();
            expect( clockStub.init.calledOnce    ).to.be.true();
            expect( appStub.init.calledOnce      ).to.be.true();
        });

        it('should send an info line to console', function() {
            // let's grab the output
            this.sinon.stub(console, 'info');

            main.init();
            expect( console.info.calledOnce ).to.be.true();
            console.info.getCall(0).args[0].should.equal('c-base-pos v0.8; using JQuery disabled; node ' + process.versions.node + '; userAgent none');
        });
    });
    describe('#run()', function() {
        it('should run the main app when run itself', function() {
            // shut up ;)
            this.sinon.stub(console, 'info');

            main.init();
            main.run();
            expect( debugwinStub.init.calledOnce ).to.be.true();
            expect( serialStub.init.calledOnce   ).to.be.true();
            expect( clockStub.init.calledOnce    ).to.be.true();
            expect( appStub.init.calledOnce      ).to.be.true();
            expect( appStub.run.calledOnce       ).to.be.true();
        });
    });
});
