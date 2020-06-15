var url = new URL(window.location.href)
var orderId = url.searchParams.get('id')

const acceptOrder = document.getElementById('acceptOrder')
const rejectOrder = document.getElementById('rejectOrder')

// const orderId = getParameterByName('id')
var token = localStorage.getItem("foodji-rest-auth-header")
console.log(orderId)
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
var orderDisplay = document.querySelector(".tableoforder");

tablerow.appendChild(liElement);
tablerow.appendChild(liAddress);
tablerow.appendChild(liTotalPrice);
tablerow.appendChild(liAssignmentDate);
tablerow.appendChild(liContact);
tablerow.appendChild(liETA);
tablerow.appendChild(accept);
tablerow.appendChild(decline);

var acceptButton = document.createElement("button");
var declineButton = document.createElement("button");
declineButton.id = orderId;
acceptButton.id = orderId;

accept.appendChild(acceptButton);
decline.appendChild(declineButton);

acceptButton.style.margin = "0 1rem";
declineButton.style.margin = "0 1rem";
acceptButton.className = "acceptdecision template-btn template-btn2";
declineButton.className = "declinedecision template-btn template-btn2";
acceptButton.innerText = "Accept";
declineButton.innerText = "Decline";

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
