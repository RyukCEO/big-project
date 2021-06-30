const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
var mysql = require('mysql')

//hashing passwords
const saltRounds = 10;


const email = document.getElementById("email")
const password = document.getElementById("password").vaule

//connecting to database
var connection = mysql.createConnection({
    host     : '35.236.60.163',
    user     : 'guest',
    password : '1234',
    database : 'quaxdatabase'
  });


bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
connection.connect();

connection.query('SELECT Users INSERT password', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();

});




























