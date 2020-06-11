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
}


ready(function () {
  var logInOutBtn = document.getElementById("logInLogOutBtn");
  var signUpProfileBtn = document.getElementById("signUpProfileBtn");
  var token = localStorage.getItem("foodji-user-auth-header");

  var loginHtml = '<a class="check" href="userlogin.html">Login</a>';
  var signUpHtml = '<a href="usersignup.html">Signup</a>';

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
});
