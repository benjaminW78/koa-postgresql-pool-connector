/*globals require, jest, describe, it, expect, beforeEach, __db */

'use strict';

const pathAndName = 'dbConnection',
    noop = function *() {
    };
let pgMock;

jest.autoMockOff();

pgMock = jest.genMockFromModule('co-pg');
pgMock.connectPromise = function () {
    return [{
        queryPromise: function(query){
            if(!query){
                throw 'query undefined/null';
            }
            else{
                return {};
            }
        }
    }, noop];
};

describe(pathAndName, function () {
    beforeEach(function () {
        //Set up some mocked out file info before each test
        require('co-pg');
    });

    describe('middleware', function () {
        const testedThing = require('../index.js'),
            context = {};
        let thing,
            next;

        it('must be a generator', function () {
            let final;

            thing = testedThing.call(context);
            next = thing.next();
            expect(next.done).toBeFalsy();
            expect(next.value).toBeUndefined();
            final = thing.next();
            expect(final.done).toBeTruthy();
            expect(final.value).toBeUndefined();
        });

        describe('#sqlQuery', function () {
            it('must works', function () {
                const result = context.sqlQuery({
                    databaseUrl: ''
                });
                expect(result).toEqual({});
                result
                    .catch(function (err) {
                        expect(err).not.toBeDefined();
                    })
                    .then(function (value) {
                        expect(value).not.toBeDefined();
                    }, function (err) {
                        expect(err).not.toBeDefined();
                    });
            });
        });

        describe('#*pool Generator', function () {
            it('must be a generator', function () {
                let middle,
                    final,
                    end;
                thing = context._pool.call(this,pgMock,'toto','Fake QUERY SQL');
                next = thing.next();
                expect(next.done).toBeFalsy();
                expect(next.value).toBeDefined();
                middle = thing.next(next.value);
                expect(middle.done).toBeFalsy();
                expect(middle.value).toBeDefined();
            });
            it('must catch exception',function(){
                let middle,
                    final,
                    end;
                thing = context._pool.call(this,pgMock,'toto');
                next = thing.next();
                expect(next.done).toBeFalsy();
                expect(next.value).toBeDefined();

                middle = thing.next(next.value);
                expect(middle.done).toBeTruthy();
                expect(middle.value).toBeDefined();
                expect(middle.value).toMatch('query undefined/null');
                console.log(middle)

            });
        });
    });
});