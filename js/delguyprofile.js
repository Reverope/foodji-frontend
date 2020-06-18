var loader = document.querySelector(".preloader");
// var profileImg = document.getElementsByClassName("author_img");
var profileName = document.getElementById("name");
var profileNumber = document.getElementById("about");
var orderDisplay = document.querySelector(".tableoforder");
var container = document.querySelector("#ritem");


var url = "https://knight-foodji.herokuapp.com/api/deliveryguy/me";

var token = localStorage.getItem("foodji-guy-auth-header");
window.onload = () => {
  fetch(url, {
    accept: "application/json",
    mode: "cors",
    method: "GET",

    headers: {
      Authorization: token,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      profileName.innerHTML = data.name;
      profileNumber.innerHTML = data.email;
      data.orders.forEach((ord) => {
        var orderId = ord._id;
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

        var orderurl = `https://knight-foodji.herokuapp.com/api/deliveryguy/order/${orderId}`;

        fetch(orderurl, {
          accept: "application/json",
          mode: "cors",
          method: "GET",
          headers: {
            Authorization: token,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw Error(response);
            } else {
              response.json();
            }
          })
          .then((data) => {
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
          liETA.innerText = data["eta"]

            var time = data["updatedAt"];
            var timing = Date(time);

            liAssignmentDate.innerText = timing.substr(0, 24);

            // Triggering event : Accept/Decline

            orderDisplay.appendChild(tablerow);
          });
      });
    })
    .then((_) => {
      loader.remove();
    })
    .catch((err) => {
      console.log(err);
      document.getElementById("guy-modal").style.display = "block";
      document.getElementById("guy-error").style.display = "block";
    });
};
