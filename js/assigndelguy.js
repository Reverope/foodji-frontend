var orderDisplay = document.querySelector(".tableoforder");

var url = new URL(window.location.href)

var orderId = url.searchParams.get("id")
var token = localStorage.getItem("foodji-guy-auth-header")
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
    // document.getElementById('orderDetails').innerHTML = `OrderId: ${data._id}. Ordered By ${data.user.name}.Delivery Address: ${data.address}`
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
    var liStatus = document.createElement("td");

    tablerow.appendChild(liElement);
    tablerow.appendChild(liAddress);
    tablerow.appendChild(liTotalPrice);
    tablerow.appendChild(liAssignmentDate);
    tablerow.appendChild(liContact);
    tablerow.appendChild(liETA);
    tablerow.appendChild(liStatus);
    tablerow.appendChild(accept);
    tablerow.appendChild(decline);

    if (!data["assign"] && data.status != 'CANCELED') {
        var acceptButton = document.createElement("button");
        acceptButton.id = orderId;
        accept.appendChild(acceptButton);
        acceptButton.style.margin = "0 1rem";
        acceptButton.className =
          "acceptdecision template-btn template-btn2";
        acceptButton.innerText = "Accept Order";
      } 

      var orderedFoodList = data["foods"];
      console.log(orderedFoodList);

      [...orderedFoodList].forEach((food) => {
        liElement.innerHTML +=
          "<li><p>" +
          food["name"] +
          "(x" +
          food["quantity"] +
          ")  <br> ₹" +
          food["price"] +
          "</p>" +
          "</li>";
      });

      // liElement.innerText = orderId;
      liAddress.innerText = data["address"];
      liTotalPrice.innerText = data["payment"]["total"];
      liContact.innerText = data["user"]["phone"];
      liStatus.innerText = data["status"];
      liETA.innerText = `30 Minutes`

      var time = data["updatedAt"];
      var timing = Date(time);

      liAssignmentDate.innerText = timing.substr(0, 24);

      // Triggering event : Accept/Decline

      orderDisplay.appendChild(tablerow);

      var selectAllAcceptButtons = document.querySelectorAll(
        ".acceptdecision"
      );
   

      selectAllAcceptButtons.forEach((button) => {
        button.addEventListener("click", (clickedButton) => {
          console.log(clickedButton.target.id);
          var url =
            "https://knight-foodji.herokuapp.com/api/deliveryguy/assign/" +
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
              location.reload()
            } else {
              location.reload()
            }
          });
        });
      });
    });
