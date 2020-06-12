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
var orderDisplay = document.querySelector(".orderListInProfile");

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
    console.log(restaurant);

    var restaurantName = restaurant["name"];
    var restaurantId = restaurant["id"];
    var restaurantContact = restaurant["contactNos"][0];
    var restaurantEmail = restaurant["email"];
    var restaurantFoods = restaurant["foods"];
    var restaurantOrders = restaurant["orders"];
    var restaurantAddress = restaurant["address"];

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
      var liElement = document.createElement("li");
      liElement.innerText = orderId;
      orderDisplay.appendChild(liElement);
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
