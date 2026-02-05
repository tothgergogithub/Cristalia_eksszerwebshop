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
    let telefonszam =  document.getElementById("telefon")
    console.log(telefonszam.value, typeof telefonszam.value)

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
        const phone = telefonszam.value;
        if (/[^0-9]/.test(value)) {
            console.log("CSak számokat adhatszmeg")
            error.textContent = "Csak számokat adhatsz meg!";
          } else {
            error.textContent = "";
          }
        if(phone.length < 11 || phone.length> 13){
            console.log("Nem jó a hossz")
        }
    }
    
    
    
    
    
    //emali

    


}







