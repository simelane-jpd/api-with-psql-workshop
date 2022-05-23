//const supertest = require('supertest');
//const PgPromise = require("pg-promise")
const express = require('express');
//const assert = require('assert');
//const fs = require('fs');
const garments = require('./garments.json')
require('dotenv').config()


//const API = require('../api');
//const { default: axios } = require('axios');
const app = express();

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//const DATABASE_URL = process.env.DATABASE_URL;
//const pgp = PgPromise({});
//const db = pgp(DATABASE_URL);


//API(app, db);
const PORT = process.env.PORT || 5000
//app.get('/', function(req, res){
   // res.render('index.html')
//})

app.listen(PORT, () => console.log('App started on port ' + PORT))
//const express = require('express')

//const app = express()
app.get('/api/garments',  (req, res) => {
    const gender = req.query.gender
    const season = req.query.season

    const filteredGarments = garments.filter(garment => {
		// if both gender & season was supplied
		if (gender != 'All' && season != 'All') {
			return garment.gender === gender 
				&& garment.season === season
		} else if(gender != 'All') { // if gender was supplied
			return garment.gender === gender
		} else if(season != 'All') { // if season was supplied
			return garment.season === season
		}
		return true
	})
    res.json({
        garments: filteredGarments
    })
})
app.post('/api/garments', (req, res) => {
    //jwt.verify(req.token, 'secretkey', (err, authData) => {
     // if(err){
       // res.sendStatus(403)
      //}else {
        const {
          description,
          img,
          gender,
          season,
          price
        } = req.body;
      
        if (!description || !img || !price) {
          res.json({
            status: 'error',
            message: 'Required data not supplied',
            authData
          });
        } else {
          garments.push({
            description,
            img,
            gender,
            season,
            price
          });
      
          res.json({
            status: 'success',
            message: 'New garment added.',
            //authData
          });
        }
      //}
    //})
  });
  app.get('/api/garments/price/:price',  (req, res) => {
    const maxPrice = Number(req.params.price)
	const filteredGarments = garments.filter(garment => {
		if (maxPrice > 0) {
			return garment.price <= maxPrice
		}
		return true
	})

	res.json({ 
		garments : filteredGarments
	})
})
  