
async function displayRider() {
    const rider =  getInfo()
    //console.log(rider)
    if (rider) {
        //console.log(rider)
        document.getElementById("rider-info").innerHTML = `<h2>Welcome, ${rider.name}</h2>`;

       // console.log(getRider())
        const riderDetails = await getRider();
        console.log(riderDetails.available)

      if(!riderDetails.available ){
          alert("your have a dispatch order")
          document.getElementById("check_info").innerHTML=`<button onclick="viewDetails()">view details</button>`
      }



    } else {
        document.getElementById("rider-info").innerText = "No rider info found.";
    }

}


function  getInfo(){
    const riderInfo = JSON.parse(sessionStorage.getItem("rider"));
    return riderInfo
}

async function getRider(){
    const value= getInfo()
    const email = value.email
    try {
        const data = await fetch("http://localhost:9004/api/getRider", {
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


async function viewDetails(){
    const value= getInfo()
    const email = value.email
    try{
        const data = await fetch("http://localhost:9004/api/checkInfo",{
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
<div class="inner">
            <p>Sender Address : ${value["Sender Address: "]}</p>
            <p>Sender phoneNumber : ${value["Sender PhoneNumber: "]}</p>
            <p>Receiver Address : ${value["Receiver Address: "]} </p>
            <p>Receiver PhoneNumber ${value["Receiver PhoneNumber: "]}: </p>
            <button onclick="atSenderAddress()">Rider at Sender Address</button>
            </div>
            `


        }else {
            alert(result.data)
        }

    }catch (error){
        alert(error)
    }
}

async function atSenderAddress(){
    const value= getInfo()
    const email = value.email

    try {
        const data = await fetch("http://localhost:9004/api/atSenderAddress", {
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
            alert(error)
    }


}

async function packageDelivered(){
    const value= getInfo()

    const email = value.email
    try {
        const data = await fetch("http://localhost:9004/api/packageDelivered", {
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
            alert(result.data.message)
        }else {
            alert(result.data)
        }

    }catch (error){
        alert(error)
    }

}


async function logout(){
    const value = getInfo()
    const email = value.email
    console.log(email)


    try {

        const data = await fetch("http://localhost:9004/api/logoutRider",{
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
            alert(result.data.message)

            window.location.href = "index.html"
        }else {
            alert(result.message)
        }
    }catch (error){
        alert(error)
    }


}