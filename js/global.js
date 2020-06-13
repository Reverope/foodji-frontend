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
  localStorage.removeItem("foodji-user");
  localStorage.removeItem("foodji-rest-auth-header");
  localStorage.removeItem("foodji-rest");
  localStorage.removeItem("foodji-guy-auth-header");
  localStorage.removeItem("foodji-guy");
}

var loginModal = document.getElementById("login-modal");
var signUpModal = document.getElementById("register-modal");
var restLogInModal = document.getElementById("rest-modal");
var guyLogInModal = document.getElementById("guy-modal");

function logIn() {
  if (loginModal) loginModal.style.display = "block";
}
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

function logRest() {
  if (restLogInModal) restLogInModal.style.display = "block";
}

function logGuy() {
  if (guyLogInModal) guyLogInModal.style.display = "block";
}

ready(function () {
  var logInOutBtn = document.getElementById("logInLogOutBtn");
  var signUpProfileBtn = document.getElementById("signUpProfileBtn");
  var token = localStorage.getItem("foodji-user-auth-header");

  var restToken = localStorage.getItem("foodji-rest-auth-header");
  var guyToken = localStorage.getItem("foodji-guy-auth-header");

  var loginHtml = '<a class="check" onclick="logIn()" href="#">Login</a>';
  var signUpHtml = '<a onclick="singUp()" href="#">Signup</a>';

  var logoutHtml = '<a href="index.html" onclick="logOut()">LogOut</a>';
  var profileLinkHtml = '<a href="userprofile.html">Profile</a>';

  if (!token && !restToken && !guyToken) {
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
  var span3 = document.getElementById("rest-close");
  span3.onclick = function () {
    restLogInModal.style.diplay = "none";
  };
  var span4 = document.getElementById("guy-close");
  span3.onclick = function () {
    guyLogInModal.style.diplay = "none";
  };
  window.onclick = function (event) {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
    } else if (event.target == signUpModal) {
      signUpModal.style.display = "none";
    } else if (event.target == restLogInModal) {
      restLogInModal.style.display = "none";
    } else if (event.target == guyLogInModal) {
      guyLogInModal.style.display = "none";
    }
  };
});
