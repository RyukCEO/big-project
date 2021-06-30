

(function() {const auth = firebase.auth()

auth.signInWithEmailandPassword(useremail, userpassword);

const loginbtn = document.getElementById('loginbtn')
loginbtn.void(0)

loginbtn.addEventListener('click' , e => {
    const useremail = document.getElementById("email").value
    const userpassword = document.getElementById("password").value
})

const useremail = document.getElementById("email").value
const userpassword = document.getElementById("password").value


firebase.auth().signInWithEmailAndPassword(useremail, userpassword).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    
  });

  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      window.location = 'logedin.html'; 
    } else {

    }
  });
})

