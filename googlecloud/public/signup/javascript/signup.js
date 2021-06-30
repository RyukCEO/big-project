const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
var mysql = require('mysql');
const { response } = require('express');
var bodyParser = require('body-parser')



app.use(bodyParser.urlencoded({
  extended: true
}))




const useremail = document.getElementById("email").value
const userpassword = document.getElementById("password").vaule
const usereusername = document.getElementById("username").value
const userphonenumber = document.getElementById("phonenumber").value
const passwordconfirm = document.getElementById("passwordconfirm").value

app.post("/signup", async(req,res) => {
  const {username, email, password, passwordconfirm} = req.body

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(hashedPassword)

    const user = {password: hashedPassword}
    res.status(201).send()
  } catch {
    res.status(500).send()
  }

  if (email && password) {
      const userexists = user.some(
          user=> user.email === email
      )

      if (!user) {
          const user = {
              username, 
              email,
              password // hash password
          }
      } 

      user.push() //into database

      req.session.userId = user.userId

      return res.redirect('/logedin')
  }
})






  

  

  connection.query('INSERT INTO Users.Usersinformation SET ?', {username: username, useremail:useremail, password: hashedpassword}, (error, results) => {
    if ( error) {
      console.log(error)
    } else {
      console.log("worked")
    }
  })



bcrypt.hash(userpassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.

});




























