const { response } = require("express")

function redRegisterFields() {
    fields = {
        vezeteknev: document.getElementById("vezeteknev").value,
        keresztnev: document.getElementById("keresznev").value,
        email: document.getElementById("email").value,
        telefon: document.getElementById("telefon").value,
        jelszo: document.getElementById("jelszo").value,
        jelszoismet: document.getElementById("jelszoismet").value
    }
    return fields
}
    
document.addEventListener("submit", async (event)=>{
        event.preventDefault()
        const data = await redRegisterFields()

        const response = await fetch('/register', {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(data)
        })

        await verifyRegistration(response)

})

function verifyRegistration(response) {
    return response.json().then(errorData =>{
        const err = new Error("Validációs hiba")
        err.data = errorData
        throw err
    }).catch()
}
