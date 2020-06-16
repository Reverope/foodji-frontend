var restProfileURL = "https://knight-foodji.herokuapp.com/api/restaurant/me";
var token = localStorage.getItem("foodji-rest-auth-header");

// Selectors
var restaurantNameDisplay = document.getElementById("dName");
var restaurantNameDisplay2 = document.getElementById("dName2");
var restaurantAddressDisplay = document.getElementById("dAdd");
var restaurantDisplayEmail = document.getElementById("dEmail");
var restaurantDisplayContact = document.getElementById("dContact");
var container = document.querySelector("#ritem");
var containerBig = document.getElementById("foodlistingbox");
var addFoodForm = document.getElementById("addFoodForm");
var orderDisplay = document.querySelector(".tableoforder");

fetch(restProfileURL, {
  accept: "application/json",
  mode: "cors",
  method: "GET",

  headers: {
    Authorization: token,
  },
})
  .then((response) => response.json())
  .then((restaurant) => {
    console.log(restaurant);
    restaurant.orders.forEach((orderId) => {
      var tablerow = document.createElement("tr");
      var liElement = document.createElement("td");
      var liAddress = document.createElement("td");
      var liPaymentStatus = document.createElement("td");
      var liTotalPrice = document.createElement("td");
      var liAssignmentDate = document.createElement("td");
      var liContact = document.createElement("td");
      var liETA = document.createElement("input");
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

      var url = `https://knight-foodji.herokuapp.com/api/restaurant/order/${orderId}`;

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
            acceptButton.innerText = "Accept";
            declineButton.innerText = "Decline";
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
            acceptButton.innerText = "ACCEPTED";
            declineButton.disabled = true;
            declineButton.innerText = "Decline";
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
            acceptButton.innerText = "Accept";
            declineButton.innerText = "Rejected";
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
            acceptButton.innerText = "Accept";
            declineButton.innerText = "Reject";
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
                "https://knight-foodji.herokuapp.com/api/restaurant/order/acceptreject/accept/" +
                clickedButton.target.id;
              fetch(url, {
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
              var url =
                "https://knight-foodji.herokuapp.com/api/restaurant/order/acceptreject/reject/" +
                clickedButton.target.id;
              fetch(url, {
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
  });
