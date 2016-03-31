const koa = require( 'koa' ),
    dbCo = require( '../index.js' ),
    dbUrl = '',
    router = require( 'koa-joi-router' )(),
    bodyParser = require( 'koa-bodyparser' ),
    app = koa();

app.use( dbCo );

app.use( bodyParser() );
app.use( router.middleware() );

router
    .post( '/createFilmTable', function* ( next ) {
        'use strict';

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

app.listen( 3000 );