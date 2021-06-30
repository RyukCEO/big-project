const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const session = require('express-session');
const crypto = require('crypto');
var bodyParser = require('body-parser');
var request = require('request');
var cookie = require('cookie');
const { MemoryStore } = require('express-session');
var cookiejar = require('cookiejar');
const jsTokens = require("js-tokens");
var MySQLStore = require('express-mysql-session')(session);
var toArrayBuffer = require('to-arraybuffer');
var Promise = require('promise');
var WebSocketfaye = require('faye-websocket');
var Extensions = require('websocket-extensions');
const WebSocket = require('ws');
//const Signal = require('libsignal-service');
var forge = require('node-forge');
const fs = require('fs-extra')
const fetch = require('node-fetch');
const cassandra = require('cassandra-driver');
var cookieParser = require('cookie-parser')
const dotenv = require('dotenv')




websocket = require('websocket-driver');



const app = express()

//dotenv.config({ path: "./"})

/*http = require('http');
var server = http.createServer();
*/
app.use(express.json());
app.set('view engine', 'ejs')
app.use(cookieParser());




//mysql session database
var sessionoptions = {
	host: '35.236.60.163',
	port: 3306,
	user: 'guest',
	password: '1234',
	database: 'Users',
  schema: {
		tableName: 'sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	}

};

var sessionStore = new MySQLStore(sessionoptions);

//connecting to database
var connection = mysql.createConnection({
    host     : '35.236.60.163',
    user     : 'guest',
    password : '1234',
    database : 'Users'
});



app.use(express.static(__dirname + '/public'));

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    resave: false,
    saveUninitialized: true,
    name: 'sid',
    secret: 'some secret',
    store: sessionStore,
    cookie: {
        maxage: 99 * 99,
        samesite: false,
        secure: false,
        httpOnly: true
    }
}))

//remove in production 
app.use((req, res, next) => {
  if (req.cookies.sid && !req.session.user) {
    res.clearCookie("sid");
  }
  next();
});


app.get("/profile/:userid",function(req,res,next){
  var id = req.params.userid;

  var getUserDetails= userModel.find({_id:id},{'email':1,'profileImage':1});

  getUserDetails.exec()
  .then(data=>{
      res.status(200).json({
          message:"OK",
          results:data
      });
  })
  .catch(err=>{
      res.json(err);
  })

  res.render('', {
    username: username,
    avatar:  avatar
  })
});


app.get('/setting', (req,res) => {
  res.sendFile(__dirname + '/public/setting/setting.html')
})

app.get('/logedin', (req,res) => {
  if (!req.session || !req.sessionID || !req.session.user || !req.cookies.sid) {
      const err = new Error("unatuh");
      err.statusCode = 401;
      res.redirect('/login')
  } else {
    res.sendFile(__dirname + '/public/logedin/logedin.html')
  };

console.log(req.sessionID)
  
//const username = "req.session.email"
//document.getElementById('dropdownusername').innerHTML = username.value;

/*
res.render('index', { dropdownusername: req.user.username });
  const userspost = [{
    comment: "",
    date: new Date()
  }]
  /*
  const username = [{
    username: "poop"
  }]
*/
});


app.get("/group/:groupid", (req,res) => {

  res.sendFile(__dirname + '/public/group/group.html')

  

});


app.get("/message/:userid", (req,res) => {

  res.sendFile(__dirname + '/public/message/message.html')


});


app.get("/login", (req,res) => {
/*
  if (req.session || req.session.cookie) {
    res.redirect('/logedin')
  } else {
    res.sendFile(__dirname + '/public/login/login.html')
}
*/    
    

    console.log(req.sessionID)

    res.sendFile(__dirname + '/public/login/login.html')

});



app.get("/signup", (req,res) => {

    res.sendFile(__dirname + '/public/signup/signup.html')

});

app.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.sid) {
    res.clearCookie("sid");
    res.redirect("/login");
  } else {
    res.redirect("/login");
  }
});




app.post('/logout', (req,res)  => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/logedin')
    } else {
    if (req.session.user && req.cookies.sid) {
    res.clearCookie("sid");
    res.redirect("/login");
    } else {
    res.redirect("/login");
      }
    }
  })
})



app.post("/signup", (req,res) => {
const {password, confirmpassword} = req.body
    
  if (password === confirmpassword) {
    try {
    const email  = req.body.username;
    const password = req.body.password;
    const phonenumber = req.body.phonenumber;
    const username = req.body.username;


    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
    console.log(hash)
      if (err) {
        console.log(err);
      } 
    });
        
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

    console.log(keypair)
    console.log(privateKey)
    console.log(publicKey)
    }); 

    connection.query(
    "INSERT INTO Usersinformation (email, userspassword,phoneusernumber,username, userid) VALUES (?,?,?,?,?)",
    email, hash, phonenumber, username, user_identity_id,
    (err, result) => {
    console.log(err);
      }
    );

    res.status(201).send()
    req.session.userId = user.userId
    return res.redirect('/logedin')
    } catch {
      res.status(500).send()
    }
 }
})


    
app.post('/login', (req,res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }

  try {
    connection.query("SELECT * FROM Usersinformation WHERE email = ?;",
    user.email,
    (err, result) => {
  if (err) {
    res.send({ err: err });
}
        
  if (result.length > 0) {
   bcrypt.compare(user.password, result[0].userspassword, (error, response) => {
  if (response) {
   console.log(req.session);
      req.session.user = user
                                 
      res.redirect('/logedin')

 } else {
     console.log("Wrong username/password combination!");
}
});
    } else {
      console.log("User doesn't exist");
         }
   }
 );
   } catch {
   res.status(500).send()
    }
    
 /*   

    if (password, email === null) {
        return res.status(400).send('provide email or password')
    }

*/
    
})
 
//message protocal

/*
app.post('/send', receiveKeys);
app.post('/get', sendKeys);
app.post('/send/message', storeIncomingMessage);
app.post('/get/message', forwardMessageToClient);
*/
//receiveKeys - get keys (initial key packet and preKeys) from client. 
//Initial/Registration Packet:
/*
request.body = {
	type: 'init',
	deviceId: int,
	registrationId: int,
	identityKey: str,
	signedPreKey: {
		id: int,
		key: str,
		signature: str
}, preKeys: [
  {
    id: int,
    key: str
  },
  {
    id: int,
    key: str
  },
  ]
}

//Pre Keys Packet:
request.body = {
	type: 'pre-keys',
	deviceId: int,
	registrationId: int,
	preKeys: [
		{
			id: int,
			key: str
		},
		{
			id: int,
			key: str
		},
	]
}
*/

/*
var storageMap = {};
var messageStorageMap = {};

function receiveKeys(req, res){
	let reqObj = req.body;
	//console.log(req.body);
	let storageKey = reqObj.registrationId.toString() + reqObj.deviceId.toString();
	if(storageMap[storageKey]){
		res.json({err: 'Init packet for this user already exists'});
	} else {
		storageMap[storageKey] = reqObj;
		res.json({msg: 'Initial packet successfully saved'});
	}
	console.log('\n');
	console.log('storageMap~~~~~~~');
	console.log(storageMap);
}

function sendKeys(req, res){
	let reqObj = req.body;
	let storageKey = reqObj.registrationId.toString() + reqObj.deviceId.toString();
	let responseObject;
	if(storageMap[storageKey]){ 
		if(storageMap[storageKey].preKeys.length !== 0){
			responseObject = JSON.parse(JSON.stringify(storageMap[storageKey]));
			responseObject.preKey = responseObject.preKeys[responseObject.preKeys.length - 1];
			storageMap[storageKey].preKeys.pop();
		} else {
			responseObject = {err: 'Out of preKeys for this user'}
		}
	} else {
		responseObject = {
			err: 'Keys for ' + storageKey + ' user does not exist'
		}
	}
	console.log(responseObject);
	res.json(responseObject);
}

function storeIncomingMessage(req, res) {
	let reqObj = req.body;
	let messageStorageKey = reqObj.messageTo.registrationId.toString() + reqObj.messageTo.deviceId.toString() + reqObj.messageFrom.registrationId.toString() + reqObj.messageFrom.deviceId.toString();
	if(messageStorageMap[messageStorageKey]) {
		res.json({err: 'Can only deal with one message'});
	} else {
		messageStorageMap[messageStorageKey] = reqObj;
		res.json({msg: 'Message successfully saved'});
	}
	console.log('\n');
	console.log('~~~~~~~messageStorageMap~~~~~~~');
	console.log(messageStorageMap);
}

function forwardMessageToClient(req, res) {
	let reqObj = req.body;
	let messageStorageKey = reqObj.messageTo.registrationId.toString() + reqObj.messageTo.deviceId.toString() + reqObj.messageFromUniqueId;
	let responseObject;
	if(messageStorageMap[messageStorageKey]){
		if(storageMap[reqObj.messageFromUniqueId]){
			responseObject = messageStorageMap[messageStorageKey];
			responseObject.messageFrom = {
				registrationId: storageMap[reqObj.messageFromUniqueId].registrationId,
				deviceId: storageMap[reqObj.messageFromUniqueId].deviceId
			};
		} else {
			{ err: 'Client: ' + reqObj.messageFromUniqueId + ' is not registered on this server.' }
		}
	} else {
		responseObject = { err: 'Message from: ' + reqObj.messageFromUniqueId + ' to: ' + reqObj.messageTo.registrationId.toString() + reqObj.messageTo.deviceId.toString() + ' does not exist' };
	}
	res.json(responseObject);
}
*/








const port = process.env.port || 8080;
app.listen(port);