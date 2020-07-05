var superLoginForm = document.getElementById('superLoginForm')
var superLoginURL = `https://foodji-backend.herokuapp.com/api/user/super` 
superLoginForm.onsubmit = (e)=>{
    e.preventDefault();
    var reqBody = JSON.stringify({
        username : document.getElementById('username').value,
        password : document.getElementById('password').value
    })
    console.log(reqBody)

    fetch(superLoginURL,{
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: reqBody
    })
    .then( response => response.json())
    .then( (data) =>{
        console.log(JSON.stringify(data))
        localStorage.setItem("foodji-super-auth-header", "Bearer " + data.token)
        window.location = 'superadminhome.html'
    })
    .catch( error =>{
        console.log(error)
    })
}


