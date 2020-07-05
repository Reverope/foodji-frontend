var url = "https://knight-foodji.herokuapp.com/api/deliveryguy/all/";
var restDisplay = document.querySelector(".tableoforder");
var token = localStorage.getItem('foodji-super-auth-header')

fetch(url, {
  accept: "application/json",
  mode: "cors",
  headers:{
    Authorization: token
  },
  method: "GET",

})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {   
    data.forEach((d)=>{
      var restId = d._id;
      var tablerow = document.createElement("tr");
      var liRestaurantName = document.createElement("td");
      var liRestaurantAddress = document.createElement("td");
      var liAction = document.createElement("td");

      tablerow.appendChild(liRestaurantName);
      tablerow.appendChild(liRestaurantAddress);
      tablerow.appendChild(liAction);             

      liRestaurantName.innerText = d["name"]
      liRestaurantAddress.innerText = d["username"];

      restDisplay.appendChild(tablerow);

      var deleteButton = document.createElement("button");
      deleteButton.id = restId;
      liAction.appendChild(deleteButton);
      deleteButton.style.margin = "0 1rem";
      deleteButton.className = "delete btn btn-danger";              
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
                "https://knight-foodji.herokuapp.com/api/deliveryguy/delete/" +
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
            
                  window.location = "superadmindel.html";
              });
          } else{
            
            window.location = "superadmindel.html";
          }             
        });
      });
    }) 

  })
  .catch((err) => {

  });

  