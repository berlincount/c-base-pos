var child_process = require('child_process');
var proxyquire    = require('proxyquire').noCallThru();
var events        = require('events');
var chai          = require('chai');
var sinon         = require('sinon');
var expect        = chai.expect;
 
chai.use(require('sinon-chai'));
chai.use(require('dirty-chai'));
require('mocha-sinon');

describe('lib/main', function main_test() {
    beforeEach(function main_test_beforeEach(){
            // stub internal modules
            debugwinStub          = sinon.stub();
            debugwinStub.init     = sinon.stub();
            serialStub            = sinon.stub();
            serialStub.init       = sinon.stub();
            clockStub             = sinon.stub();
            clockStub.init        = sinon.stub();
            viewsStub             = sinon.stub();
            viewsStub.init        = sinon.stub();
            datastoreStub         = sinon.stub();
            datastoreStub.init    = sinon.stub();
            appStub               = sinon.stub();
            appStub.versionString = 'versionString';
            appStub.init          = sinon.stub();
            appStub.run           = sinon.stub();

            // stub stub modules
            var consoleStub       = sinon.stub();
            consoleStub.init      = sinon.stub();
            var processStub       = sinon.stub();
            processStub.init      = sinon.stub();
            var navigatorStub     = sinon.stub();
            navigatorStub.init    = sinon.stub();

            // stub navigator & jquery
            navigator             = navigatorStub;
            navigator.userAgent   = 'stubbed';
            var jqueryStub        = sinon.stub();
            var jqueryStubStub    = sinon.stub().returns(jqueryStub); // .returnsThis() doesn't work?
            jqueryStub.jquery     = 'stubbed';

            main = proxyquire('lib/main', {
                'lib/debugwin':       debugwinStub,
                'lib/serial':         serialStub,
                'lib/clock':          clockStub,
                'lib/views':          viewsStub,
                'lib/datastore':      datastoreStub,
                'lib/app':            appStub,

                'lib/console_stub':   consoleStub,
                'lib/process_stub':   processStub,
                'lib/navigator_stub': navigatorStub,
                'jquery':             jqueryStubStub,
            });
    });

    afterEach(function main_test_afterEach() {
            navigator = undefined;
    });

    describe('#init()', function main_test_init() {
        it('should init several internal modules', function main_test_init1() {
            // shut up ;)
            this.sinon.stub(console, 'info');

            // provide a global windows object to hook app from
            window = sinon.stub();
            expect( typeof window.app ).to.equal('undefined');

            main.init();
            expect( debugwinStub.init.calledOnce  ).to.be.true();
            expect( serialStub.init.calledOnce    ).to.be.true();
            expect( clockStub.init.calledOnce     ).to.be.true();
            expect( viewsStub.init.calledOnce     ).to.be.true();
            expect( datastoreStub.init.calledOnce ).to.be.true();
            expect( appStub.init.calledOnce       ).to.be.true();
            expect( window.app ).to.equal(appStub);

            // clean up non-scoped variables
            window = undefined;
        });

        it('should send an info line to console', function main_test_init2() {
            // let's grab the output
            this.sinon.stub(console, 'info');

            // provide a global windows object to hook app from
            window = sinon.stub();
            expect( typeof window.app ).to.equal('undefined');

            main.init();
            expect( console.info.calledOnce ).to.be.true();
            console.info.getCall(0).args[0].should.equal('versionString; using JQuery stubbed; node ' + process.versions.node + '; userAgent stubbed');

            // clean up non-scoped variables
            window = undefined;
        });
    });
    describe('#run()', function main_test_run() {
        it('should run the main app when run itself', function main_test_run1() {
            // shut up ;)
            this.sinon.stub(console, 'info');

            // provide a global windows object to hook app from
            window = sinon.stub();
            expect( typeof window.app ).to.equal('undefined');

            main.init();
            main.run();
            expect( debugwinStub.init.calledOnce  ).to.be.true();
            expect( serialStub.init.calledOnce    ).to.be.true();
            expect( clockStub.init.calledOnce     ).to.be.true();
            expect( viewsStub.init.calledOnce     ).to.be.true();
            expect( datastoreStub.init.calledOnce ).to.be.true();
            expect( appStub.init.calledOnce       ).to.be.true();
            expect( appStub.run.calledOnce        ).to.be.true();

            // clean up non-scoped variables
            window = undefined;
        });
    });
});
