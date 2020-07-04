var container = document.querySelector("#ritem");
var containerBig = document.getElementById("container");
var url_string = window.location.href;
var url = new URL(url_string);
var page = parseInt(url.searchParams.get("page"));
console.log(page)
const getRestaurants = ()=>{
var url =   `https://knight-foodji.herokuapp.com/api/restaurant?pageNo=${page}&size=10`
  fetch(url, {
    accept: "application/json",
    mode: "cors",
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.forEach((element) => {
        var restaurant = container.cloneNode(true);
  
        // restaurant.childNodes[1]["attributes"]["href"]["value"] = `../../ui/restaurant/${element.name}/${element.id}`
        restaurant.childNodes[1]["attributes"]["href"][
          "value"
        ] = `restfood.html?name=${element.name}&id=${element.id}`;
        // "restaurant/" + element.name + "/" + element.id;
  
        // console.log(a);
  
        var img =
          restaurant.childNodes[1].childNodes[1].childNodes[1].childNodes[1];
        img["attributes"][0]["value"] = element.image;
  
        var name =
          restaurant.childNodes[1].childNodes[1].childNodes[3].childNodes[1]
            .childNodes[1];
        name["innerText"] = element.name;
  
        var address =
          restaurant.childNodes[1].childNodes[1].childNodes[3].childNodes[3];
        address["innerText"] = element.address;
  
        container.after(restaurant);
        // containerBig.removeChild(containerBig.firstChild);
      });
    })
    .then((_) => {
      containerBig.removeChild(containerBig.childNodes[1]);
      // loader.remove();
    });
  
}

getRestaurants()
var nextBtn = document.getElementById("nextPage")
var prevBtn = document.getElementById("prevPage")

nextBtn.onclick = (e)=>{
  page = page+1;
  window.location = `restaurant.html?page=${page}`
}

if(page == 1){
  prevBtn.setAttribute("disabled","true")
}
prevBtn.onclick = (e)=>{
  page = page - 1;
  window.location = `restaurant.html?page=${page}`
}