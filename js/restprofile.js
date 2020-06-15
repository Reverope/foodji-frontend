var restProfileURL = "https://knight-foodji.herokuapp.com/api/restaurant/me";
var addFoodURL = "https://knight-foodji.herokuapp.com/api/food/";
var deleteFoodURL = "https://knight-foodji.herokuapp.com/api/restaurant/food/";
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
var restIdDisplay = document.getElementById("dID");

restaurantNameDisplay.innerHTML =
  '<img src="/assets/images/loading.gif" style="width:4rem">';

restaurantNameDisplay2.innerHTML =
  '<img src="/assets/images/loading.gif" style="width:4rem">';

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

    var restaurantName = restaurant["name"];
    var restaurantId = restaurant["_id"];
    var restaurantContact = restaurant["contactNos"][0];
    var restaurantEmail = restaurant["email"];
    var restaurantFoods = restaurant["foods"];
    var restaurantOrders = restaurant["orders"];
    var restaurantAddress = restaurant["address"];

    restIdDisplay.innerText = restaurantId;
    document.title = restaurantName;
    restaurantNameDisplay.innerText = restaurantName;
    restaurantNameDisplay2.innerText = restaurantName;
    restaurantAddressDisplay.innerText = restaurantAddress;
    restaurantDisplayEmail.innerText = restaurantEmail;
    restaurantDisplayContact.innerText = restaurantContact;
    var ar = [];
    ar = restaurantFoods;

    [...ar].forEach((foodItem) => {
      var food = container.cloneNode(true);

      var name = food.childNodes[1].childNodes[3].childNodes[1].childNodes[1];
      name["innerText"] = foodItem.name;

      var price = food.childNodes[1].childNodes[3].childNodes[1].childNodes[3];
      price["innerText"] = foodItem.price;
      container.after(food);
    });

    [...restaurantOrders].forEach((orderId) => {
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
  })
  .then((_) => {
    containerBig["childNodes"][1].remove();
  });

addFoodForm.onsubmit = (e) => {
  e.preventDefault();
  var foodName = document.getElementById("foodName").value;
  var foodPrice = document.getElementById("foodPrice").value;

  var reqBody = JSON.stringify({
    name: foodName,
    price: foodPrice,
  });
  console.log(reqBody);
  fetch(addFoodURL, {
    mode: "cors",
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: reqBody,
    accept: "application/json",
  })
    .then((res) => res.json)
    .then((data) => {
      // console.log(JSON.stringify(data))
      window.location = "restprofile.html";
    })
    .catch((err) => {
      console.log(err);
    });
};

// deleteFoodForm.onsubmit = (e) => {
//   e.preventDefault();
//   var deletefoodId = document.getElementById("deleteFoodId").value;
//   var reqBody = JSON.stringify({
//     foodid: deletefoodId,
//   });
//   fetch(deleteFoodURL, {
//     mode: "cors",
//     method: "DELETE",

//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//     body: reqBody,
//     accept: "application/json",
//   })
//     .then((res) => res.json)
//     .then((data) => {
//       window.location = "restprofile.html";
//       // console.log(data)
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
