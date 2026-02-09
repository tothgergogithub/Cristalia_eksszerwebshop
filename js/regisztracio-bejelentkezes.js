let regisztralo = {
    vezeteknev: "",
    keresznev: "",
    emailcim: "",
    telefonszam: "",
    password: ""
}

function adatBeszedes() {

    let vezeteknev = document.getElementById("vezeteknev")
    let keresznev =  document.getElementById("keresznev")
    let email = document.getElementById("email")
    let telefonszam =  document.getElementById("telefon")
    let jelszoEgy = document.getElementById("jelszo");
    let jelszoIsmet = document.getElementById("jelszoismet");
    console.log(telefonszam.value, typeof telefonszam.value)

    if (vezeteknev.value !== '' && keresznev.value !== '' && email.value !== '' && telefonszam.value != null && jelszoEgy.value !== '' && jelszoIsmet !== ''){
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
        const phone = Number( telefonszam.value);
        if (/[^0-9]/.test(phone)) {
            regisztralo.telefonszam = telefonszam.value
            console.log("Csak számokat adhatszmeg")
          } else {

          }
        if(phone.length < 11 || phone.length> 13){
            console.log("Nem jó a hossz")
        }
        const validJelszo = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
        if(jelszoEgy.value === jelszoIsmet.value && validJelszo.test(jelszoEgy.value)){
            regisztralo.password = jelszoEgy.value
        }
        else{
            alert("Hejtelen jelszó")
            
        }
        

        console.log(regisztralo.keresznev)
        console.log(regisztralo.vezeteknev)
        console.log(regisztralo.emailcim)
        console.log(regisztralo.telefonszam)
        console.log(regisztralo.password)
        


    }
    
    
    
    
    
    //emali

    


}







