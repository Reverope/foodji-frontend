var restProfileURL = "https://foodji-backend.herokuapp.com/api/restaurant/me";
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
window.onload = () => {
  if (!token) {
    document.getElementById("pop-modal").style.display = "block";
  }
};
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
    restaurant.orders.reverse();
    restaurant.orders.forEach((orderId) => {
      var tablerow = document.createElement("tr");
      var liName = document.createElement("td");
      var liElement = document.createElement("td");
      var liAddress = document.createElement("td");
      var liPaymentStatus = document.createElement("td");
      var liTotalPrice = document.createElement("td");
      var liAssignmentDate = document.createElement("td");
      var liContact = document.createElement("td");
      var liETA = document.createElement("td");
      liETA.id = `eta${orderId}`
      var accept = document.createElement("td");
      var decline = document.createElement("td");
      var liStatus = document.createElement("td");

      tablerow.appendChild(liElement);
      tablerow.appendChild(liName);
      tablerow.appendChild(liAddress);
      tablerow.appendChild(liTotalPrice);
      tablerow.appendChild(liAssignmentDate);
      tablerow.appendChild(liContact);
      tablerow.appendChild(liETA);
      tablerow.appendChild(liStatus);


      var url = `https://foodji-backend.herokuapp.com/api/restaurant/order/${orderId}`;

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
                return;
                /*var acceptButton = document.createElement("button");
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
                declineButton.innerText = "Decline";*/
            }
            if (data["status"] == "CANCELED") 
                return;

            var orderedFoodList = data["foods"];

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
            console.log(data)
            liName.innerText = data["user"]["name"]
            liAddress.innerText = data["address"];
            liTotalPrice.innerText = data["payment"]["total"];
            liContact.innerText = data["user"]["phone"];
            liStatus.innerText = data["status"];
            liETA.innerText= data["eta"] 

            var time = data["createdAt"];
            var timing = new Date(time);

            // liAssignmentDate.innerText = timing.substr(0, 24);
            liAssignmentDate.innerText = timing.toString().substr(0, 24);

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
                var url =
                    "https://foodji-backend.herokuapp.com/api/restaurant/order/acceptreject/accept/" +
                    clickedButton.target.id;
                    console.log(document.getElementById(`eta${clickedButton.target.id}`).value)
                var reqBody = JSON.stringify({
                    eta: document.getElementById(`eta${clickedButton.target.id}`).value
                })
                console.log(reqBody)
                fetch(url, {
                    mode: "cors",
                    method: "POST",
                
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                    },
                    body: reqBody,
                    accept: "application/json",
                }).then((response) => {
                    if (response.status == 200) {
                    // location.reload()
                    console.log("Accepted");
                    } else {
                    console.log("Error");
                    // location.reload()
                    }
                });
                });
            });
            selectAllDeclineButtons.forEach((button) => {
                button.addEventListener("click", (clickedButton) => {
                console.log(clickedButton.target.id);
                var url =
                    "https://foodji-backend.herokuapp.com/api/restaurant/order/acceptreject/reject/" +
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
                    // console.log("Rejected");
                    location.reload()
                    } else {
                    // console.log("Error");
                    location.reload()
                    }
                });
                });
            });
            });
    });
  });
