/*!
 * c-base Point of Sales
 *
 * datastore implementation
 *
 * Copyright 2016 Andreas Kotes
 * All rights reserved (for now)
 *
 */

( this.undefine || require( 'undefine' )( module, require ) )()
( 'lib/datastore', ['jsonapi-datastore','jquery'], function datastore_exports(jsonapidatastoremodule, jQuery) {
    var store;

    var exports = {
        receive:   function datastore_receive(data) {
            console.debug('datastore_receive', data);
        },
        populate:  function datastore_populate(endpoint, resourcetype, resourceid){
            console.log('datastore_populate', endpoint, resourcetype, resourceid);
            if (typeof resourceid === 'undefined') { resourceid = ''; }
            $.getJSON([ endpoint, resourcetype, resourceid ].join('/'), exports.receive);
        },
        init :     function datastore_init()      {
            store = new JsonApiDataStore();

            console.info('datastore: initialized');
        }
    };
    return exports;
});
