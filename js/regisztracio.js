

function redRegisterFields() {
    return {
        vezeteknev: document.getElementById("vezeteknev").value,
        keresztnev: document.getElementById("keresznev").value,
        email: document.getElementById("email").value,
        telefon: document.getElementById("telefon").value,
        jelszo: document.getElementById("jelszo").value,
        jelszoismet: document.getElementById("jelszoismet").value
    }
    
}
    
document.addEventListener("submit", e=>{
        e.preventDefault()
        const fields =  redRegisterFields()

        fetch('/register', {
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
                            hibaPeldany.exeptions = hibasAdat.exeptions
                            hibaPeldany.message = hibasAdat.message
                            throw hibaPeldany
                        }
                    )
                }
            }
        ).then(() =>{
            console.log("A regisztráció sikeres volt!")
            alert("A regisztráció sikeres volt.")
            location.replace('/')}
        ).catch(
            cougthError =>{
                
                    console.log(cougthError.message +"  ||  "+ cougthError.exeptions)
               
            }
        )

        

})

