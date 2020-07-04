var restProfileURL = "https://knight-foodji.herokuapp.com/api/restaurant/me";
var addFoodURL = "https://knight-foodji.herokuapp.com/api/food/";
var addFoodURLlocal = "http://localhost:5000/api/food/"
var deleteFoodURL = "https://knight-foodji.herokuapp.com/api/restaurant/food/";
var token = localStorage.getItem("foodji-rest-auth-header");

// Selectors
var restaurantNameDisplay = document.getElementById("dName");
var restaurantNameDisplay2 = document.getElementById("dName2");
var restaurantAddressDisplay = document.getElementById("dAdd");
var restaurantDisplayEmail = document.getElementById("dEmail");
var restaurantDisplayContact = document.getElementById("dContact");
var restaurantDeleteButton = document.getElementById("deleteorderfood");
var addFoodBtn = document.getElementById("addFoodBtn")

var container = document.querySelector("#ritem");
var containerBig = document.getElementById("foodlistingbox");
var orderDisplay = document.querySelector(".tableoforder");

var editFormSection = document.querySelector(".containert");
var editProfileButton = document.getElementById("edit");
var editProfileForm = document.getElementById('editprofileform')

var eName = document.getElementById("Name");
var eEmail = document.getElementById("Email");

var eAddress = document.getElementById("Address");
var ePhone = document.getElementById("Phone");
// var restIdDisplay = document.getElementById("dID");

editProfileButton.addEventListener("click", () => {
  editFormSection.style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
});

function remove() {
  editFormSection.style.display = "none";
  window.scrollTo(document.body.scrollHeight, 0);
}




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

    // restIdDisplay.innerText = restaurantId;
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

      var imageLink = food.childNodes[1].childNodes[1].childNodes[1];
      imageLink.setAttribute("src", foodItem.imageLink)

      var name = food.childNodes[1].childNodes[3].childNodes[1].childNodes[1];
      name["innerText"] = foodItem.name;

      var onclicktext = food.childNodes[1].childNodes[3].childNodes[5];
  
      onclicktext.id = foodItem.foodid;

      var price = food.childNodes[1].childNodes[3].childNodes[1].childNodes[3];
      price["innerText"] = foodItem.price;
      container.after(food);
    });
  })
  .then((_) => {
    containerBig["childNodes"][1].remove();
  })
  .then(() => {
    var deleteButtonArray = document.querySelectorAll(".deleteorderfood");
    deleteButtonArray.forEach((dbtn) => {
      dbtn.addEventListener("click", (e) => {
        var id = e.target["id"];
        deletefooditemthroughapi(id);
      
      });
    });
  });


var addFoodForm = document.getElementById("addFoodForm");
addFoodForm.onsubmit = (e) => {
  e.preventDefault();
  addFoodBtn.innerText = "Please Wait"

  var formdata = new FormData(addFoodForm)

  fetch(addFoodURL, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formdata,
    accept: "application/json"
  })

    .then((res) => res.json)
    .then((data) => {
      alert("Food added successfully")
      window.location = "restprofile.html";
    })
    .catch((err) => {
      alert("Unable to add food")
      window.location = "restprofile.html";
    });
};

function deletefooditemthroughapi(fid) {
  var reqBody = JSON.stringify({
    foodid: fid,
  });
  fetch(deleteFoodURL, {
    mode: "cors",
    method: "DELETE",

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: reqBody,
    accept: "application/json",
  })
    .then((res) => res.json)
    .then((data) => {
      window.location = "restprofile.html";

    })
    .catch((err) => {
      alert("Unable to delete food")
      location.reload()
    });
}


var editProfileURL = `https://knight-foodji.herokuapp.com/api/restaurant`

  editProfileForm.onsubmit = (e)=>{
    e.preventDefault()
    var reqBody = JSON.stringify({
      name: eName.value,
      email:eEmail.value,
      contactNos:[ePhone.value],
      address:eAddress.value
    }) 

    fetch(editProfileURL,{
      mode: "cors",
      method: "PATCH",
  
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: reqBody,
      accept: "application/json"
    })
    .then(res => {
      if(res.status == 200){
        alert("Profile Updated Successfully")
        location.reload()
      } else{
        alert("Please try again.")
        location.reload()
      }
    })
  }