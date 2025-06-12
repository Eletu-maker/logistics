function displayRider() {
    const rider =  getInfo()
    //console.log(rider)
    if (rider) {
        //console.log(rider)
        document.getElementById("rider-info").innerHTML = `<h2>Welcome, ${rider.name}</h2>`;
        //console.log(getRider())
        if(!getRider().available ){
            alert("your have a dispatch order")
            document.getElementById("check_info").innerHTML=`<button onclick="viewDetails()">view details</button>`
        }

    } else {
        document.getElementById("rider-info").innerText = "No rider info found.";
    }

}

function  getInfo(){
    const riderInfo = JSON.parse(localStorage.getItem("rider"));
    return riderInfo
}

async function getRider(){
    const value= getInfo()
    const email = value.email
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


async function viewDetails(){
    const value= getInfo()
    const email = value.email
    try{
        const data = await fetch("http://localhost:9002/api/checkInfo",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    email: email

                }
            )
        })
        const  result = await data.json()
        //console.log(result.data)
        const value = result.data
        if(result.message){
            document.getElementById("view").innerHTML=`
            <p>Sender Address : ${value["Sender Address: "]}</p>
            <p>Sender phoneNumber : ${value["Sender PhoneNumber: "]}</p>
            <p>Receiver Address : ${value["Receiver Address: "]} </p>
            <p>Receiver PhoneNumber ${value["Receiver PhoneNumber: "]}: </p>
            <button onclick="atSenderAddress()">Rider at Sender Address</button>
            `


        }else {
            alert(result.data)
        }

    }catch (error){
        alert(error.data)
    }
}

async function atSenderAddress(){
    const value= getInfo()
    const email = value.email

    try {
        const data = await fetch("http://localhost:9003/api/atSenderAddress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    email: email

                }
            )
        })

        const result = await data.json()
        console.log(result)
        if(result.message){
            document.getElementById("response").innerHTML=`<p>Sender has being notified</p>`
        }else {
            alert(result.data)
        }

    }catch (error){
            alert(error.data)
    }


}

async function packageDelivered(){
    const value= getInfo()
    const email = value.email
    try {
        const data = await fetch("http://localhost:9003/api/packageDelivered", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    email: email

                }
            )
        })

        const result = await data.json()
        console.log(result)
        console.log(result)
        if(result.message){

        }else {
            alert(result.data)
        }

    }catch (error){
        alert(error.data)
    }

}