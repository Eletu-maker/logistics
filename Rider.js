function login(){
    const displayLogin = document.getElementById("display_login")
    displayLogin.innerHTML=`
      <p>
            Enter your Email
        </p>
        <input type="text" id="login_email">
        <p>
            Enter your Password
        </p>
        <input type="text" id="login_password">
        
       <button onclick="registerLogin()"> submit</button>
    `
    const displayRegister = document.getElementById("display_Register")
    displayRegister.innerHTML= null
}


function register(){
    const displayRegister = document.getElementById("display_Register")
    displayRegister.innerHTML=`
     <p>Enter your Name</p>
        <input type="text" id="name">
        <p>Enter your Email</p>
        <input type="text" id="email">
        <p>Enter your PhoneNumber</p>
        <input type="text" id="phoneNumber">
        <p>Enter your Password</p>
        <input type="text" id="password">
        <button onclick="submit()"> submit</button>
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
        const data =  await fetch(" http://localhost:9002/api/registerRider",{
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
        alert("Network or server error: " + error.data)
    }

}
async function getRider(){
    const email = document.getElementById("login_email").value
    try {
        const data = await fetch("http://localhost:9002/api/getRider", {
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
        alert("Network or server error: " + error.data)
    }
}


async  function registerLogin(){
    const email = document.getElementById("login_email").value
    const password = document.getElementById("login_password").value


    try {
        const data = await fetch("http://localhost:9002/api/loginRider",{
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

        const result = await data.json()
        console.log(result)
        if(result.message){
            alert(result.data)

            const riderData = await getRider()
            if (riderData){
                localStorage.setItem("rider", JSON.stringify(riderData));
                window.location.href = "Riderlogin.html";
            }
        }else {
            alert(result.data)
        }

    }catch (error){
        alert("Network or server error: " + error.data)
    }
}

