const express = require('express')
const app = express()
const bcrypt = require('bcrypt');

//hashing passwords
const saltRounds = 10;


app.use(express.static(__dirname + '/public')); 