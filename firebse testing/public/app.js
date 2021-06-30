const auth = firebase.auth();

const whensignedin = document.getElementById('whensignedin')
const whensignedout = document.getElementById('whensignedout')

const signinbtn = document.getElementById('signinbtn')
const signoutbtn = document.getElementById('signoutbtn')

const userdetails = document.getElementById('userdetails')

signinbtn.onclick = () => auth.
signoutbtn.onclick = () => auth.signout();

auth.onAuthStateChanged(user => {
    if (user) {
        whensignedin.hidden = false;
        whensignedout.hidden = true;
        
        window.location = 'public/logins/login2.html'; //After successful login, user will be redirected to home.html
 
    } else {
        whensignedin.hidden = true;
        whensignedout.hidden = false;
        res.render("public/logins/login2.html");
        
    }
});

var user = firebase.auth().currentUser;
var useremail, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}


function signup() {
    var username = document.getElementById("username").value;
    var useremail = document.getElementById("email").value;
    var userpassword = document.getElementById("password").value;

}

function signin() {
    var useremail = document.getElementById("email").value;
    var userpassword = document.getElementById("password").value;

    auth().signInWithEmailAndPassword(useremail, userpassword).catch(function(error) {
        var errorCode = erroer.code;
        var errorMessage = error.message;
    })
}

  






