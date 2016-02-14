var child_process = require('child_process');
var proxyquire    = require('proxyquire').noCallThru();
var events        = require('events');
var chai          = require('chai');
var sinon         = require('sinon');
var expect        = chai.expect;
 
chai.use(require('sinon-chai'));
chai.use(require('dirty-chai'));
require('mocha-sinon');

describe('lib/debugwin', function() {
    describe('#init()', function() {
        it('should detect disabled debugging under NWJS ', function() {
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
            console.info.calledOnce.should.equal(true);
            console.info.getCall(0).args[0].should.equal('debugwin: not enabled.');
            console.warn.callCount.should.equal(0);
        });

        it('should detect disabled debugging under Browsers ', function() {
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
            console.info.calledOnce.should.equal(true);
            console.info.getCall(0).args[0].should.equal('debugwin: not enabled.');
            console.warn.callCount.should.equal(0);
        });

        it('should detect enabled debugging under NWJS, open window & resize', function() {
            // let's grab the output
            this.sinon.stub(console, 'info');
            this.sinon.stub(console, 'warn');

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

            // stub jQuery
            var jqueryStub         = sinon.stub();
            jqueryStub.html        = sinon.stub();
            jqueryStub.html.onCall(0).returns('headStub');
            jqueryStub.html.onCall(2).returns('htmlStub');
            $                      = sinon.stub().returns(jqueryStub);

            // run library
            debugwin = proxyquire('lib/debugwin', {
                'nw.gui':             nwguiStub,
                'jquery':             jqueryStub
            });
            debugwin.init();

            // check everything happened as expected
            console.info.calledOnce.should.equal(true);
            console.info.getCall(0).args[0].should.equal('debugwin: enabled.');
            console.warn.callCount.should.equal(0);

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

            // should have used jQuery to copy the head & html element from main app to debug window
            $.callCount.should.equal(4);
            jqueryStub.html.callCount.should.equal(4);
            jqueryStub.html.getCall(0).args.length.should.equal(0);
            jqueryStub.html.getCall(1).args.length.should.equal(1);
            jqueryStub.html.getCall(1).args[0].should.equal('headStub');
            jqueryStub.html.getCall(2).args.length.should.equal(0);
            jqueryStub.html.getCall(3).args.length.should.equal(1);
            jqueryStub.html.getCall(3).args[0].should.equal('htmlStub');

            // clean up non-scoped variables
            $      = undefined;
            window = undefined;
        });

        it('should detect enabled debugging under Browsers & open window', function() {
            // let's grab the output
            this.sinon.stub(console, 'info');
            this.sinon.stub(console, 'warn');

            // stub browser's window object
            var winStub            = sinon.stub();
            winStub.resizeTo       = sinon.stub();
            window                 = sinon.stub();
            window.location        = sinon.stub();
            window.location.hash   = "#debug";
            window.open            = sinon.stub().returns(winStub);

            // stub jQuery
            var jqueryStub         = sinon.stub();
            jqueryStub.html        = sinon.stub();
            jqueryStub.html.onCall(0).returns('headStub');
            jqueryStub.html.onCall(2).returns('htmlStub');
            $                      = sinon.stub().returns(jqueryStub);

            // run library
            debugwin = proxyquire('lib/debugwin', {
                'jquery':             jqueryStub
            });
            debugwin.init();

            // check everything happened as expected
            console.info.calledOnce.should.equal(true);
            console.info.getCall(0).args[0].should.equal('debugwin: enabled.');
            console.warn.callCount.should.equal(0);

            // should have opened a window
            window.open.calledOnce.should.equal(true);
            window.open.getCall(0).args.length.should.equal(3);
            window.open.getCall(0).args[0].should.equal('c-base-pos-ext.html');
            window.open.getCall(0).args[1].should.equal('c-base-pos Externals');
            window.open.getCall(0).args[2].should.equal('left=1380,top=151,innerHeight=610,innerWidth=314,dependent=yes,menubar=no,location=no,scrollbars=no,status=no');

            // should have resized the window under NWJS - NOT on the browser
            winStub.resizeTo.callCount.should.equal(0);

            // should have used jQuery to copy the head & html element from main app to debug window
            $.callCount.should.equal(4);
            jqueryStub.html.callCount.should.equal(4);
            jqueryStub.html.getCall(0).args.length.should.equal(0);
            jqueryStub.html.getCall(1).args.length.should.equal(1);
            jqueryStub.html.getCall(1).args[0].should.equal('headStub');
            jqueryStub.html.getCall(2).args.length.should.equal(0);
            jqueryStub.html.getCall(3).args.length.should.equal(1);
            jqueryStub.html.getCall(3).args[0].should.equal('htmlStub');

            // clean up non-scoped variables
            $      = undefined;
            window = undefined;
        });

        it('should detect problems opening the window', function() {
            this.sinon.stub(console, 'info');
            this.sinon.stub(console, 'warn');

            // stub browser's window object
            window                 = sinon.stub();
            window.location        = sinon.stub();
            window.location.hash   = "#debug";
            window.open            = sinon.stub();

            // stub jQuery
            var jqueryStub         = sinon.stub();
            jqueryStub.html        = sinon.stub();
            jqueryStub.html.onCall(0).returns('headStub');
            jqueryStub.html.onCall(2).returns('htmlStub');
            $                      = sinon.stub().returns(jqueryStub);

            // run library
            debugwin = proxyquire('lib/debugwin', {
                'jquery':             jqueryStub
            });
            debugwin.init();

            // check everything happened as expected
            console.info.callCount.should.equal(0);
            console.warn.calledOnce.should.equal(true);
            console.warn.getCall(0).args[0].should.equal('debugwin: cannot open requested debug window');

            // should have opened a window
            window.open.calledOnce.should.equal(true);
            window.open.getCall(0).args.length.should.equal(3);
            window.open.getCall(0).args[0].should.equal('c-base-pos-ext.html');
            window.open.getCall(0).args[1].should.equal('c-base-pos Externals');
            window.open.getCall(0).args[2].should.equal('left=1380,top=151,innerHeight=610,innerWidth=314,dependent=yes,menubar=no,location=no,scrollbars=no,status=no');

            // should have used jQuery to copy the head & html element from main app to debug window
            $.callCount.should.equal(0);
            jqueryStub.html.callCount.should.equal(0);

            // clean up non-scoped variables
            $      = undefined;
            window = undefined;
        });
    });
});
