function login(){
    document.getElementById("display_login").style.display = "block";
    document.getElementById("display_login").innerHTML = "<p>Login form goes here</p>";
    document.getElementById("display_Register").style.display = "none";
    const displayLogin = document.getElementById("display_login")
    displayLogin.innerHTML=`
     <div class="form-container">
    <p>Enter your Email</p>
    <input type="email" id="login_email" placeholder="example@domain.com">

    <p>Enter your Password</p>
    <input type="password" id="login_password" placeholder="********">

    <button onclick="registerLogin()">Submit</button>
</div>
    `
    const displayRegister = document.getElementById("display_Register")
    displayRegister.innerHTML= null
}


function register(){
    document.getElementById("display_Register").style.display = "block";
    document.getElementById("display_Register").innerHTML = "<p>Registration form goes here</p>";
    document.getElementById("display_login").style.display = "none";
    const displayRegister = document.getElementById("display_Register")
    displayRegister.innerHTML=`
    <div class="form-container">
    <p>Enter your Name</p>
    <input type="text" id="name" placeholder="John Doe">

    <p>Enter your Email</p>
    <input type="email" id="email" placeholder="example@domain.com">

    <p>Enter your Phone Number</p>
    <input type="tel" id="phoneNumber" placeholder="08123456789">

    <p>Enter your Password</p>
    <input type="password" id="password" placeholder="********">

    <button onclick="submit()">Submit</button>
</div>
    `
    const displayLogin = document.getElementById("display_login")
    displayLogin.innerHTML= null
}

 async function submit(){
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const phoneNumber = document.getElementById("phoneNumber").value
    const password = document.getElementById("password").value

    try {
        const data =  await fetch("http://localhost:9003/api/registerRider",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phoneNumber: phoneNumber
            })
        })
        const result = await data.json()

             //console.log(result)

        if(result.message){
            alert(result.data)
            location.reload();

        }
        else {
            alert(result.data)
            location.reload();
        }

    }catch (error){
        alert("Network or server error: " + error)
    }

}
async function getRider(){
    const email = document.getElementById("login_email").value
    try {
        const data = await fetch("http://localhost:9003/api/getRider", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    email: email,

                }
            )
        })
        const result = await data.json()

        if(result.message){
            return result.data
        }else {
            alert(result.data)
        }

    }catch (error){
        alert("Network or server error: " + error)
    }
}


async  function registerLogin(){
    const email = document.getElementById("login_email").value
    const password = document.getElementById("login_password").value


    try {
        const data = await fetch("http://localhost:9003/api/loginRider",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: password
                }
            )
        })
        ;
        const result = await data.json()
        console.log(result)
        if(result.message){
            alert(result.data)

            const riderData = await getRider()
            if (riderData){
                sessionStorage.setItem("rider", JSON.stringify(riderData));
                window.location.href = "Riderlogin.html";
            }
        }else {
            alert(result.data)
        }

    }catch (error){
        alert("Network or server error: " + error)
    }
}

