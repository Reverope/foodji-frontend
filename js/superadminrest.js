var url = "https://knight-foodji.herokuapp.com/api/restaurant";
var restDisplay = document.querySelector(".tableoforder");
var token = localStorage.getItem('foodji-super-auth-header')

fetch(url, {
  accept: "application/json",
  mode: "cors",
  method: "GET",
  headers:{
    Authorization: token
  }

})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {   
    data.forEach((d)=>{
      console.log(d)
      var restId = d.id;
      var tablerow = document.createElement("tr");
      var liRestaurantName = document.createElement("td");
      var liRestaurantAddress = document.createElement("td");
      var liRestaurantId = document.createElement("td");
      var liRestaurantNumber = document.createElement("td");
      var liRestaurantEmail = document.createElement("td");
      var liAction = document.createElement("td");

      tablerow.appendChild(liRestaurantName);
      tablerow.appendChild(liRestaurantAddress);
      tablerow.appendChild(liRestaurantId);
      tablerow.appendChild(liRestaurantNumber);
      tablerow.appendChild(liRestaurantEmail);
      tablerow.appendChild(liAction);             

      liRestaurantName.innerText = d["name"]
      liRestaurantAddress.innerText = d["address"];
      liRestaurantId.innerText = d["restId"];
      liRestaurantNumber.innerText = d["contactNos"][0];
      liRestaurantEmail.innerText = d["email"];


      restDisplay.appendChild(tablerow);

      var deleteButton = document.createElement("button");
      deleteButton.id = restId;
      liAction.appendChild(deleteButton);
      deleteButton.style.margin = "0 1rem";
      deleteButton.className = "delete template-btn template-btn2";              
      deleteButton.innerText = "Delete";

      //restDisplay.appendChild(tablerow);



      var selectAllDeleteButtons = document.querySelectorAll(
        ".delete"
      );          
          
      selectAllDeleteButtons.forEach((button) => {
        button.addEventListener("click", (clickedButton) => {
          var r = true

          if(r == true){
            var url =
                "https://knight-foodji.herokuapp.com/api/restaurant/delete/" +
                clickedButton.target.id;


            button.innerText = "Deleting"
              fetch(url, {
                accept: "application/json",
                mode: "cors",
                method: "DELETE",
                headers: {
                  Authorization: token,
                },
              }).then((response) => {
                console.log("DELETED")
                  window.location = "superadminrest.html";
              });
          } else{
            console.log("Err CANCELLED")
            window.location = "superadminrest.html";
          }             
        });
      });
    }) 

  })
  .catch((err) => {

  });

  











