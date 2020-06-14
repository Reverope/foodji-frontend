var userLoginForm = document.getElementsByClassName("login-form")[0];
// var loginFirm = document.getElementById("login-form")[0];

userLoginForm.onsubmit = (e) => {
  e.preventDefault();
  var phone = document.getElementById("phone").value;
  var password = document.getElementById("password").value;
  //   e.preventDefault();
  // ../../api/user/login
  var body = JSON.stringify({
    phone: phone,
    password: password,
  });
  fetch("https://knight-foodji.herokuapp.com/api/user/login", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: body,
  })
    .then((res) => {
      if (!res.ok) {
        throw Error(res);
      }
      res.json();
    })
    .then((data) => {
      console.log(data);

      console.log("No error");
      localStorage.setItem("foodji-user-auth-header", "Bearer " + data.token);
      localStorage.setItem("foodji-user", data.user);
      location.reload();
    })
    .catch((err) => {
      console.log("error occured");
      document.getElementById("login-error").style.display = "block";

      console.log(err);
    });
  //   //   console.log(phone, password);
};
