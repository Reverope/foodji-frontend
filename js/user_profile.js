var loader = document.querySelector(".preloader");
var profileImg = document.getElementsByClassName("author_img");
var profileName = document.getElementById("name");
var profileNumber = document.getElementById("about");
var orderDisplay = document.querySelector(".tableoforder");
var container = document.querySelector("#ritem");

var url = "https://knight-foodji.herokuapp.com/api/user/me";

var token = localStorage.getItem("foodji-user-auth-header");

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
    data.user.orders.forEach((ord) => {
      var orderId = ord._id
      var tablerow = document.createElement("tr");
      var liElement = document.createElement("td");
      var liAddress = document.createElement("td");
      var liPaymentStatus = document.createElement("td");
      var liTotalPrice = document.createElement("td");
      var liAssignmentDate = document.createElement("td");
      var liContact = document.createElement("td");
      var liETA = document.createElement("td");
      var accept = document.createElement("td");
      var decline = document.createElement("td");
      var liStatus = document.createElement("td");

      tablerow.appendChild(liElement);
      tablerow.appendChild(liAddress);
      tablerow.appendChild(liTotalPrice);
      tablerow.appendChild(liAssignmentDate);
      tablerow.appendChild(liContact);
      tablerow.appendChild(liETA);
      tablerow.appendChild(liStatus);
      tablerow.appendChild(accept);
      tablerow.appendChild(decline);

      var url = `https://knight-foodji.herokuapp.com/api/user/order/${orderId}`;

      fetch(url, {
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
            accept.appendChild(acceptButton);
            decline.appendChild(declineButton);
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
            // acceptButton.id = orderId;
            accept.appendChild(acceptButton);
            decline.appendChild(declineButton);
            acceptButton.style.margin = "0 1rem";
            declineButton.style.margin = "0 1rem";
            acceptButton.className = "acceptdecision template-btn disable";
            declineButton.className = "declinedecision template-btn-disable";
            acceptButton.disabled = true;
            acceptButton.innerText = "Received";
            declineButton.disabled = true;
            declineButton.innerText = "Cancel";
          }
          if (data["status"] == "REJECTED") {
            var acceptButton = document.createElement("button");
            var declineButton = document.createElement("button");
            acceptButton.disabled = true;
            declineButton.disabled = true;

            declineButton.id = orderId;
            acceptButton.id = orderId;
            accept.appendChild(acceptButton);
            decline.appendChild(declineButton);
            acceptButton.style.margin = "0 1rem";
            declineButton.style.margin = "0 1rem";
            acceptButton.className = "acceptdecision template-btn-disable";
            declineButton.className = "declinedecision template-btn-disable";
            acceptButton.innerText = "Received";
            declineButton.innerText = "Cancel";
          }
          if (data["status"] == "CANCELED") {
            var acceptButton = document.createElement("button");
            var declineButton = document.createElement("button");
            acceptButton.disabled = true;
            declineButton.disabled = true;

            declineButton.id = orderId;
            acceptButton.id = orderId;
            accept.appendChild(acceptButton);
            decline.appendChild(declineButton);
            acceptButton.style.margin = "0 1rem";
            declineButton.style.margin = "0 1rem";
            acceptButton.className = "acceptdecision template-btn-disable";
            declineButton.className = "declinedecision template-btn-disable";
            acceptButton.innerText = "Received";
            declineButton.innerText = "Cancel";
          }

          var orderedFoodList = data["foods"];
          console.log(orderedFoodList);

          [...orderedFoodList].forEach((food) => {
            liElement.innerHTML +=
              "<li><p>" +
              food["name"] +
              "(x" +
              food["quantity"] +
              ")  <br> ₹" +
              food["price"] +
              "</p>" +
              "</li>";
          });

          // liElement.innerText = orderId;
          liAddress.innerText = data["address"];
          liTotalPrice.innerText = data["payment"]["total"];
          liContact.innerText = data["user"]["phone"];
          liStatus.innerText = data["status"];
          liETA.innerText = `30 minutes`

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
              var url =
                "https://knight-foodji.herokuapp.com/api/user/order/status/" +
                clickedButton.target.id;
              fetch(url, {
                accept: "application/json",
                mode: "cors",
                method: "PATCH",
                headers: {
                  Authorization: token,
                },
              }).then((response) => {
                if (response.status == 200) {
                  console.log("Received");
                } else {
                  console.log("Error");
                }
              });
            });
          });
          selectAllDeclineButtons.forEach((button) => {
            button.addEventListener("click", (clickedButton) => {
              console.log(clickedButton.target.id);
              var url =
                "https://knight-foodji.herokuapp.com/api/user/order/cancel/" +
                clickedButton.target.id;
              fetch(url, {
                accept: "application/json",
                mode: "cors",
                method: "PATCH",
                headers: {
                  Authorization: token,
                },
              }).then((response) => {
                if (response.status == 200) {
                  console.log("Canceled");
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
    console.log(err)
    PopUpLog();
  })
