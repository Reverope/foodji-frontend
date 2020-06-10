//Function to get data from query string
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

const acceptOrder = document.getElementById('acceptOrder')
const rejectOrder = document.getElementById('rejectOrder')

const orderId = getParameterByName('id')
var token = localStorage.getItem("foodji-rest-auth-header")
console.log(orderId)
var url = `https://knight-foodji.herokuapp.com/api/restaurant/order/${orderId}`
console.log(url)
fetch(url,{
    accept: "application/json",
    mode: "cors",
    method: "GET",
    headers: {
        Authorization: token,
      }
})
.then(response => response.json())
.then( data => {

    console.log(data)
    document.getElementById('orderDetails').innerHTML = `Order ID: ${data._id}. Ordered By ${data.user.name}.Delivery Address: ${data.address}`
    
})

.catch((error)=>{
    console.log(error)
})

acceptOrder.onclick((e)=>{
    fetch(`https://knight-foodji.herokuapp.com/api/restaurant/order/acceptreject/accept/${orderId}`,{
        accept: "application/json",
        mode: "cors",
        method: "POST",
        headers: {
            Authorization: token,
          } 
    })
    .then(response =>{
        if(response.status == 200){
            //Window.location needs to be changed
            window.location = 'restaurant.html'
        }
        else{
            //Code to be written
        }
    })

})

rejecttOrder.onclick((e)=>{
    fetch(`https://knight-foodji.herokuapp.com/api/restaurant/order/acceptreject/reject/${orderId}`,{
        accept: "application/json",
        mode: "cors",
        method: "POST",
        headers: {
            Authorization: token,
          } 
    })
    .then(response =>{
        if(response.status == 200){
            //Window.location needs to be changed
            window.location = 'restaurant.html'
        }
        else{
            //Code to be written
        }
    })

})