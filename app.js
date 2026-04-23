const express = require('express');
const path = require('path');
const fs = require('fs');
const { error } = require('console');
const session = require('express-session');
const { json } = require('stream/consumers');
const app = express();


app.use(session({
    secret: 'crist-web',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(express.static(path.join(__dirname, 'stilesheets')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.urlencoded({ extended: true }));

const REG_FILE = path.join(__dirname, 'reg.json');
const KOSAR_FILE = path.join(__dirname, 'kosar.json');

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
    const { vezeteknev,keresznev, email, telefon,jelszo, jelszoismet } = req.body
    hibak = []
    const allowedDomains = ['gmail.com', 'freemail.com', 'hotmail.com', 'outlook.com'];
    const emailTrim = String(email).trim().toLowerCase();
    const emailMatch = emailTrim.match(/^([^@]+)@([^@]+)$/);
    if (!emailMatch || !allowedDomains.includes(emailMatch[2])) {
        hibak.push('Hibás e-mail szolgáltató!');
    }
    const phoneTrim = String(telefon).trim();
    if (!/^\d+$/.test(phone)){
        hibak.push('A telefonszám csak számokat tartalmazhat!');
    } else if (phoneTrim.length < 11 || phoneTrim.length > 13) {
        hibak.push('A telefonszám hossza 11-13 karakter között kell legyen!');
    }
 })

app.post('/login', (req, res) => {

    const { username, password } = req.body

    const USERS = JSON.parse(fs.readFileSync('reg.json', "utf-8"));
    if (!username || !password) {
        alert("Üres valamelyik kötelező mező.")
    }

    let userCheck;

    if (/\D/.test(username)) { //megnézi hogy szám-e az adott input
        userCheck = USERS.find(u => u.emailcim === username && u.password === password)
    }
    else {
        userCheck = USERS.find(u => u.telefonszam === username && u.password === password)


    }
    if (!userCheck) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    req.session.user = {
        id: userCheck.id,
        username: userCheck.email || userCheck.telefonszam
    }
    res.redirect('/')
})

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}
app.get('/me', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});


app.listen(3000, () => {
    console.log('http://localhost:3000');
})


async function termekekbeolv() {
    try {
        const termekjson = await fs.promises.readFile(KOSAR_FILE, 'utf-8');
        const termekArr = JSON.parse(termekjson || '[]');
        console.log("sikeres beolvasás:");
        console.log(termekArr);
        console.log(termekjson);
        return termekArr;
    } catch (error) {
        console.error('Fájl olvasási hiba:', error);
    }
}


    app.get('/getkosarjson', async (req, res) => {
        try {
            const termekek = await termekekbeolv();
            console.log('Visszaküldött termékek:', termekek);
            // Megvárja a termékek beolvasását
            res.json(termekek); // JSON formátumban küldi vissza az adatokat
        } catch (error) {
            console.error('Hiba a kosár JSON lekérésekor:', error);
            res.status(500).json({ error: 'Hiba történt a kosár adatainak lekérésekor.' });
        }
    });