// var loader = document.querySelector(".preloader");
var container = document.querySelector("#ritem");
var containerBig = document.getElementById("container");
var orderAr = [];
// var restaurantId = document.getElementById("restaurantId").innerText;
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var restaurantId = getParameterByName("id");
// console.log(restId)
var url = "https://knight-foodji.herokuapp.com/api/restaurant/" + restaurantId;

fetch(url, {
  accept: "application/json",
  mode: "cors",
  method: "GET",
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var ar = [];
    ar = data;

    [...ar["restaurant"].foods].forEach((foodItem) => {
      var food = container.cloneNode(true);
      console.log(foodItem);
      //   food.childNodes[1]["attributes"]["href"]["value"] =
      //     "/" + element.name + "/" + element.id;

      // console.log(a);

      //   var img = food.childNodes[1].childNodes[1].childNodes[1].childNodes[1];
      //   img["attributes"][0]["value"] = element.image;

      var name = food.childNodes[1].childNodes[3].childNodes[1].childNodes[1];
      name["innerText"] = foodItem["foodid"].name;

      var price = food.childNodes[1].childNodes[3].childNodes[1].childNodes[3];
      price["innerText"] = foodItem.price;

      //   var address =
      //     food.childNodes[1].childNodes[1].childNodes[3].childNodes[3];
      //   address["innerText"] = element.address;

      container.after(food);
      // containerBig.removeChild(containerBig.firstChild);
    });
  })
  .then((_) => {
    // loader.remove();
    containerBig.removeChild(containerBig.childNodes[1]);
  })
  .then(() => {
    const todoButton = document.querySelectorAll(".orderfoodbutton");
    const deleteButton = document.querySelectorAll(".deleteorderfood");

    [...todoButton].forEach((button) =>
      button.addEventListener("click", (item) => {
        //
        if (!localStorage.getItem("foodji-user-auth-header")) {
          PopUpLog("You need to be authenticated to do this");
        } else {
          const todoList = document.querySelector(".todo-list");
          const todoListItem = document.querySelectorAll(".order-item");
          todoListItem.forEach((_i) => {
            _i.remove();
          });
          //
          var foodItemClicked = item.composedPath()[1];
          var foodItem = foodItemClicked["childNodes"][1];
          var foodName = foodItem["childNodes"][1].innerText;
          var foodPrice = foodItem["childNodes"][3].innerText;

          orderAr.push({
            food_name: foodName,
            food_price: foodPrice,
            quantity: 1,
          });

          console.log(orderAr.length);
          orderAr.forEach((orderItem) => {
            var foodItemInList = document.createElement("li");
            foodItemInList.className = "order-item";

            var foodItemPriceInlist = document.createElement("span");
            foodItemPriceInlist.className = "pr";

            foodItemInList.innerText = orderItem.food_name;

            var priceandquan =
              orderItem.food_price + " ( x" + orderItem.quantity + " )";

            foodItemPriceInlist.innerText = priceandquan;

            foodItemInList.appendChild(foodItemPriceInlist);

            todoList.appendChild(foodItemInList);
          });
        }
      })
    );

    [...deleteButton].forEach((button) => {
      button.addEventListener("click", (item) => {
        const todoList = document.querySelector(".todo-list");
        const todoListItem = document.querySelectorAll(".order-item");
        var foodItemClicked = item.composedPath()[2];

        var foodItem = foodItemClicked["childNodes"];
        var foodName = foodItem[1]["childNodes"][1].innerText;

        // var found = orderAr.find((element) => element == foodName);
      });
    });
  });
{
}
