// <li><a id="logInOutBtn" href="userlogin.html">Login</a></li>
// <li><a id="signUpProfileBtn" href="usersignup.html">Signup</a></li>

function ready(callbackFunc) {
  if (document.readyState !== "loading") {
    // Document is already ready, call the callback directly
    callbackFunc();
  } else if (document.addEventListener) {
    // All modern browsers to register DOMContentLoaded
    document.addEventListener("DOMContentLoaded", callbackFunc);
  } else {
    // Old IE browsers
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState === "complete") {
        callbackFunc();
      }
    });
  }
}

function logOut() {
  localStorage.removeItem("foodji-user-auth-header");
}

var loginModal = document.getElementById("login-modal");

function logIn() {
  if (loginModal) loginModal.style.display = "block";
}
var signUpModal = document.getElementById("register-modal");
function singUp() {
  if (signUpModal) signUpModal.style.display = "block";
}

function PopUpLog(str) {
  if (signUpModal && loginModal) {
    signUpModal.style.display = "none";
    loginModal.style.display = "block";
    if (str) document.getElementById("login-para").innerHTML = str;
  }
}

function PopUpSign() {
  if (signUpModal && loginModal) {
    console.log("opening signUp modal");
    signUpModal.style.display = "block";
    loginModal.style.display = "none";
    if (str) document.getElementById("register-para").innerHTML = str;
  }
}

ready(function () {
  var logInOutBtn = document.getElementById("logInLogOutBtn");
  var signUpProfileBtn = document.getElementById("signUpProfileBtn");
  var token = localStorage.getItem("foodji-user-auth-header");

  var loginHtml = '<a class="check" onclick="logIn()" href="#">Login</a>';
  var signUpHtml = '<a onclick="singUp()" href="#">Signup</a>';

  var logoutHtml = '<a href="index.html" onclick="logOut()">LogOut</a>';
  var profileLinkHtml = '<a href="userprofile.html">Profile</a>';

  if (!token) {
    console.log("Token does not exist");
    logInOutBtn.innerHTML = loginHtml;
    signUpProfileBtn.innerHTML = signUpHtml;
  } else {
    logInOutBtn.innerHTML = logoutHtml;
    signUpProfileBtn.innerHTML = profileLinkHtml;
  }

  var span = document.getElementsByClassName("login-close")[0];
  span.onclick = function () {
    loginModal.style.display = "none";
  };
  var span2 = document.getElementsByClassName("register-close")[0];
  span2.onclick = function () {
    signUpModal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
    } else if (event.target == signUpModal) {
      signUpModal.style.display = "none";
    }
  };
});
