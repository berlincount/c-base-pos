var child_process = require('child_process');
var proxyquire    = require('proxyquire').noCallThru();
var events        = require('events');
var chai          = require('chai');
var sinon         = require('sinon');
var expect        = chai.expect;
 
chai.use(require('sinon-chai'));
chai.use(require('dirty-chai'));
require('mocha-sinon');

describe('lib/debugwin', function debugwin_test() {
    describe('#init()', function debugwin_test_init() {
        it('should detect disabled debugging under NWJS', function debugwin_test_init1() {
            // let's grab the output
            this.sinon.stub(console, 'info');
            this.sinon.stub(console, 'warn');

            // stub NWJS environment
            var nwguiStub          = sinon.stub();
            nwguiStub.App          = sinon.stub();
            nwguiStub.App.manifest = {
                'config': {}
            };

            // run library
            debugwin = proxyquire('lib/debugwin', {
                'nw.gui':             nwguiStub,
            });
            debugwin.init();

            // check everything happened as expected

            // should say what happened
            console.info.calledOnce.should.equal(true);
            console.info.getCall(0).args[0].should.equal('debugwin: not enabled.');
            console.warn.callCount.should.equal(0);
        });

        it('should detect disabled debugging under Browsers', function debugwin_test_init2() {
            // let's grab the output
            this.sinon.stub(console, 'info');
            this.sinon.stub(console, 'warn');

            // stub browser's window object
            var window           = sinon.stub();
            window.location      = sinon.stub();
            window.location.hash = "";

            // stub NWJS environment (will be wrongly detected when under NodeJS)
            var nwguiStub          = sinon.stub();
            nwguiStub.App          = sinon.stub();
            nwguiStub.App.manifest = {
                'config': {}
            };

            // run library
            debugwin = proxyquire('lib/debugwin', {
                'nw.gui':             nwguiStub,
            });
            debugwin.init();

            // check everything happened as expected

            // should say what happened
            console.info.calledOnce.should.equal(true);
            console.info.getCall(0).args[0].should.equal('debugwin: not enabled.');
            console.warn.callCount.should.equal(0);
        });

        it('should detect enabled debugging under NWJS, open window & resize', function debugwin_test_init3() {
            // let's grab the output
            this.sinon.stub(console, 'info');
            this.sinon.stub(console, 'warn');
            this.sinon.stub(global, 'setTimeout');

            // stub more of the NWJS environment
            var winStub            = sinon.stub();
            winStub.resizeTo       = sinon.stub();
            window                 = sinon.stub();
            window.location        = sinon.stub();
            window.location.hash   = "";
            window.open            = sinon.stub().returns(winStub);
            var nwguiStub          = sinon.stub();
            nwguiStub.App          = sinon.stub();
            nwguiStub.App.manifest = {
                'config': {
                    'debug': true
                }
            };

            // run library
            debugwin = proxyquire('lib/debugwin', {
                'nw.gui':             nwguiStub,
            });
            debugwin.init();

            // check everything happened as expected

            // should have opened a window
            window.open.calledOnce.should.equal(true);
            window.open.getCall(0).args.length.should.equal(3);
            window.open.getCall(0).args[0].should.equal('c-base-pos-ext.html');
            window.open.getCall(0).args[1].should.equal('c-base-pos Externals');
            window.open.getCall(0).args[2].should.equal('left=1380,top=151,innerHeight=610,innerWidth=314,dependent=yes,menubar=no,location=no,scrollbars=no,status=no');

            // should have resized the window under NWJS
            winStub.resizeTo.calledOnce.should.equal(true);
            winStub.resizeTo.getCall(0).args[0].should.equal(332);
            winStub.resizeTo.getCall(0).args[1].should.equal(652);

            // should install a timer to refresh debug window display after a second
            global.setTimeout.calledOnce.should.equal(true);
            global.setTimeout.getCall(0).args.length.should.equal(2);
            global.setTimeout.getCall(0).args[0].should.equal(debugwin.resetDisplay);
            global.setTimeout.getCall(0).args[1].should.equal(500);

            // should say what happened
            console.info.calledOnce.should.equal(true);
            console.info.getCall(0).args[0].should.equal('debugwin: enabled.');
            console.warn.callCount.should.equal(0);

            // clean up non-scoped variables
            window = undefined;
        });

        it('should detect enabled debugging under Browsers & open window', function debugwin_test_init4() {
            // let's grab the output
            this.sinon.stub(console, 'info');
            this.sinon.stub(console, 'warn');
            this.sinon.stub(global, 'setTimeout');

            // stub browser's window object
            var winStub            = sinon.stub();
            winStub.resizeTo       = sinon.stub();
            window                 = sinon.stub();
            window.location        = sinon.stub();
            window.location.hash   = "#debug";
            window.open            = sinon.stub().returns(winStub);

            // run library
            debugwin = require('lib/debugwin');
            debugwin.init();

            // check everything happened as expected

            // should have opened a window
            window.open.calledOnce.should.equal(true);
            window.open.getCall(0).args.length.should.equal(3);
            window.open.getCall(0).args[0].should.equal('c-base-pos-ext.html');
            window.open.getCall(0).args[1].should.equal('c-base-pos Externals');
            window.open.getCall(0).args[2].should.equal('left=1380,top=151,innerHeight=610,innerWidth=314,dependent=yes,menubar=no,location=no,scrollbars=no,status=no');

            // should have resized the window under NWJS - NOT on the browser
            winStub.resizeTo.callCount.should.equal(0);

            // should install a timer to refresh debug window display after a second
            global.setTimeout.calledOnce.should.equal(true);
            global.setTimeout.getCall(0).args.length.should.equal(2);
            global.setTimeout.getCall(0).args[0].should.equal(debugwin.resetDisplay);
            global.setTimeout.getCall(0).args[1].should.equal(500);

            // should say what happened
            console.info.calledOnce.should.equal(true);
            console.info.getCall(0).args[0].should.equal('debugwin: enabled.');
            console.warn.callCount.should.equal(0);

            // clean up non-scoped variables
            window = undefined;
        });

        it('should detect problems opening the window', function debugwin_test_init5() {
            this.sinon.stub(console, 'info');
            this.sinon.stub(console, 'warn');

            // stub browser's window object
            window                 = sinon.stub();
            window.location        = sinon.stub();
            window.location.hash   = "#debug";
            window.open            = sinon.stub();

            // run library
            debugwin = require('lib/debugwin');
            debugwin.init();

            // check everything happened as expected

            // should have tried to open a window
            window.open.calledOnce.should.equal(true);
            window.open.getCall(0).args.length.should.equal(3);
            window.open.getCall(0).args[0].should.equal('c-base-pos-ext.html');
            window.open.getCall(0).args[1].should.equal('c-base-pos Externals');
            window.open.getCall(0).args[2].should.equal('left=1380,top=151,innerHeight=610,innerWidth=314,dependent=yes,menubar=no,location=no,scrollbars=no,status=no');

            // should say what happened
            console.info.callCount.should.equal(0);
            console.warn.calledOnce.should.equal(true);
            console.warn.getCall(0).args[0].should.equal('debugwin: cannot open requested debug window');

            // clean up non-scoped variables
            window = undefined;
        });
    });
});
