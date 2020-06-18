var url = new URL(window.location.href);

var orderId = url.searchParams.get("id");
var token = localStorage.getItem("foodji-guy-auth-header");
console.log(orderId);
var card = document.getElementById("cardItem");

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
    var foodListForInnerHtml = "";

    if (!data["assign"] && data.status != "CANCELED") {
      var orderedFoodList = data["foods"];
      [...orderedFoodList].forEach((food) => {
        foodListForInnerHtml +=
          "<p class=pfood>" +
          food["name"] +
          "(x" +
          food["quantity"] +
          ")  <br> ₹" +
          food["price"] +
          "</p>" +
          "<br>";
      });

      var string =
        '\n          <p class="name">' +
        data["restaurant"].name +
        '</p>\n          <p class="phone">' +
        data["restaurant"].contactNos[0] +
        '</p>\n          <div class="paymentdetails">\n            <p>Address</p>\n            <p class="raddress">' +
        "\n              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non\n              itaque cupiditate assumenda expedita animi aspernatur!\n            " +
        '</p>\n          </div>\n          <hr style="margin: 0.5rem 0;">\n          <div class="userinfo">\n            <p>User Contact</p>\n            <p>' +
        data["user"].phone +
        '</p>\n          </div>\n          <div class="payment">\n            <div class="paymentdetails">\n              <p>Food</p>\n              ' +
        foodListForInnerHtml +
        '<p></p>\n            </div>\n            <div class="paymentdetails">\n              <p>User Address</p>\n              <p class="paddress">' +
        data["address"] +
        ' </p>\n            </div>\n            <br>\n            <div class="paymentdetails">\n              <p>Date and Time</p>\n              <p class="pstatus">' +
        data["updatedAt"] +
        '</p>\n            </div>\n            <div class="paymentdetails">\n              <p>Payment Amount</p>\n              <p class="pamount">' +
        data["payment"].total +
        '</p>\n            </div>\n            <br>\n            <button id="assign" onclick="assignorder(' +
        orderId +
        ')">Accept Order</button>\n          </div>\n        ';

      card.innerHTML = string;
      console.log(orderedFoodList);
    }
  });

function assignorder(orderidincoming) {
  var od = parseInt(orderidincoming);
  console.log(orderidincoming);
  var urlaccept =
    "https://knight-foodji.herokuapp.com/api/deliveryguy/assign/" + od;
  fetch(urlaccept, {
    accept: "application/json",
    mode: "cors",
    method: "POST",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status == 200) {
      location.reload();
    } else {
      location.reload();
    }
  });
}
