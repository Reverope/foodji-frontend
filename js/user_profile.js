var loader = document.querySelector(".preloader");
var profileImg = document.getElementsByClassName("author_img");
var profileName = document.getElementById("name");
var profileNumber = document.getElementById("about");
var orderDisplay = document.querySelector(".tableoforder");
var container = document.querySelector("#ritem");
var editFormSection = document.querySelector(".containert");
var editProfileButton = document.getElementById("edit");

var eName = document.getElementById("Name");
var eEmail = document.getElementById("Email");
var ePassword = document.getElementById("Password");
var eAddress = document.getElementById("Address");
var ePhone = document.getElementById("Phone");

var url = "https://knight-foodji.herokuapp.com/api/user/me";
var token = localStorage.getItem("foodji-user-auth-header");

editProfileButton.addEventListener("click", () => {
  editFormSection.style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
});

function remove() {
  editFormSection.style.display = "none";
  window.scrollTo(document.body.scrollHeight, 0);
}

fetch(url, {
  accept: "application/json",
  mode: "cors",
  method: "GET",

  headers: {
    Authorization: token,
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    profileName.innerHTML = data["user"].name;
    profileNumber.innerHTML = data["user"].email;

    eName["value"] = data["user"].name;
    eEmail["value"] = data["user"].email;
    ePassword["value"] = data["user"].name;
    eAddress["value"] = data["user"].address;
    ePhone["value"] = data["user"].phone;

    data.user.orders.forEach((item) => {
      var orderId = item._id;
      var tablerow = document.createElement("tr");
      var liElement = document.createElement("td");
      var liAddress = document.createElement("td");
      var liPaymentStatus = document.createElement("td");
      var liTotalPrice = document.createElement("td");
      var liAssignmentDate = document.createElement("td");
      var liContact = document.createElement("td");
      var liETA = document.createElement("td");
      var received = document.createElement("td");
      var cancel = document.createElement("td");

      tablerow.appendChild(liElement);
      tablerow.appendChild(liAddress);
      tablerow.appendChild(liTotalPrice);
      tablerow.appendChild(liAssignmentDate);
      tablerow.appendChild(liContact);
      tablerow.appendChild(liETA);
      tablerow.appendChild(received);
      tablerow.appendChild(cancel);

      var orderurl = `https://knight-foodji.herokuapp.com/api/user/order/${orderId}`;

      fetch(orderurl, {
        accept: "application/json",
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data["status"] == "RECEIVED") {
            var acceptButton = document.createElement("button");
            var declineButton = document.createElement("button");
            declineButton.id = orderId;
            acceptButton.id = orderId;
            received.appendChild(acceptButton);
            cancel.appendChild(declineButton);
            acceptButton.style.margin = "0 1rem";
            declineButton.style.margin = "0 1rem";
            acceptButton.className =
              "acceptdecision template-btn template-btn2";
            declineButton.className =
              "declinedecision template-btn template-btn2";
            acceptButton.innerText = "Received";
            declineButton.innerText = "Cancel";
          }

          if (data["status"] == "ACCEPTED") {
            var acceptButton = document.createElement("button");
            var declineButton = document.createElement("button");
            declineButton.id = orderId;
            acceptButton.id = orderId;
            received.appendChild(acceptButton);
            cancel.appendChild(declineButton);
            acceptButton.style.margin = "0 1rem";
            declineButton.style.margin = "0 1rem";
            acceptButton.className =
              "acceptdecision template-btn template-btn2";
            declineButton.className = "declinedecision template-btn-disable";
            acceptButton.innerText = "Received";
            declineButton.disabled = true;
            declineButton.innerText = "Cancel";
          }
          if (data["status"] == "REJECTED") {
            var acceptButton = document.createElement("button");
            var declineButton = document.createElement("button");
            acceptButton.disabled = true;
            declineButton.disabled = true;
            console.log(acceptButton);
            declineButton.id = orderId;
            acceptButton.id = orderId;
            received.appendChild(acceptButton);
            cancel.appendChild(declineButton);
            acceptButton.style.margin = "0 1rem";
            declineButton.style.margin = "0 1rem";
            acceptButton.className = "acceptdecision template-btn-disable";
            declineButton.className = "declinedecision template-btn-disable";
            acceptButton.innerText = "Received";
            declineButton.innerText = "Cancel";
          }
          console.log(data);
          liElement.innerText = orderId;
          liAddress.innerText = data["address"];
          liTotalPrice.innerText = data["payment"]["total"];
          liContact.innerText = data["user"]["phone"];

          var time = data["updatedAt"];
          var timing = Date(time);

          liAssignmentDate.innerText = timing.substr(0, 24);

          // Triggering event : Accept/Decline

          orderDisplay.appendChild(tablerow);

          var selectAllAcceptButtons = document.querySelectorAll(
            ".acceptdecision"
          );
          var selectAllDeclineButtons = document.querySelectorAll(
            ".declinedecision"
          );

          selectAllAcceptButtons.forEach((button) => {
            button.addEventListener("click", (clickedButton) => {
              console.log(clickedButton.target.id);
              var receivedurl =
                "https://knight-foodji.herokuapp.com/api/user/order/status/" +
                clickedButton.target.id;
              fetch(receivedurl, {
                accept: "application/json",
                mode: "cors",
                method: "POST",
                headers: {
                  Authorization: token,
                },
              }).then((response) => {
                if (response.status == 200) {
                  console.log("Accepted");
                } else {
                  console.log("Error");
                }
              });
            });
          });
          selectAllDeclineButtons.forEach((button) => {
            button.addEventListener("click", (clickedButton) => {
              console.log(clickedButton.target.id);
              var cancelurl =
                "https://knight-foodji.herokuapp.com/api/user/order/cancel/" +
                clickedButton.target.id;
              fetch(cancelurl, {
                accept: "application/json",
                mode: "cors",
                method: "POST",
                headers: {
                  Authorization: token,
                },
              }).then((response) => {
                if (response.status == 200) {
                  console.log("Rejected");
                } else {
                  console.log("Error");
                }
              });
            });
          });
        });
    });
  })
  .then((_) => {
    loader.remove();
  })
  .catch((err) => {
    console.log(err);
    PopUpLog();
  });
