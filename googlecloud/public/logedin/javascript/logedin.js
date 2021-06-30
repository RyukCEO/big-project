const express = require('express')
const app = express()
const mysql = require('mysql')
var cookie = require('cookie');
var http = require('http');
var session = require('express-session')
var bodyParser = require('body-parser')

//connecting to database
var connection = mysql.createConnection({
  host     : '35.236.60.163',
  user     : 'guest',
  password : '1234',
  database : 'Users'
});



var KeyHelper = libsignal.KeyHelper;




var registrationId = KeyHelper.generateRegistrationId() ;
// Store registrationId somewhere durable and safe.


KeyHelper.generateIdentityKeyPair().then(function(identityKeyPair) {
  // keyPair -> { pubKey: ArrayBuffer, privKey: ArrayBuffer }
  // Store identityKeyPair somewhere durable and safe.
  connection.query(
    "INSERT INTO Usersinformation (email, userspassword,phoneusernumber,username) VALUES (?,?,?,?)",
    [email, hash,phonenumber, username],
    (err, result) => {
      console.log(err);
    }
  );
});

ArrayBuffer()

KeyHelper.generatePreKey(keyId).then(function(preKey) {
  store.storePreKey(preKey.keyId, preKey.keyPair);
});

KeyHelper.generateSignedPreKey(identityKeyPair, keyId).then(function(signedPreKey) {
  store.storeSignedPreKey(signedPreKey.keyId, signedPreKey.keyPair);
});

// Register preKeys and signedPreKey with the server




//Building a session
var store   = new MySignalProtocolStore();
var address = new libsignal.SignalProtocolAddress(recipientId, deviceId);

// Instantiate a SessionBuilder for a remote recipientId + deviceId tuple.
var sessionBuilder = new libsignal.SessionBuilder(store, address);

// Process a prekey fetched from the server. Returns a promise that resolves
// once a session is created and saved in the store, or rejects if the
// identityKey differs from a previously seen identity for this address.
var promise = sessionBuilder.processPreKey({
    registrationId: Number,
    identityKey: ArrayBuffer,
    signedPreKey: {
        keyId     : Number,
        publicKey : ArrayBuffer,
        signature : ArrayBuffer
    },
    preKey: {
        keyId     : Number,
        publicKey : ArrayBuffer
    }
});

promise.then(function onsuccess() {
  // encrypt messages
});

promise.catch(function onerror(error) {
  // handle identity key conflict
});



//encrypt message
var plaintext = "Hello world";
var sessionCipher = new libsignal.SessionCipher(store, address);
sessionCipher.encrypt(plaintext).then(function(ciphertext) {
    // ciphertext -> { type: <Number>, body: <string> }
    handle(ciphertext.type, ciphertext.body);
});


// Decrypting messages
var address = new SignalProtocolAddress(recipientId, deviceId);
var sessionCipher = new SessionCipher(store, address);

// Decrypt a PreKeyWhisperMessage by first establishing a new session.
// Returns a promise that resolves when the message is decrypted or
// rejects if the identityKey differs from a previously seen identity for this
// address.
sessionCipher.decryptPreKeyWhisperMessage(ciphertext).then(function(plaintext) {
    // handle plaintext ArrayBuffer
}).catch(function(error) {
    // handle identity key conflict
});

// Decrypt a normal message using an existing session
var sessionCipher = new SessionCipher(store, address);
sessionCipher.decryptWhisperMessage(ciphertext).then(function(plaintext) {
    // handle plaintext ArrayBuffer
});









function onRequest(req, res) {
    // Parse the query string
    var query = url.parse(req.url, true, true).query;
  
    if (query && query.name) {
      // Set a new cookie with the name
      res.setHeader('Set-Cookie', cookie.serialize('name', String(query.name), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 // 1 week
      }));
  
      // Redirect back after setting cookie
      res.statusCode = 302;
      res.setHeader('Location', req.headers.referer || '/');
      res.end();
      return;
    }
  
    // Parse the cookies on the request
    var cookies = cookie.parse(req.headers.cookie || '');
  
    // Get the visitor name set in the cookie
    var name = cookies.name;
  
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  
    if (name) {
      res.write('<p>Welcome back, <b>' + escapeHtml(name) + '</b>!</p>');
    } else {
      res.write('<p>Hello, new visitor!</p>');
    }
  
    res.write('<form method="GET">');
    res.write('<input placeholder="enter your name" name="name"> <input type="submit" value="Set Name">');
    res.end('</form>');
  }
  
  http.createServer(onRequest).listen(3000);










