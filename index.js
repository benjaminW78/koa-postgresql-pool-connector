/*globals module, require ,console*/

function *dbConnection(next) {
    'use strict';

    /**
     * module for db connection
     * @param databaseUrl key
     * @param query to execute by client
     * @return promise
     */
    function sqlQuery(databaseUrl, query) {
        const co = require('co'),
            pg = require('co-pg')(require('pg'));
        return co(pool.bind(this,pg,databaseUrl,query));
    }

    function *pool( pg,conString,query) {
        try {
            const connectResults = yield pg.connectPromise(conString),
                client = connectResults[0],
                done = connectResults[1],
                result = client.queryPromise(query);
            //call `done()` to release the client back to the pool
            done();
            return yield result;
        } catch (eXception) {
            console.log('dbConnection #sqlQuery', eXception.stack);
            return eXception;
        }
    }

    this._pool = pool;
    this.sqlQuery = sqlQuery;

    yield next;
}

module.exports = dbConnection;