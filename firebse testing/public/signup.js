const auth = firebase.auth()



const username = document.getElementById("username").value
const email = document.getElementById("email").value
const password = document.getElementById("password").value



function signup() {
    auth.createUserWithEmailAndPassword(email, password)
}

firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });