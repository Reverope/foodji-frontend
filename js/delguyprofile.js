var loader = document.querySelector(".preloader");
// var profileImg = document.getElementsByClassName("author_img");
var profileName = document.getElementById("name");
var profileNumber = document.getElementById("about");
var orderDisplay = document.querySelector(".tableoforder");
var container = document.querySelector("#ritem");
var editFormSection = document.querySelector(".containert");
var editProfileButton = document.getElementById("edit");
var editProfileForm = document.getElementById('editprofileform')
var url = "https://foodji-backend.herokuapp.com/api/deliveryguy/me";


var eName = document.getElementById("Name");
var eEmail = document.getElementById("Email");
var ePhone = document.getElementById("Phone");
editProfileButton.addEventListener("click", () => {
  editFormSection.style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
});

function remove() {
  editFormSection.style.display = "none";
  window.scrollTo(document.body.scrollHeight, 0);
}
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
      if (!response.ok) {
        throw Error(response);
      } else {
        return response.json();
      }
      console.log(token);
    })
    .then(function (data) {
      profileName.innerHTML = data.name;
      profileNumber.innerHTML = data.email;

      eName["value"] = data.name;
      eEmail["value"] = data.email;
      ePhone["value"] = data.phone;
  
      data.orders.forEach((ord) => {
        console.log(ord)
        var orderId = ord._id;
        var tablerow = document.createElement("tr");
        var liElement = document.createElement("td");
        var liRestName = document.createElement("td");
        var liRestAddress = document.createElement("td");
        var liRestPhone = document.createElement("td");
        var liCustName = document.createElement("td");
        var liCustAddress = document.createElement("td");
        var liCustPhone = document.createElement("td");
        var liPaymentStatus = document.createElement("td");
        var liTotalPrice = document.createElement("td");
        var liAssignmentDate = document.createElement("td");
        var liETA = document.createElement("td");
        var liAction = document.createElement("td");
        var liStatus = document.createElement("td");
  
        tablerow.appendChild(liElement);
        tablerow.appendChild(liRestName);
        tablerow.appendChild(liRestAddress);
        tablerow.appendChild(liRestPhone);
        tablerow.appendChild(liCustName);
        tablerow.appendChild(liCustAddress);
        tablerow.appendChild(liCustPhone);
        tablerow.appendChild(liTotalPrice);
        tablerow.appendChild(liAssignmentDate);
        tablerow.appendChild(liETA);
        tablerow.appendChild(liStatus);
        tablerow.appendChild(liAction);


  
        var url = `https://foodji-backend.herokuapp.com/api/deliveryguy/order/${orderId}`;
  
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
  
              var orderedFoodList = data["foods"];
  
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
              liRestName.innerText = data['restaurant']['name']
              liCustAddress.innerText = data["address"];
              liTotalPrice.innerText = data["payment"]["total"];
              liRestAddress.innerText = data["restaurant"]["address"]
              liRestPhone.innerText = data["restaurant"]["contactNos"][0];
              liCustPhone.innerText = data["user"]["phone"];
              liCustName.innerText = data["user"]["name"]
              liStatus.innerText = data["status"]
  
              var time = data["createdAt"];
              var timing = new Date(time);
  
              // liAssignmentDate.innerText = timing.substr(0, 24);
              liAssignmentDate.innerText = timing.toString().substr(0, 24);
  
              // Triggering event : Accept/Decline

              if (data["status"] == "ACCEPTED") {
                var shipButton = document.createElement("button");
                liAction.appendChild(shipButton);
                shipButton.id = orderId;
                shipButton.style.margin = "0 1rem";
                shipButton.className = "ship template-btn template-btn2";                
                shipButton.innerText = "SHIP";

              } else if (data["status"] == "SHIPPED") {
                var deliveredButton = document.createElement("button");
                liAction.appendChild(deliveredButton);
                deliveredButton.id = orderId;
                deliveredButton.style.margin = "0 1rem";
                deliveredButton.className = "delivered template-btn template-btn2";                
                deliveredButton.innerText = "DELIVERED";
              } else {
                liAction.innerText = "None"
              }
  
              orderDisplay.appendChild(tablerow);

              var selectAllShipButtons = document.querySelectorAll(
                ".ship"
              );

              var selectAllDeliveredButtons = document.querySelectorAll(
                ".delivered"
              );

              selectAllShipButtons.forEach((button) => {
                button.addEventListener("click", (clickedButton) => {
                  //var r = confirm("Do you want to cancel the order.")
                  var r = true
                  console.log(r)

                  if(r == true){
                    var url =
                        "https://foodji-backend.herokuapp.com/api/deliveryguy/status/" +
                        clickedButton.target.id;

                    button.innerText = "SHIPPING"
                    console.log(url)
                      fetch(url, {
                        accept: "application/json",
                        mode: "cors",
                        method: "PATCH",
                        headers: {
                          Authorization: token,
                        },
                      }).then((response) => {
                        console.log("SHIPPED")
                          window.location = "delguyprofile.html";
                      });
                  } else{
                    console.log("Err CANCELLED")
                    window.location = "delguyprofile.html";
                  }             
                });
              });

              selectAllDeliveredButtons.forEach((button) => {
                button.addEventListener("click", (clickedButton) => {
                  //var r = confirm("Do you want to cancel the order.")
                  var r = true
                  console.log(r)

                  if(r == true){
                    var url =
                        "https://foodji-backend.herokuapp.com/api/deliveryguy/order/status/" +
                        clickedButton.target.id;

                    button.innerText = "Updating"
                    console.log(url)
                      fetch(url, {
                        accept: "application/json",
                        mode: "cors",
                        method: "PATCH",
                        headers: {
                          Authorization: token,
                        },
                      }).then((response) => {
                        console.log("DELIVERED")
                          window.location = "delguyprofile.html";
                      });
                  } else{
                    console.log("Err CANCELLED")
                    window.location = "delguyprofile.html";
                  }             
                });
              });

      });
  
        });
        // var orderId = ord._id;
        // var tablerow = document.createElement("tr");
        // var liElement = document.createElement("td");
        // var liAddress = document.createElement("td");
        // var liPaymentStatus = document.createElement("td");
        // var liTotalPrice = document.createElement("td");
        // var liAssignmentDate = document.createElement("td");
        // var liContact = document.createElement("td");
        // // var liETA = document.createElement("td");
        // var accept = document.createElement("td");
        // var decline = document.createElement("td");
        // var liStatus = document.createElement("td");

        // tablerow.appendChild(liElement);
        // tablerow.appendChild(liAddress);
        // tablerow.appendChild(liTotalPrice);
        // tablerow.appendChild(liAssignmentDate);
        // tablerow.appendChild(liContact);
        // // tablerow.appendChild(liETA);
        // tablerow.appendChild(liStatus);
        // tablerow.appendChild(accept);
        // tablerow.appendChild(decline);

        // var orderurl = `https://foodji-backend.herokuapp.com/api/deliveryguy/order/${orderId}`;

        // fetch(orderurl, {
        //   accept: "application/json",
        //   mode: "cors",
        //   method: "GET",
        //   headers: {
        //     Authorization: token,
        //   },
        // })
        //   .then((response) => {
        //     if (!response.ok) {
        //       throw Error(response);
        //     } else {
        //       return response.json();
        //     }
        //     console.log(token);
        //   })
        //   .then((data) => {
        //     console.log(data);
        //     var orderedFoodList = data["foods"];
        //     console.log(orderedFoodList);

        //     [...orderedFoodList].forEach((food) => {
        //       liElement.innerHTML +=
        //         "<li><p>" +
        //         food["name"] +
        //         "(x" +
        //         food["quantity"] +
        //         ")  <br> ₹" +
        //         food["price"] +
        //         "</p>" +
        //         "</li>";
        //     });

        //     // liElement.innerText = orderId;
        //     liAddress.innerText = data["address"];
        //     liTotalPrice.innerText = data["payment"]["total"];
        //     liContact.innerText = data["user"]["phone"];
        //     liStatus.innerText = data["status"];
        //     // liETA.innerText = data["eta"];

        //     var time = data["createdAt"];
        //     var timing = new Date(time);

        //     liAssignmentDate.innerText = timing.toString().substr(0, 24);

        //     // Triggering event : Accept/Decline

        //     orderDisplay.appendChild(tablerow);
        //   });
      
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


var editProfileURL = `https://foodji-backend.herokuapp.com/api/deliveryguy/me`

editProfileForm.onsubmit = (e)=>{
  e.preventDefault()
  var reqBody = JSON.stringify({
    name: eName.value,
    email:eEmail.value,
    phone:ePhone.value,
  }) 
  console.log(reqBody)
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
  .catch(err =>{
    console.log(err)
  })
  
}