let regisztralo = {
    vezeteknev: "URB",
    keresznev: "DV",
    emailcim: "example@gmail.com",
    telefonszam: "12345",
    password: "Pass"
}

function adatBeszedes() {

    let vezeteknev = document.getElementById("vezeteknev")
    let keresznev =  document.getElementById("keresznev")
    let email = document.getElementById("email")
    let telefonszam = document.getElementById("telefon")

    if (vezeteknev.value !== '' && keresznev.value !== '' && email.value !== '' && telefonszam.value != null){
        regisztralo.vezeteknev = vezeteknev.value
        regisztralo.keresznev = keresznev.value
        let megadottemail = email.value
        let validEmailReg = /@(gmail\.com|freemail\.com|hotmail\.com|outlook\.com)$/i
        if (validEmailReg.test(megadottemail)) {
            regisztralo.emailcim = megadottemail
        }
        else{
            console.log("Hibás email címemt adtál meg.")
        }
        //telefonszám
        
    }
    
    
    
    
    
    //emali

    


}







