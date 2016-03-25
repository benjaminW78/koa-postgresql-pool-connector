const koa = require('koa'),
    dbCo = require('../index.js'),
    dbUrl = ''
    router = require('koa-joi-router')(),
    app = koa();

app.use(dbCo);
console.log("toto");


app.use(router.middleware());
router
    .post('/createFilmTable',function*(){
        console.log(this.sqlQuery('postgres://postgres:postgres@localhost:5432/postgres',
            "CREATE TABLE films ("+
                "code        char(5) CONSTRAINT firstkey PRIMARY KEY,"+
                "title       varchar(40) NOT NULL,"+
                "did         integer NOT NULL,"+
                "date_prod   date,"+
                "kind        varchar(10),"+
                "len         interval hour to minute"+
            ");"
        ))
    })
    .get('/films',function*(){
        console.log(this.sqlQuery('postgres://postgres:postgres@localhost:5432/postgres',
            "SELECT * FROM films;"
        ))
    })
    .post('/addFilm/',function*(){
        console.log(this.sqlQuery('postgres://postgres:postgres@localhost:5432/postgres',
            "INSERT INTO films (title,did,kind,len) VALUES ("+""+");"
        ))
    })

app.listen(3000)