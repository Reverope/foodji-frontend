//Function to get data from query string
// function getParameterByName(name, url) {
//     if (!url) url = window.location.href;
//     name = name.replace(/[\[\]]/g, '\\$&');
//     var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, ' '));
//   }

var url = new URL(window.location.href)

var orderId = url.searchParams.get("id")
var token = localStorage.getItem("foodji-delguy-auth-header")
console.log(orderId)
var url = `https://knight-foodji.herokuapp.com/api/deliveryguy/order/${orderId}`

fetch(url,{
    accept: "application/json",
    mode: "cors",
    method: "GET",
    headers: {
        Authorization: token,
      }
})
.then( response => response.json())
.then( data => {
    document.getElementById('orderDetails').innerHTML = `OrderId: ${data._id}. Ordered By ${data.user.name}.Delivery Address: ${data.address}`
})
.catch(error =>{
    console.log(error)
})

var assignButton = document.getElementById('assign')

assignButton.onclick = (e)=>{
    fetch(`https://knight-foodji.herokuapp.com/api/deliveryguy/assign/${orderId}`,{
        accept: "application/json",
        mode: "cors",
        method: "POST",
        headers: {
            Authorization: token,
          } 
    })
    .then(response =>{
        if(response.status == 200){
            console.log("Order Assigned")
            //Window.location needs to be changed
            window.location = 'restaurant.html'
        }
    })
}