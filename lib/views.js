/*!
 * c-base Point of Sales
 *
 * serial implementation
 *
 * Copyright 2016 Andreas Kotes
 * All rights reserved (for now)
 *
 */

( this.undefine || require( 'undefine' )( module, require ) )()
( 'lib/views', ['jquery'], function views_exports(jQuery) {
    var exports = {
        checkView: function views_checkView(view) {
            // check whether there are any elements available for the requested view
            return ($('#'+view+'_main').length !== 0);
        },
        setView:   function views_setView(view)   {
            console.warn('views.setView: setting (showing & enabling) view "'+view+'".');
            exports.showView(view);
            exports.enableView(view);
        },
        showView:   function views_showView(view)   {
            // ensure only elements active for this view are shown

            // disable all <section> and <aside> element
            $('section').css('display', 'none');
            $('aside').css('display', 'none');
            // reenable permanent ones
            $('aside').filter('.permanent').css('display', '');
            // enable the view selected
            $('#'+view+'_main').css('display', '');
            $('#'+view+'_side').css('display', '');
        },
        enableView:   function views_enableView(view)   {
            // ensure only elements enabled for this view are active
            $('div.button').attr('disabled', true);
            $('div.'+view).removeAttr('disabled');
            if ($('#'+view+'_main').attr('enableclasses')) {
                $('#'+view+'_main').attr('enableclasses').split(' ').forEach(function views_enableView_div(viewclass) {
                    $('div.'+viewclass).removeAttr('disabled');
                });
            }
        },
        init :     function views_init()      { console.warn('views.init() not implemented'); }
    };
    return exports;
});
