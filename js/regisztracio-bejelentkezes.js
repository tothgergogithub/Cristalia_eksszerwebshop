let regisztralo = {
    vezeteknev: "URB",
    keresznev: "DV",
    emailcim: "example@gmail.com",
    telefonszam: "12345",
    password: "Pass"
}

function adatBeszedes() {

    let emailDomainek =["@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com"]

    regisztralo.vezeteknev = document.getElementById("vezeteknev").value
    regisztralo.keresznev = document.getElementById("keresznev").value
    let megadottemail = document.getElementById("email").value
    let validEmailReg = /@(gmail\.com|freemail\.com|hotmail\.com|outlook\.com)$/i
    if (validEmailReg.test(megadottemail)) {
        regisztralo.emailcim = megadottemail
    }
    else{
        console.log("Hibás email címemt adtál meg.")
    }
    


}







