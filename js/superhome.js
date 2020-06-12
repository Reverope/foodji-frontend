var getAllOrdersURL = "https://knight-foodji.herokuapp.com/api/user/super/orders?pageNo=1&size=10"
var createRestURL = "https://knight-foodji.herokuapp.com/api/restaurant"
var createDelGuyURL = "https://knight-foodji.herokuapp.com/api/deliveryGuy"
var token = localStorage.getItem('foodji-super-auth-header')

var createRestForm = document.getElementById('createRestForm')
var createDelGuyForm = document.getElementById('createDelGuyForm')

//Fetching all orders
fetch(getAllOrdersURL,{
  accept: "application/json",
  mode: "cors",
  method: "GET",
  headers:{
    Authorization : token
  }  
})
.then(response => response.json())
.then( (data) => {
    document.getElementById('orders').innerHTML = JSON.stringify(data)
})
.catch(err =>{
    console.log(err)
})


//Creating restaurant
createRestForm.onsubmit = (e)=>{
    e.preventDefault()
    var reqBody = JSON.stringify({
        restaurant :{
            rest_id: document.getElementById('rest_id').value,
            name:document.getElementById('restName').value,
            contactNos: [document.getElementById('restPhone').value],
            address: document.getElementById('restAddress').value,
            password: document.getElementById('restPassword').value,
            email: document.getElementById('restEmail').value
        }
    })
    fetch(createRestURL,{
        mode: "cors",
        method: "POST",
    
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: reqBody,
        accept: "application/json"
    })
    .then( res => res.json())
    .then(data =>{
        // console.log(JSON.stringify(data))
        window.location('superhome.html')
    })
    .catch(err =>{
        console.log(err)
    })
}

//Creating DeliveryBoy
createDelGuyForm.onsubmit = (e)=>{
    e.preventDefault()
    var reqBody = JSON.stringify({
        deliveryGuy :{
            name:document.getElementById('delguyName').value,
            username:document.getElementById('delguyUsername').value,
            phone: document.getElementById('delguyPhone').value,
            password: document.getElementById('delguyPassword').value,
            email: document.getElementById('delguyEmail').value
        }
    })
    fetch(createDelGuyURL,{
        mode: "cors",
        method: "POST",
    
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: reqBody,
        accept: "application/json"
    })
    .then( res => res.json())
    .then(data =>{
        // console.log(JSON.stringify(data))
        window.location('superhome.html')
    })
    .catch(err =>{
        console.log(err)
    })
}