

function redRegisterFields() {
    return {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
    }
    
}
    
document.addEventListener("submit", e=>{
        e.preventDefault()
        const fields =  redRegisterFields()

        fetch('/login', {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(fields)
        }).then(
            response => {
                if(response.ok){
                    return response.json()
                }else{
                    return response.json().then(
                        hibasAdat => {
                            const hibaPeldany = new Error()
                            hibaPeldany.inputExeptions = hibasAdat.exeptions
                            throw hibaPeldany
                        }
                    )
                }
            }
        ).then(() =>{
            console.log("A bejelentkezés sikeres volt!")
            alert("A bejelentkezés sikeres volt.")
            location.replace('/')}
        ).catch(
            cougthError =>{
                if(cougthError.inputExeptions) {
                    console.log("Ezek a hibák" + cougthError.inputExeptions)
                }
                else{
                    console.log("A szerver vétett hibát vagy hálózati pobléma van.")
                }
            }
        )

        

})

