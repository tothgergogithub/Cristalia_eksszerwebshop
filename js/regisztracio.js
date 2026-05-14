


function redRegisterFields() {
    fields = {
        vezeteknev: document.getElementsByName("vezeteknev"),
        keresztnev: document.getElementsByName("keresznev"),
        email: document.getElementsByName("email"),
        telefon: document.getElementsByName("telefon"),
        jelszo: document.getElementsByName("jelszo"),
        jelszoismet: document.getElementsByName("jelszoismet")
    }
    return fields
}
    
document.addEventListener("submit", async ()=>{
        preventDefault()
        const data = redRegisterFields()

        const response = await fetch('/register', {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(data)
        })


        if(response.sucess == true){
            alert("Sikeres regisztráció", response.parse())
        }
        else{
            alert("Nah",response.parse())
        }
})
