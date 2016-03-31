# **koa-postgresql-pool-connector** 
[![Build Status](https://travis-ci.org/benjaminW78/koa-postgresql-pool-connector.svg?branch=master)](https://travis-ci.org/benjaminW78/koa-postgresql-pool-connector) 
[![codecov.io](https://codecov.io/github/benjaminW78/koa-postgresql-pool-connector/coverage.svg?branch=master)](https://codecov.io/github/benjaminW78/koa-postgresql-pool-connector?branch=master)

The MIT License (MIT)

koa-postgresql-pool-connector is a wrapper on top of koa-pg ready to use.

### Table of Contents
**[Practical information](#practical-information)**  
**[Files tree](#files-tree)**  
**[Installation](#installation)**  
**[API documentation](#api-documentation)**  
**[Example](#example)**  
**[Acknowledgement](#acknowledgement)**  
**[Other project](#other-project)**  

## **Practical information** 
 *You must be familiar* with :  
 - [ES6 generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
 - [Koa framework](https://github.com/koajs/joi-router) 
 - [ES promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## **Files tree** 
```
    ./
    ├── examples                // Contain one working example.
    │   └── index.js
    ├── .gitignore
    ├── index.js                // Current npm module sources
    ├── LICENSE
    ├── package.json
    ├── README.md
    └── __tests__               // Jest Unit Tests
    │   └── index-test.js
    └── .travis.yml
```

## **Installation** 
```
    $ npm install koa
```

## **API documentation**
This is a simple code overview of how to use **koa-postgresql-pool-connector**.
After you added the module to your nodeJs app, `this.sqlQuery` will be available from every koa generator scope functions. 

#### this.sqlQuery  
Param name | Description | Mandatory
------------ | ------------- | -------------
databaseUrl | *string which should contain the database connection info* | **YES** 
query | *string which should contain the query to execute on PG db* | **YES**
Return | *promise which you could use as you want for callback* | **always present** 

```js
    /**
     * module for db pool connection
     * @param databaseUrl key
     * @param query to execute by client
     * @return promise
     */
```

#### code simplification
```js
const app = require( 'koa' )(),
    router = require( 'koa-joi-router' )(),
    dbCo = require( 'koa-postgresql-pool-connector' );

app.use( dbCo );
app.use( router.middleware() );

router.post('/example',function* (next){
const query = 'postegresql query';
    this.sqlQuery("urlDb",query)
    .then(function( respData ){
        //do your stuf after query execution
    })
});

```

## **Example** 
Following example could be found inside `/examples` directory. 
   
Live test it by doing `npm run devExample`, which will start nodejs instance with koa/koaPostgres api with 3 working path.
Don't forget to set a postgresSql Db on your local computer to make the example server work.
 
*current db url connection : `postgres://postgres:postgres@localhost:5432/postgres`
 
### Example overview
 * set every `const` we will need.
```js
// const dbCo is our koa-postgresql-pool-connector
const koa = require( 'koa' ),
    dbCo = require( '../index.js' ),
    dbUrl = '',
    router = require( 'koa-joi-router' )(),
    bodyParser = require( 'koa-bodyparser' ),
    app = koa();
```
* add middlewares to Nodejs app.
```js
// add our koa-postgresql-pool-connector module to nodeJs app as middleware.
app.use( dbCo );
// use a koa bodyparser to get form data as middleware.
app.use( bodyParser() );
// declare a koa joi router as middleware.
app.use( router.middleware() );
```
* create specifiques routes via [koi-joi-router](https://github.com/koajs/joi-router). We see that i passed callbacks to every routes
```js
router
    .post( '/createFilmTable', function* ( next ) {
        'use strict';
// just call this.sqlQuery and you will get you function to request database with a query and a callback to execute at the end
        this.sqlQuery( 'postgres://postgres:postgres@localhost:5432/postgres',
            "CREATE TABLE films (" +
            "id serial NOT NULL,  CONSTRAINT films_pkey PRIMARY KEY (id)," +
            "title       varchar(40) NOT NULL," +
            "kind        varchar(10)," +
            ");"
        )
    } )
    .get( '/films/', function* ( next ) {
        'use strict';

        let that = this;

        yield this.sqlQuery( 'postgres://postgres:postgres@localhost:5432/postgres',
            "SELECT * FROM films;"
        ).then( function ( data ) {
            if ( data.name === "error" ) {
                that.status = 500;
                that.body = data;
            }
            if ( data.rowCount !== 0 ) {
                that.status = 200;
                that.body = { data: data.rows }
            }
            else {
                that.status = 204
            }
        } );
    } )
    .post( '/films/', function* ( next ) {
        'use strict';
        let data = this.request.body,
            that = this;

        if ( data.title && data.kind ) {
            yield this.sqlQuery( 'postgres://postgres:postgres@localhost:5432/postgres',
                          'INSERT INTO films (title,kind) VALUES (\'' + data.title + '\',\'' + data.kind + '\')' )
                      .then( function ( data ) {
                          console.log( arguments );
                          if ( data.name === "error" ) {
                              that.status = 500;
                              that.body = data;
                          }
                          if ( data && data.rowCount !== 0 ) {
                              that.status = 200;
                              that.body = { data: data.rows };
                          }
                          else {
                              that.status = 204;
                          }
                      } );
        }
        else {
            this.status = 400;
            this.body = { error: 'missing title or kind key with values' };
        }
    } );
```
 
## Acknowledgement
 
 Thanks to [@Companeo](https://github.com/Companeo) for let me post this module I developped for work under open source license.
 Thanks to [@MathRobin](https://github.com/MathRobin) for his help and introduction to Koa.
 
## Other project
 You may also like this project : [git-hooks-versionned](https://github.com/benjaminW78/git-hooks-versionned)
 
 
