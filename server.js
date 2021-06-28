'use strict';
//
//const { Client } = require('pg');
// ================================================================
// get all the tools we need
// ================================================================
const express = require('express');
const port = process.env.PORT || 3000;

const app = express();
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
// ================================================================
// setup our express application
// ================================================================
app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');


// ================================================================
// setup routes
// ================================================================
app.get('/',(req,res) =>{
    res.json({message: `Hello Allen`})
})
// ================================================================
// start our server
// ================================================================
app.listen(port, function() {
    console.log('Server listening on port ' + port + '...');
});