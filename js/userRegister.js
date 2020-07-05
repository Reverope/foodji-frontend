console.log("connected");
var registerForm = document.getElementsByClassName("register-form")[0];

registerForm.onsubmit = (e) => {
  e.preventDefault();
  var name = document.getElementById("register-name").value;
  var phone = document.getElementById("register-phone").value;
  var email = document.getElementById("register-email").value;
  var password = document.getElementById("register-password").value;
  var address = document.getElementById("register-address").value;
  console.log(name, phone, email, password, address);
  //   e.preventDefault();
  // ../../api/user/login
  var body = JSON.stringify({
    name: name,
    phone: phone,
    email: email,
    password: password,
    address: address,
  });
  fetch("https://foodji-backend.herokuapp.com/api/user/", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: body,
    accept: "application/json",
  })
    .then((res) => {
      if (!res.ok) {
        throw Error(res);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      localStorage.setItem("foodji-user-auth-header", "Bearer " + data.token);
      localStorage.setItem("foodji-user", data.user);
      document.getElementById("register-error").style.display = "none";

      location.reload();
    })
    .catch((err) => {
      document.getElementById("register-error").style.display = "block";
    });
  //   //   console.log(phone, password);
};
