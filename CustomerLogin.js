
function displayRider() {

    const sender = getinfo()
    if (sender) {
        document.getElementById("sender-info").innerHTML = `
                    <h2>Welcome, ${sender.name}</h2>
                   
                `;
    } else {
        document.getElementById("sender-info").innerText = "No sender info found.";
    }
}
function getinfo(){
    const data = JSON.parse(localStorage.getItem("sender"));
    const sender = data.sender;
    return sender;
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
            const info = await  fetch("http://localhost:9002/api/orderRide",{
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
                alert(result.data.message)
                document.getElementById("loading").innerHTML = "your rider will contact you soon";
                document.getElementById("cancel_button").innerHTML=`<button onclick="cancelRide()">cancel ride</button>`
            }else {
                alert(result.data)
                document.getElementById("loading").innerHTML = "please try again in the next 30 mins";
            }





        }catch (error){
            alert( error.data)
        }
    }, 4000);

}

async function cancelRide(){
    const data= getinfo()
    const  email = data.email
    console.log(email)
    try {
        const info = await  fetch("http://localhost:9002/api/cancelTrip",{
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
           // location.reload();
        }





    }catch (error){
        alert(error.data)
    }

}