var messageBox = document.getElementById("message-box");
var input = document.getElementById("message-input");
var sendbutton = document.getElementById("send-button");

sendbutton.addEventListener("clcik", function() {
  var newMessage = document.createElement("li");
  newMessage.innerHTML = input.value;
  messageBox.appendChild(newMessage);
  messageBox.value = "";
});

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("mybutton").click();

  }
});






const themeMap = {
  dark: "light",
  light: "solar",
  solar: "dark"
};

const theme = localStorage.getItem('theme')
  || (tmp = Object.keys(themeMap)[0],
      localStorage.setItem('theme', tmp),
      tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);

function toggleTheme() {
  const current = localStorage.getItem('theme');
  const next = themeMap[current];

  bodyClass.replace(current, next);
  localStorage.setItem('theme', next);
}

document.getElementById('themeButton').onclick = toggleTheme;