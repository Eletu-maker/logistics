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
        <input type="text" id="senderName">
        <p>Enter your Email</p>
        <input type="text" id="senderEmail">
        <p>Enter your PhoneNumber</p>
        <input type="text" id="senderNumber">
        <p>Enter your Password</p>
        <input type="text" id="password">
        <button onclick="submitSender()"> submit</button>
    `
    const displayLogin = document.getElementById("display_login")
    displayLogin.innerHTML= null
}


async function submitSender(){
    const name = document.getElementById("senderName").value
    const email = document.getElementById("senderEmail").value
    const phoneNumber = document.getElementById("senderNumber").value
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


        if(result.message){
            alert(result.data.message)

        }
        else {
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
            alert(result.data.message)
            window.location.href = "CustomerLogin.html";
        }else {
            alert(result.data)
        }

    }catch (error){
        alert("Network or server error: " + error.data)
    }
}

