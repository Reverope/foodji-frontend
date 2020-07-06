var loader = document.querySelector(".preloader");
var profileImg = document.getElementsByClassName("author_img");
var profileName = document.getElementById("name");
var profileNumber = document.getElementById("about");
var orderDisplay = document.querySelector(".tableoforder");
var container = document.querySelector("#ritem");
var editFormSection = document.querySelector(".containert");
var editProfileButton = document.getElementById("edit");
var editProfileForm = document.getElementById('editprofileform')

var eName = document.getElementById("Name");
var eEmail = document.getElementById("Email");

var eAddress = document.getElementById("Address");
var ePhone = document.getElementById("Phone");

var url = "https://foodji-backend.herokuapp.com/api/user/me";
var token = localStorage.getItem("foodji-user-auth-header");

editProfileButton.addEventListener("click", () => {
  editFormSection.style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
});

function remove() {
  editFormSection.style.display = "none";
  window.scrollTo(document.body.scrollHeight, 0);
}


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
    profileName.innerHTML = data["user"].name;
    profileNumber.innerHTML = data["user"].email;

    eName["value"] = data["user"].name;
    eEmail["value"] = data["user"].email;
    eAddress["value"] = data["user"].address;
    ePhone["value"] = data["user"].phone;
    //data.user.orders.reverse()

    data.user.orders.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
     var date1 = new Date(b.updatedAt)
     var date2 = new Date(a.updatedAt)
     console.log(date1)

    if(date1 < date2) return -1
    else return 1 
    });
    console.log(data.user.orders)



    data.user.orders.forEach((item) => {
      var orderId = item._id;
      var tablerow = document.createElement("tr");
      var liElement = document.createElement("td");
      var liRestaurant = document.createElement("td");
      var liAddress = document.createElement("td");
      var liPaymentStatus = document.createElement("td");
      var liTotalPrice = document.createElement("td");
      var liAssignmentDate = document.createElement("td");
      var liContact = document.createElement("td");
      var liETA = document.createElement("td");
      var liAction = document.createElement("td");
      var liStatus = document.createElement("td");

      tablerow.appendChild(liElement);
      tablerow.appendChild(liRestaurant);
      tablerow.appendChild(liAddress);
      tablerow.appendChild(liTotalPrice);
      tablerow.appendChild(liAssignmentDate);
      tablerow.appendChild(liContact);
      tablerow.appendChild(liETA);
      tablerow.appendChild(liStatus);
      tablerow.appendChild(liAction);

      var url = `https://foodji-backend.herokuapp.com/api/user/order/${orderId}`;

      
      async function fun(url){
        try{
        var response = await fetch(url, {
          accept: "application/json",
          mode: "cors",
          method: "GET",
          headers: {
            Authorization: token,
          },
        })
        //console.log(response.json())


        var data1 = await response.json()
        console.log(data1)
            //data["status"] = "SHIPPED"

            if (data1["status"] == "PENDING") {
              var declineButton = document.createElement("button");
              declineButton.id = orderId;
              liAction.appendChild(declineButton);
              declineButton.style.margin = "0 1rem";
              declineButton.className = "declinedecision template-btn template-btn2";              
              declineButton.innerText = "Cancel";

            } else{
              liAction.innerText = "None"
            }

            var orderedFoodList = data1["foods"];

            await [...orderedFoodList].forEach((food) => {
              liElement.innerHTML +=
                "<p>" +
                food["name"] +
                "(x" +
                food["quantity"] +
                ")  <br> ₹" +
                food["price"] +
                ",</p>"
            });

            // liElement.innerText = orderId;
            liRestaurant.innerText = data1["restaurant"]["name"]
            liAddress.innerText = data1["address"];
            liTotalPrice.innerText = data1["payment"]["total"];
            liContact.innerText = data1["restaurant"]["contactNos"][0];
            liStatus.innerText = data1["status"];
            liETA.innerText = data1["eta"]

            if(data["eta"] == undefined)
              liETA.innerText = "pending"

            var time = data["createdAt"];
            var timing = new Date(time);


            // liAssignmentDate.innerText = timing.substr(0, 24);
            liAssignmentDate.innerText = timing.toString().substr(0, 24);

            // Triggering event : Accept/Decline

            await orderDisplay.appendChild(tablerow);


            var selectAllDeclineButtons = document.querySelectorAll(
              ".declinedecision"
            );

            var selectAllDeliveredButtons = document.querySelectorAll(
              ".delivered"
            );


          await selectAllDeclineButtons.forEach((button) => {
            button.addEventListener("click", (clickedButton) => {
              //var r = confirm("Do you want to cancel the order.")
              var r = true
              console.log(r)

              if(r == true){
                var url =
                    "https://foodji-backend.herokuapp.com/api/user/order/cancel/" +
                    clickedButton.target.id;

                button.innerText = "CANCELING"
                  fetch(url, {
                    accept: "application/json",
                    mode: "cors",
                    method: "POST",
                    headers: {
                      Authorization: token,
                    },
                  }).then((response) => {
                    console.log("CANCELLED")
                      window.location = "userprofile.html";
                  });
              } else{
                console.log("Err CANCELLED")
                window.location = "userprofile.html";
              }             
            });
          });  
        } catch(e){
          console.log(e)
        }
}
      fun(url)
    });

  })
  .then((_) => {
    loader.remove();
  })
  .catch((err) => {
    PopUpLog();
  });

  var editProfileURL = `https://foodji-backend.herokuapp.com/api/user/me`

  editProfileForm.onsubmit = (e)=>{
    e.preventDefault()
    var reqBody = JSON.stringify({
      name: eName.value,
      email:eEmail.value,
      phone:ePhone.value,
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