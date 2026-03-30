const express = require('express');
const path = require('path');
const fs = require('fs');
const { error } = require('console');
const app = express();



app.use(express.static(path.join(__dirname, 'stilesheets')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.urlencoded({ extended: true }));

/*

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

*/

//ez a kód később implementálva lessz
{ //app.get reqestek a navigációhoz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "html", 'index.html'));
});
app.get('/nyaklancok.html', (req, res) => {
    res.sendFile(path.join(__dirname, "html", 'nyaklancok.html'));
});
app.get('/regisztracio.html', (req, res) => {
    res.sendFile(path.join(__dirname, "html", 'regisztracio.html'));
});
app.get('/bejentkezes.html', (req, res) => {
    res.sendFile(path.join(__dirname, "html", 'bejentkezes.html'));
});
app.get('/fulbevalok.html', (req, res) => {
    res.sendFile(path.join(__dirname, "html", 'fulbevalok.html'));
});
app.get('/gyuruk.html', (req, res) => {
    res.sendFile(path.join(__dirname, "html", 'gyuruk.html'));
});
app.get('/karkotok.html', (req, res) => {
    res.sendFile(path.join(__dirname, "html", 'karkotok.html'));
});
app.get('/kosar.html', (req, res) => {
    res.sendFile(path.join(__dirname, "html", 'kosar.html'));
});
app.get('/nyaklancok.html', (req, res) => {
    res.sendFile(path.join(__dirname, "html", 'nyaklancok.html'));
});

app.get('/rolunk.html', (req, res) => {
    res.sendFile(path.join(__dirname, "html", 'rolunk.html'));
});
}

app.post('/register', (req, res) => {

    const { vezeteknev, keresznev,felhasznalonev, email, telefon, jelszo, jelszoismet} = req.body;
    let usersjson = fs.readFileSync("reg.json", "utf-8");
    let jsonArr = JSON.parse(usersjson)
    let regisztralo = {};
    let hibak = [];
    


    regisztralo.id= jsonArr.length+1
    


    // 2. Üres mezők ellenőrzése
    if (!vezeteknev || !keresznev || !email || !telefon || !jelszo || !jelszoismet || !felhasznalonev) {
        return res.status(400).send("Minden mezőt ki kell tölteni!");
    }
    regisztralo.felhasznalonev = felhasznalonev
    // 3. Email validáció
    const validEmailReg = /@(gmail\.com|freemail\.com|hotmail\.com|outlook\.com)$/i;
    if (validEmailReg.test(email)) {
        regisztralo.emailcim = email;
    } else {
        hibak.push("Hibás e-mail szolgáltató!");
    }

    // 4. Telefonszám validáció
    const phone = telefon.trim();
    if (/\D/.test(phone)) {
        hibak.push("A telefonszám csak számokat tartalmazhat!");
    } else if (phone.length < 11 || phone.length > 13) {
        hibak.push("Hibás a telefonszám hossza!");
    } else {
        regisztralo.telefonszam = phone;
    }

    // 5. Jelszó validáció
    const validJelszo = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (jelszo === jelszoismet && validJelszo.test(jelszo)) {
        regisztralo.password = jelszo; // Élesben itt használd a bcrypt-et titkosításhoz!
    } else {
        hibak.push("A jelszavak nem egyeznek, vagy nem elég erősek!");
    }

    // 6. Válasz küldése
    if (hibak.length > 0) {
        res.status(400).json({ sikeres: false, hibak: hibak });
    } else {
        regisztralo.vezeteknev = vezeteknev;
        regisztralo.keresznev = keresznev;
        console.log(regisztralo)
        jsonArr.push(regisztralo)
        usersjson = JSON.stringify(jsonArr)
        fs.writeFileSync("reg.json", usersjson, "utf-8")
        console.log("Sikeres validáció:", regisztralo);
        res.redirect('/');
        error => {
            if (error) throw error;
            console.log("hozzaadva")
        }
    }


})

app.post('/login', (req, res)=>{
    const {username, password} = req.body

    let jsonFile = fs.readFileSync('reg.json', "utf-8")
    if (!username || !password) {}

    console.log(jsonFile)
    jsonFile.forEach(registeredusers => {
        if(registeredusers.username === username || registeredusers.email === username && password === registeredusers.password){
            alert("Sikeres bejelentkezés")
        }
        else{
            alert("Sikertelen bejelentkezés")
        }
    });

})


app.listen(3000, () => {
    console.log('http://localhost:3000');
})

