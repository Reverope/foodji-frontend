window.onload = () => {
  var superLoginModal = document.getElementById("super-login-modal");
  if (!localStorage.getItem("foodji-super-auth-header")) {
    superLoginModal.style.display = "block";
  }

  var superLoginForm = document.getElementById("super-login-form");
  var superLoginURL = `https://knight-foodji.herokuapp.com/api/user/super`;
  superLoginForm.onsubmit = (e) => {
    e.preventDefault();
    var reqBody = JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    });
    console.log(reqBody);

    fetch(superLoginURL, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: reqBody,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res);
        } else {
          return res.json();
        }
      })
      .then((logData) => {
        console.log(logData);
        localStorage.setItem(
          "foodji-super-auth-header",
          "Bearer " + logData.token
        );
        //   window.location = "superadminhome.html";
        superLoginModal.style.display = "none";
      })
      .catch((error) => {
        console.log(error);
        superLoginModal.style.display = "block";
        document.getElementById("super-login-error").style.display = "block";
      });
  };
};
