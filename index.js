const PgPromise = require("pg-promise")
const express = require('express');
const fs = require('fs');
require('dotenv').config()
const API = require('./api');
const { default: axios } = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//const {ConnectionString} = require('connection-string');
//const { DATABASE_URL } = process.env;
//const cs = new ConnectionString(DATABASE_URL);
 
//function get_PostgreSQL_connection() {
   //return {
    //   host: cs.hostname,
     //  port: cs.port,
     //  database: cs.path?.[0],
     //  user: cs.user,
      // password: cs.password,
      //// ssl: DATABASE_URL.includes('localhost') ? false : {rejectUnauthorized: false},
      // application_name: cs.params?.application_name
  // };
//}
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://gary:gar123@localhost:5432/garment_app';
//let ssl = null;
//if (process.env.NODE_ENV === 'development') {
  // ssl = {rejectUnauthorized: false};
//}
//const config = {
   // connectionString: process.env.DATABASE_URL || 'postgres://gary:gar123@localhost:5432/garment_app',
   // max: 30,
   // ssl:ssl
 //};
 const pgp = PgPromise({})
// const config = {
 // connectionString: DATABASE_URL
//};

// we normally only have a DATABAE_URL when we are on the Heroku server
//if (process.env.DATABASE_URL) {
  //config.ssl = { rejectUnauthorized: false };
//}

//const db = pgp(config);

 //const db = pgp(config);
 
//let ssl = null;
//if (process.env.NODE_ENV === 'development') {
//ssl = {rejectUnauthorized: false};
//}
//const config = {
//connectionString: 'postgres://john:pass123@localhost:5432/products',
//max: 30,
//ssl:ssl
//};


//const db = pgp(config);

 
//const db = pgp(get_PostgreSQL_connection());

 //const DATABASE_URL = process.env.DATABASE_URL;
 //const pgp = PgPromise({});
 const db = pgp(DATABASE_URL);
app.use(express.static('public'))
API(app, db);

//app.get('/', function (req, res) {
  //res.render('index.html')
//})
app.get('/', async function(req, res) {
  console.log(req.query)
});
//configure the port number using and environment number
var portNumber = process.env.PORT || 5000;

//start everything up
app.listen(portNumber, function () {
    console.log('App started on:', portNumber);
});