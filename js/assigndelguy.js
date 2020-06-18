var orderDisplay = document.querySelector(".tableoforder");

var url = new URL(window.location.href);

var orderId = url.searchParams.get("id");
var token = localStorage.getItem("foodji-guy-auth-header");
console.log(orderId);
var url = `https://knight-foodji.herokuapp.com/api/deliveryguy/order/${orderId}`;
window.onload = () => {
  if (!token) {
    document.getElementById("pop-modal").style.display = "block";
  }
};

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
    console.log(data);
    if (!data["assign"] && data.status != "CANCELED") {
        
    }

    var orderedFoodList = data["foods"];
    console.log(orderedFoodList);

    // [...orderedFoodList].forEach((food) => {
    //   liElement.innerHTML +=
    //     "<li><p>" +
    //     food["name"] +
    //     "(x" +
    //     food["quantity"] +
    //     ")  <br> ₹" +
    //     food["price"] +
    //     "</p>" +
    //     "</li>";
    // });

    // liElement.innerText = orderId;
    liAddress.innerText = data["address"];
    liTotalPrice.innerText = data["payment"]["total"];
    liContact.innerText = data["user"]["phone"];
    liStatus.innerText = data["status"];
    liETA.innerText = `30 Minutes`;

    var time = data["updatedAt"];
    var timing = Date(time);

    liAssignmentDate.innerText = timing.substr(0, 24);

    // Triggering event : Accept/Decline

    orderDisplay.appendChild(tablerow);

    var selectAllAcceptButtons = document.querySelectorAll(".acceptdecision");

    // selectAllAcceptButtons.forEach((button) => {
    //   button.addEventListener("click", (clickedButton) => {
    //     console.log(clickedButton.target.id);
    //     var url =
    //       "https://knight-foodji.herokuapp.com/api/deliveryguy/assign/" +
    //       clickedButton.target.id;
    //     fetch(url, {
    //       accept: "application/json",
    //       mode: "cors",
    //       method: "POST",
    //       headers: {
    //         Authorization: token,
    //       },
    //     }).then((response) => {
    //       if (response.status == 200) {
    //         location.reload();
    //       } else {
    //         location.reload();
    //       }
    //     });
    //   });
    // });
  });
