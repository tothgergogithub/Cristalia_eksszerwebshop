

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
                            hibaPeldany.inputExeptions = hibasAdat.exeptions
                            throw hibaPeldany
                        }
                    )
                }
            }
        ).then(() =>{
            console.log("A regisztráció sikeres volt!")
            alert("A regisztráció sikeres volt.")}
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

