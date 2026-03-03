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


app.post('/register', (req, res) => {
    const { vezeteknev, keresznev, email, telefon, jelszo, jelszoismet } = req.body;
    let regisztralo = {};

    regisztralo.vezeteknev = vezeteknev
    regisztralo.keresznev=keresznev
    regisztralo.email = email
    regisztralo.telefon=telefon


    fs.appendFile("reg.json", JSON.stringify(regisztralo, null, 2));
    res.redirect('/')
})



/*

//Az implementálásra váró kódok:
app.post('/register', (req, res) => {
    const { vezeteknev, keresznev, email, telefon, jelszo, jelszoismet } = req.body;
    
    let regisztralo = {};
    let hibak = [];
    
    // 2. Üres mezők ellenőrzése
    if (!vezeteknev || !keresznev || !email || !telefon || !jelszo || !jelszoismet) {
        return res.status(400).send("Minden mezőt ki kell tölteni!");
    }
    
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
        regisztralo.password = jelszo; 
    } else {
        hibak.push("A jelszavak nem egyeznek, vagy nem elég erősek!");
    }
    
    // 6. Válasz küldése
    if (hibak.length > 0) {
        res.status(400).json({ sikeres: false, hibak: hibak });
    } else {
        regisztralo.vezeteknev = vezeteknev;
        regisztralo.keresznev = keresznev;
        
        console.log("Sikeres validáció:", regisztralo);
        res.redirect('/');
        fs.appendFile("reg.json", JSON.stringify(regisztralo, null, 2), 
        error => { 
            if (error) throw error;
            console.log("hozzaadva")
        })
    }
})


*/



app.listen(3000, () => {
    console.log('http://localhost:3000');
})

