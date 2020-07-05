var loginForm = document.getElementsByClassName("rest-login-form")[0];
// var loginFirm = document.getElementById("login-form")[0];

loginForm.onsubmit = (e) => {
  e.preventDefault();
  document.getElementById("restLoginBtn").innerText = "Logging In";
  var rest_id = document.getElementById("rest_id").value;
  var password = document.getElementById("rest_password").value;
  //   e.preventDefault();
  // ../../api/user/login
  var body = JSON.stringify({
    rest_id: rest_id,
    password: password,
  });
  // console.log(rest_id, password);
  // console.log(body);
  fetch("https://foodji-backend.herokuapp.com/api/restaurant/login", {
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
      localStorage.setItem("foodji-rest-auth-header", "Bearer " + data.token);
      localStorage.setItem("foodji-rest", JSON.stringify(data.restaurant));
      document.getElementById("rest-error").style.display = "none";

      window.location = "restprofile.html";
    })
    .catch((err) => {
      document.getElementById("rest-error").style.display = "block";
      document.getElementById("restLoginBtn").innerText = "Login";
    });
  //   //   console.log(phone, password);
};
