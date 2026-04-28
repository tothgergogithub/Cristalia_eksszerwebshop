const express = require('express');
const path = require('path');
const fs = require('fs');
const { error } = require('console');
const session = require('express-session');
const { json } = require('stream/consumers');
const e = require('express');
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

async function validateData(data) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
    let ex = []
    
    // email check
    if (!emailRegex.test(data.email)) {
        ex.push("Az email nem megfelelő")
    }
    // telefonszam
    if (!/^\d+$/.test(data.telefon)) {
        ex.push("A telefonszám csak szám lehet")


    } 
    if (data.telefon.length < 11 || data.telefon.length > 13) {
        ex.push("A telefonszám hossza nem megfelelő.")
    }

    // jelszó check
    if (!passwordCheck.test(data.jelszo) && data.jelszo !== data.jelszoismet) {
        ex.push("A jelszó nem megfelelő.")
    }
    return ex
}
app.post('/register', async (req, res) => {
    let data = { vezeteknev, keresznev, email, telefon, jelszo, jelszoismet } = req.body
    
    let exeptions = []
    exeptions = (await validateData(data))
    
    if (exeptions.length ==0){
        
    }
    
    



    




    /*
    if (jelszo !== jelszoismet) {
        hibak.push('A jelszavak nem egyeznek!');
    } else if (jelszo.length < 8) {
        hibak.push('A jelszónak legalább 8 karakter hosszúnak kell lennie!');
    } else if (!/(?=.*[a-z])/.test(jelszo)) {
        hibak.push('A jelszónak tartalmaznia kell legalább egy kisbetűt!');
    }*/

    // !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(jelszo || '')
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
app.listen(3000, () => {
    console.log('http://localhost:3000');
})