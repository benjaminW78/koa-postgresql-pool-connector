/*globals module, require */

function *dbConnection(next) {
    'use strict';

    /**
     * module for db connection
     * @param configDb {} Object that contain databaseUrl key
     * @param query to execute by client
     * @returns promise
     */
    function sqlQuery(configDb, query) {
        const co = require('co'),
            pg = require('co-pg')(require('pg')),
            conString = configDb.databaseUrl;

        return co(function *pool() {
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
            }
        });
    }

    this.sqlQuery = sqlQuery;

    yield next;
}

module.exports = dbConnection;