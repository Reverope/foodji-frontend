var restProfileURL = "https://knight-foodji.herokuapp.com/api/restaurant/me"
var addFoodURL = "https://knight-foodji.herokuapp.com/api/food/"
var deleteFoodURL = "https://knight-foodji.herokuapp.com/api/restaurant/food/"
var token = localStorage.getItem("foodji-rest-auth-header")

var addFoodForm = document.getElementById('addFoodForm')
var deleteFoodForm = document.getElementById("deleteFood")

fetch(restProfileURL,{
    accept: "application/json",
    mode: "cors",
    method: "GET",
  
    headers: {
      Authorization: token
    }
})
.then(response => response.json())
.then((restaurant)=> {
    console.log(restaurant)
    document.getElementById('restDetails').innerHTML = `Restaurant name: ${restaurant.name} <br><br> Foods Available: ${JSON.stringify(restaurant.foods)}.
    <br><br> Address: ${restaurant.address}.<br><br> Orders: ${JSON.stringify(restaurant.orders)}`
})


addFoodForm.onsubmit = (e) =>{
    e.preventDefault();
    var foodName = document.getElementById("foodName").value;
    var foodPrice = document.getElementById("foodPrice").value;

    var reqBody = JSON.stringify({
      name: foodName,
      price: foodPrice
    });
    console.log(reqBody)
    fetch(addFoodURL,{
        mode: "cors",
        method: "POST",
      
        headers: {
          "Content-Type": "application/json" ,
          Authorization: token
        },
        body: reqBody,
        accept: "application/json"
    })
    .then(res => res.json)
    .then((data)=>{
        // console.log(JSON.stringify(data))
        window.location = "restprofile.html"
    })
    .catch(err => {
        console.log(err)
    })
}

deleteFoodForm.onsubmit = (e)=>{
    e.preventDefault();
    var deletefoodId = document.getElementById("deleteFoodId").value;
    var reqBody = JSON.stringify({
        foodid: deletefoodId
      });
    fetch(deleteFoodURL,{
    mode: "cors",
    method: "DELETE",
    
    headers: {
        "Content-Type": "application/json" ,
        Authorization: token
    },
    body: reqBody,
    accept: "application/json"
})
.then(res => res.json)
.then((data)=>{
    window.location = "restprofile.html"
    // console.log(data)
})
.catch(err => {
    console.log(err)
})
}