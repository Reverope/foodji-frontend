// var loader = document.querySelector(".preloader");
var container = document.querySelector("#ritem");
var containerBig = document.getElementById("container");
var orderAr = [];
var url_string = window.location.href;
var url = new URL(url_string);
var restaurantCode = url.searchParams.get("id");
var placeOrderBtn = document.getElementById("placeOrder");
var createOrderURL = `https://knight-foodji.herokuapp.com/api/user/order`;
var currentAddress = document.querySelector(".currentaddress");

// Address Code
var userAddress = localStorage.getItem("foodji-user-address");
var index = parseInt(userAddress.toString().length - 2);
currentAddress["value"] = userAddress.toString().substr(1, index);

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
      // console.log(foodItem);
      //   food.childNodes[1]["attributes"]["href"]["value"] =
      //     "/" + element.name + "/" + element.id;

      // console.log(a);

      var img = food.childNodes[1].childNodes[1].childNodes[1];
      img["attributes"][0]["value"] = foodItem.imageLink;
      console.log(img)

      var name = food.childNodes[1].childNodes[3].childNodes[1].childNodes[1];
      name["innerText"] = foodItem["foodid"].name;

      var price = food.childNodes[1].childNodes[3].childNodes[1].childNodes[3];
      price["innerText"] = "Rs. "+foodItem.price;

      var foodId = food.childNodes[1].childNodes[3].childNodes[1].childNodes[5];
      foodId["innerText"] = foodItem.foodid._id;

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
    var totalAmount = document.getElementById("total");

    function totalAm() {
      var total = 0;

      for (every in orderAr) {
        var price = orderAr[every].food_price.replace("Rs. ","")
        total = total + price * orderAr[every].quantity;
        console.log(price)
      }
      return total;
    }

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
          var foodId = foodItem["childNodes"][5].innerText;
          var present = 0;

          for (var x in orderAr) {
            if (orderAr[x].food_name == foodName) {
              orderAr[x].quantity++;
              present = 1;
            }
          }

          if (present == 0) {
            orderAr.push({
              food_id: foodId,
              food_name: foodName,
              food_price: foodPrice,
              quantity: 1,
            })
          }

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

          totalAmount.innerText = "Total: ₹" + totalAm();
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

        todoListItem.forEach((_i) => {
          _i.remove();
        });

        for (var x in orderAr) {
          if (orderAr[x].quantity == 1) {
            delete orderAr[x];
          } else if (orderAr[x].food_name == foodName) {
            orderAr[x].quantity--;
          }
        }
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
        totalAmount.innerText = "Total: ₹" + totalAm();
        // var found = orderAr.find((element) => element == foodName);
      });
    });
  });

var userToken = localStorage.getItem("foodji-user-auth-header");


  placeOrderBtn.onclick = (e)=>{
    var foods = []
    var orderAddress = document.getElementById("address").value
    orderAr.forEach((item) => {
      if(item.food_id){
        foods.push({
          foodid: item.food_id,
          quantity: item.quantity
        })
      }
    })
    if(foods.length == 0){
      alert("Please add food to your cart.")
      return
    }
    var reqBody = JSON.stringify({
      restaurantId: restaurantCode,
      foods: foods,
      address: orderAddress,
      payment:{
        method: "COD",
        status:"UNPAID"
      }
    })
    var r = confirm(`You are trying to place order from Foodji. Do you want to continue?`)
    if(r == true){
      fetch(createOrderURL, {
        mode: "cors",
        method: "POST",
    
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
        body: reqBody,
        accept: "application/json",
      })
        .then((res) => res.json)
        .then((data) => {
          window.location = "userprofile.html";
  
    })
      .catch((err) => {
        console.log(err);
      });
  } 
}

