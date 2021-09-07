const router = require("express").Router();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var bodyParser = require('body-parser');
var Mustache = require('mustache');
var mustacheExpress = require('mustache-express');
const crypto = require('crypto');
var forge = require('node-forge');


const User = require("../models/User")


router.post("/signup", (req, res, next) => {
    const {password, confirmpassword} = req.body
        
    const email  = req.body.email;
    const phonenumber = req.body.phonenumber;
    const username = req.body.username;
    
    //generate id for user
    const user_identity_id = crypto.randomBytes(16).toString("hex");
    console.log(user_identity_id); 
    
    //generates private and public key
    const pki = require('node-forge').pki
    var rsa = forge.pki.rsa;
    rsa.generateKeyPair({bits: 2048, workers: 1}, function(err, keypair) {
    // keypair.privateKey, keypair.publicKey
    let privateKey = forge.pki.privateKeyToPem(keypair.privateKey);
    let publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
    
    //console.log(privateKey)
    //console.log(publicKey)
    }); 
    
    
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
        return res.status(500).json({
          error:err
        });
        } else {
        const usersignup = new User ({
          username: username,
          email: email,
          password: hash,
          phonenumber: phonenumber
        });
        usersignup.save()
          .then((result) => {
            res.status(201).send()
            req.session.userId = user.userId
            return res.redirect('/logedin')
          })
          .catch((err) => {
            console.log(err);
          });
        }   
    })
});


router.post('/login', async (req, res, next) => {

  const email  = req.body.email;
  const password = req.body.password;
  const user = {
    email: req.body.email,
    password: req.body.password
  }

    User.find({ email: user.email }).exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
    bcrypt.compare(password, user[0].password, (err, result) => {
    if (err) {
      return res.status(401).json({
        message: "Auth failed"
      });
  }
  if (result) {
    console.log(req.session);
    req.session.user = user
                                 
    res.redirect('/logedin')
    return res.status(200)
  }
  res.status(401).json({
    message: "Auth failed"
  });
});
})
.catch(err => {
  console.log(err);
  res.status(500).json({
    error: err
    });
  });
});
   /*   
  
      if (password, email === null) {
          return res.status(400).send('provide email or password')
      }
  
  */
  













module.exports = router;

