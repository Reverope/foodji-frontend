var loginForm = document.getElementsByClassName("guy-login-form")[0];
// var loginFirm = document.getElementById("login-form")[0];

loginForm.onsubmit = (e) => {
  e.preventDefault();
  var username = document.getElementById("guy_username").value;
  var password = document.getElementById("guy_password").value;
  //   e.preventDefault();
  // ../../api/user/login
  var body = JSON.stringify({
    username: username,
    password: password,
  });
  // console.log(rest_id, password);
  // console.log(body);
  document.getElementById("delLoginBtn").innerHTML = "Loging In";
  document.getElementById("delLoginBtn").disabled = true;
  fetch("https://knight-foodji.herokuapp.com/api/deliveryguy/login", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: body,
  })
    .then((res) => {
      if (!res.ok) {
        throw Error(res);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      localStorage.setItem("foodji-guy-auth-header", "Bearer " + data.token);
      localStorage.setItem("foodji-guy", JSON.stringify(data.deliveryGuy));
      document.getElementById("guy-error").style.display = "none";
      document.getElementById("delLoginBtn").innerHTML = "Log In";
      document.getElementById("delLoginBtn").disabled = false;
      window.location = "delguyprofile.html";
    })
    .catch((err) => {
      document.getElementById("guy-modal").style.display = "block";
      document.getElementById("guy-error").style.display = "block";

      document.getElementById("delLoginBtn").innerHTML = "Log In";
      document.getElementById("delLoginBtn").disabled = false;
    });
  //   //   console.log(phone, password);
};
