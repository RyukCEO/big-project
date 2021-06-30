const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const mysql = require('mysql')


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

connection.connect(function(err){
    if(result[0].email.length > 0){  
      //Then do your task (run insert query)
      connection.query('INSERT INTO Users(email, password) VALUES("'+email+'","'+password+'")',
             [email, password]);

    }
});



connection.end();


bcrypt.compare(password, hash, function(err, result) {
    // result == true
});







