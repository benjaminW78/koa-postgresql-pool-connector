# koa-postgresql-pool-connector 
[![Build Status](https://travis-ci.org/benjaminW78/koa-postgresql-pool-connector.svg?branch=master)](https://travis-ci.org/benjaminW78/koa-postgresql-pool-connector) 
[![codecov.io](https://codecov.io/github/benjaminW78/koa-postgresql-pool-connector/coverage.svg?branch=master)](https://codecov.io/github/benjaminW78/koa-postgresql-pool-connector?branch=master)

koa-postgresql-pool-connector is a wrapper on top of koa-pg ready to use.

## Repository overview :
 
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

## Installation : 
 ```
 $ npm install koa
 ```
 
 ## Example :
    Following example could be found inside `/examples` directory. You could live test it by doing `npm run devExample`, after that you will have one working nodejs/koa/koaPostgres api working with 3 path.
 Don't forget to set a postgresSql Db on your local computer to make the example server work.
 
 
 1. First we set every `const` we will need.
 ``js
 const koa = require('koa'),
     dbCo = require('../index.js'),
     dbUrl = ''
     router = require('koa-joi-router')(),
     bodyParser = require('koa-bodyparser'),
     app = koa();
 ``

2. 
 