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

    <button onclick="Login()">Submit</button>
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
    <input type="text" id="senderName" placeholder="John Doe">

    <p>Enter your Email</p>
    <input type="email" id="senderEmail" placeholder="example@domain.com">

    <p>Enter your Phone Number</p>
    <input type="tel" id="senderNumber" placeholder="08123456789">

    <p>Enter your Password</p>
    <input type="password" id="password" placeholder="********">

    <button onclick="submitSender()">Submit</button>
</div>
        
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
        const data =  await fetch("http://localhost:9003/api/registerSender",{
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
            location.reload();

        }
        else {
            alert(result.data)
            location.reload();
        }

    }catch (error){
        alert(error)
    }

}

async function getSender(){
    const email = document.getElementById("login_email").value
    try {
        const data = await fetch("http://localhost:9003/api/getSender", {
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
        alert( error)
    }
}




async  function Login(){
    const email = document.getElementById("login_email").value
    const password = document.getElementById("login_password").value


    try {
        const data = await fetch("http://localhost:9003/api/loginSender",{
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
            const senderData = await getSender()
            //console.log(senderData)
            alert(result.data.message)


            if (senderData){
                sessionStorage.setItem("sender", JSON.stringify(senderData));
                window.location.href = "CustomerLogin.html";
            }

        }else {
            alert(result.data)
        }

    }catch (error){
        alert( error)
    }
}

