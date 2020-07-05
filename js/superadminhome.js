var getAllOrdersURL =
  "https://knight-foodji.herokuapp.com/api/user/super/orders?pageNo=1&size=10";
var createRestURL = "https://knight-foodji.herokuapp.com/api/restaurant";
var createDelGuyURL = "https://knight-foodji.herokuapp.com/api/deliveryGuy";
var token = localStorage.getItem("foodji-super-auth-header");

var createRestForm = document.getElementById("createRestForm");
var createDelGuyForm = document.getElementById("createDelGuyForm");

//
var card = document.getElementById("cardItem");
var cards = document.getElementById("cards");
fetch(getAllOrdersURL, {
  accept: "application/json",
  mode: "cors",
  method: "GET",
  headers: {
    Authorization: token,
  },
})
  .then((response) => response.json())
  .then((data) => {
    [...data].forEach((item) => {
      if(item.status == "REJECTED" || item.status == "CANCELED")
        return


      var ordercards = card.cloneNode(true);

      ordercards["attributes"].class["value"] = "card";

      var resname = ordercards.childNodes[1];
      var resContact = ordercards.childNodes[3];
      var userContact = ordercards.childNodes[7].childNodes[3];
      var paymentMode = ordercards.childNodes[9].childNodes[1].childNodes[3];
      var paymentStatus = ordercards.childNodes[9].childNodes[3].childNodes[3];
      var paymentAmount = ordercards.childNodes[9].childNodes[5].childNodes[3];
      var orderStatus = ordercards.childNodes[9].childNodes[7].childNodes[3];

      var time = new Date(item["createdAt"]);

      resname["innerText"] = item["restaurant"].name;
      resContact["innerHTML"] =
        item["restaurant"].contactNos[0] +
        "<br>  " +
        time.toString().substr(0, 24);
      userContact["innerText"] = item["user"].phone;
      paymentMode["innerText"] = item["payment"].method;
      paymentStatus["innerText"] = item["payment"].status;
      paymentAmount["innerText"] = item["payment"].total;
      orderStatus["innerText"] = item["status"];
      //   console.log(ordercards["attributes"].class["value"]);

      cards.appendChild(ordercards);
    });
  })
  .then((_) => {
    cards.removeChild(cards.childNodes[1]);
  })
  .catch((err) => {
    console.log(err);
  });

//Creating restaurant
createRestForm.onsubmit = (e) => {
  e.preventDefault();
  var reqBody = JSON.stringify({
    restaurant: {
      rest_id: document.getElementById("rest_id").value,
      name: document.getElementById("restName").value,
      contactNos: [document.getElementById("restPhone").value],
      address: document.getElementById("restAddress").value,
      password: document.getElementById("restPassword").value,
      email: document.getElementById("restEmail").value,
    },
  });
  fetch(createRestURL, {
    mode: "cors",
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: reqBody,
    accept: "application/json",
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Restaurant Created");
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

//Creating DeliveryBoy
createDelGuyForm.onsubmit = (e) => {
  e.preventDefault();
  var reqBody = JSON.stringify({
    deliveryGuy: {
      name: document.getElementById("delguyName").value,
      username: document.getElementById("delguyUsername").value,
      phone: document.getElementById("delguyPhone").value,
      password: document.getElementById("delguyPassword").value,
      email: document.getElementById("delguyEmail").value,
    },
  });
  fetch(createDelGuyURL, {
    mode: "cors",
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: reqBody,
    accept: "application/json",
  })
    /*.then((res) => res.json())
    .then((data) => {
      console.log(data)
      if(data.status == 200){
        alert("Delivery Boy Created");
        location.reload();
      }
      else{
        alert("Failed to create. Email or del iD already exists.");
      }
    })
    .catch((err) => {
      console.log("status")
      console.log(err);
    });*/
    .then((data) => {
      console.log(data.status)
      if(data.status == 200 || data.status == 201){
        alert("Delivery Boy Created");
        location.reload();
      }
      else{
        alert("Failed to create. Email or del iD already exists.");
      }
    })
    .catch((err) => {
      console.log("status")
      console.log(err);
    });
};

var pageNo = 1
function showmore(){
  pageNo++;
  getAllOrdersURL =
  "https://knight-foodji.herokuapp.com/api/user/super/orders?pageNo="+pageNo+"&size=10";

  fetch(getAllOrdersURL, {
  accept: "application/json",
  mode: "cors",
  method: "GET",
  headers: {
    Authorization: token,
  },
})
  .then((response) => response.json())
  .then((data) => {
    [...data].forEach((item) => {
      console.log(item);

      var ordercards = card.cloneNode(true);

      ordercards["attributes"].class["value"] = "card";

      var resname = ordercards.childNodes[1];
      var resContact = ordercards.childNodes[3];
      var userContact = ordercards.childNodes[7].childNodes[3];
      var paymentMode = ordercards.childNodes[9].childNodes[1].childNodes[3];
      var paymentStatus = ordercards.childNodes[9].childNodes[3].childNodes[3];
      var paymentAmount = ordercards.childNodes[9].childNodes[5].childNodes[3];
      var orderStatus = ordercards.childNodes[9].childNodes[7].childNodes[3];

      var time = new Date(item["createdAt"]);

      resname["innerText"] = item["restaurant"].name;
      resContact["innerHTML"] =
        item["restaurant"].contactNos[0] +
        "<br>  " +
        time.toString().substr(0, 24);
      userContact["innerText"] = item["user"].phone;
      paymentMode["innerText"] = item["payment"].method;
      paymentStatus["innerText"] = item["payment"].status;
      paymentAmount["innerText"] = item["payment"].total;
      orderStatus["innerText"] = item["status"];
      //   console.log(ordercards["attributes"].class["value"]);

      cards.appendChild(ordercards);
    });
  })
  .then((_) => {
    cards.removeChild(cards.childNodes[1]);
  })
  .catch((err) => {
    console.log(err);
  });

}

document.writeln("<script type='text/javascript' src='./js/download.js'></script>");
function download_order(){
    var download_order_url = "https://knight-foodji.herokuapp.com/api/user/super/allorders"

    fetch(download_order_url,{
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },

        accept: "application/json"
    })   
    .then(response => response.blob())
    .then(blob => {
        download(blob,"orderfile.csv","text/csv")   
    })
    .catch(err =>{
        console.log(err)
    }) 
}
