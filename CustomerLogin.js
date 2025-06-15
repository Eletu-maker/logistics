
async  function displayRider() {

    const sender = getinfo()
    if (sender) {
        document.getElementById("sender-info").innerHTML = `<h2>Welcome, ${sender.name}</h2>`;
        const senderDetails = await getSender();
        //console.log(senderDetails)

        if(senderDetails.sender.seenRider){
            alert("dispatch has arrived to your location")
          console.log(  await arrived())
        }
    } else {
        document.getElementById("sender-info").innerText = "No sender info found.";
    }
}
function getinfo(){
    const data = JSON.parse(sessionStorage.getItem("sender"));
    console.log(data)
    return data.sender;
}

function rideInfo(){
    const display = document.getElementById("ride_info")
    display.innerHTML=`
    <form>
     <p>
            Enter your location
        </p>
        <input type="text" id="sender_address">
        <p>
            Enter receiver Phone number
        </p>
        <input type="text" id="receiver_number">
         <p>
            Enter receiver address
        </p>
        <input type="text" id="receiver_address">
        </form>
        <button onclick="orderRide()"> submit</button>
    `
}

async function orderRide(){
    document.getElementById("loading").innerHTML = `<strong>loading...</strong>`;
    setTimeout(async () => {

        const data= getinfo()
        const  email = data.email
        const senderAddress = document.getElementById("sender_address").value
        const receiverNumber = document.getElementById("receiver_number").value
        const receiverAddress = document.getElementById("receiver_address").value
        try {
            const info = await  fetch("http://localhost:9004/api/orderRide",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    senderEmail: email,
                    receiverPhoneNumber: receiverNumber,
                    senderAddress: senderAddress,
                    finalDestination: receiverAddress
                })
            })
            const result = await info.json()
            console.log(result)

            if(result.message){
                console.log("13")
                alert(result.data.message)
                document.getElementById("loading").innerHTML = "your rider will contact you soon";
                document.getElementById("cancel_button").innerHTML=`<button onclick="cancelRide()">cancel ride</button>`
            }else {
                alert(result.data)
                document.getElementById("loading").innerHTML = "please try again in the next 30 mins";
                console.log("12")
            }

        }catch (error){

        }
    }, 4000);

}

async function cancelRide(){
    const data= getinfo()
    const  email = data.email
    console.log(email)
    try {
        const info = await  fetch("http://localhost:9004/api/cancelTrip",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
            })
        })
        const result = await info.json()
        console.log(result)

        if(result.message){
            alert(result.data.message)
            location.reload();

        }else {
            alert(result.data)
            console.log("10")
           // location.reload();
        }





    }catch (error){
        alert(error)
    }

}


async function getSender(){
    const value = getinfo()
    const email = value.email
    try{
        const data = await fetch("http://localhost:9004/api/getSender", {
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
            return result.data;
        }else {
            alert(result.data)
            console.log("9")
        }

    }catch (error){
        alert( error)
        console.log("8")
    }
}

async function startTrip(){
    const value = getinfo()
    const email = value.email
    try {
        const data = await fetch("http://localhost:9004/api/startTrip",{
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
        console.log(result.data)
        if(result.message){

            alert(result.data.messages)
        }else {
            console.log(result.data)
            alert(result.data)
            console.log("5")
        }

    }catch (error){
        console.log("4")
        alert(error)
    }

}

async function logout(){
    const value = getinfo()
    const email = value.email


    try{

        const data = await fetch("http://localhost:9004/api/logoutSender",{
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
            console.log("3")
            alert(result.data.message)
            window.location.href = "index.html"
        }else {
            console.log("2")
            alert(result.message)
        }
    }catch (error){
        console.log("1")
        alert(error)
    }
}



async function arrived(){
    const value = getinfo()
    const email = value.email


    try {

        const data = await fetch("http://localhost:9004/api/arrived",{
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
        console.log(result)
        /*
        if(result.message){
        }else {
            alert(result.message)
        }

         */
    }catch (error){
        console.log(error)
        //alert(error)
    }
}