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
app.use(express.json())

const REG_FILE = path.join(__dirname, 'reg.json');
const KOSAR_FILE = path.join(__dirname, 'kosar.json');




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

function validateRegistrationData(userInput, regData) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordCheck = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    let ex = []

    let exeptionCodes = {
        invalidPassword: 1,
        passwordsDontMatch: 2,
        invalidEmail: 3,
        invalidPhoneLength: 4,
        onlyNumbersInPhone: 5,
        lastnameToLong: 6,
        firstNameToLong: 7,
        userAlredyExists: 10
    }
    let currentRegistrationExistanceCheck = regData.find(user => user.email == userInput.email)
    if (!currentRegistrationExistanceCheck) {

        if (userInput.vezeteknev.length > 20) {
            ex.push(exeptionCodes.lastnameToLong)
        }
        if (userInput.keresztnev.length > 20) {
            ex.push(exeptionCodes.firstNameToLong)
        }

        if (!emailRegex.test(userInput.email)) {
            ex.push(exeptionCodes.invalidEmail)
        }

        if (!/^\d+$/.test(userInput.telefon)) {
            ex.push(exeptionCodes.onlyNumbersInPhone)


        }
        if (userInput.telefon.length < 11 || userInput.telefon.length > 13) {
            ex.push(exeptionCodes.invalidPhoneLength)
        }

        if (!passwordCheck.test(userInput.jelszo)) {
            ex.push(exeptionCodes.invalidPassword)
        }
        if (userInput.jelszo !== userInput.jelszoismet) {
            ex.push(exeptionCodes.passwordsDontMatch)
        }
    }


    else {
        ex.push(exeptionCodes.userAlredyExists)
    }
    return ex
}
app.post('/register', (req, res) => {
    const formData = req.body
    let exeptions = []
    let regJson
    let regObj
    try {
        regJson = fs.readFileSync(REG_FILE)
        regObj = JSON.parse(regJson)
        console.log("Itt a hiba")
        exeptions = validateRegistrationData(formData, regObj)

    } catch (serverEx) {
        return res.status(500).json({ message: "A szerveren hiba történt a regisztrációs fájl elérésével vagy az adat validációval", exeptions: serverEx.message })
    }

    if (exeptions.length == 0) {
        try {

            let userData = {
                id: regObj.length + 1,
                vezeteknev: formData.vezeteknev,
                keresztnev: formData.keresznev,
                email: formData.email,
                telefon: formData.telefon,
                jelszo: formData.jelszo
            }
            regObj.push(userData)
            fs.writeFileSync(REG_FILE, JSON.stringify(regObj))
            req.session.user = {
                id: userData.id,
                useremail: userData.email
            }
            return res.status(201).json({ message: "Sikeres regisztráció!" })
        } catch (exeptions) {
            console.log("Ez nem stimmel: " + exeptions)
            return res.status(500).json({ message: "Sajnos a szerver nem érzi jól magát.", exeptions: serverEx.message })
        }


    }
    else {
        return res.status(400).json({ message: "Nem megfelelő regisztációs adat", exeptions })
    }


})

function validateLoginData(data, users) {
    let ex = []
    let loginErrorCodes = {
        userNotFound: 8,
        invalidPassword: 9
    }

    let searchUser = users.find(u => u.email === data.username)
    if (!searchUser) {
        ex.push(loginErrorCodes.userNotFound)
    }
    else {
        if (searchUser.jelszo !== data.password) {
            ex.push(loginErrorCodes.invalidPassword)
        }
    }
    console.log("afete check" + ex)
    return ex
}


function getUserId(data, users) {
    let searchUser = users.find(u => u.email === data.username)
    return searchUser.id
}
function getUserEmail(data, users) {
    let searchUser = users.find(u => u.email === data.username)
    console.log("get user email" + searchUser.email)
    return searchUser.email
}

app.post('/login', (req, res) => {

    const data = req.body
    let regJson;
    try {
        regJson = fs.readFileSync(REG_FILE)
        console.log("sucsessful filered")
    } catch (e) {
        return res.status(500).json({ message: "Sikertelen fájlbeolvasás: ", exeptions:e.message })
    }
    const userObject = JSON.parse(regJson)
    let exeptions = []
    console.log("before the exeptioncheck")
    exeptions = validateLoginData(data, userObject)
    console.log("after the exeptioncheck")

    if (exeptions.length == 0) {
        try {
            console.log("before session")
            req.session.user = {
                id: getUserId(data, userObject),
                useremail: getUserEmail(data, userObject)
            }
            return res.status(200).json({ message: "Sikeres bejelentkezés" })

        } catch (e) {
            return res.status(500).json({ message: "A szerver nem érzi jól magát", exeptions:e.message })
        }
    }
    else {
        return res.status(400).json({message:"Ezek a hibák: ", exeptions })
    }



})
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

        res.json(termekek);
    } catch (error) {
        console.error('Hiba a kosár JSON lekérésekor:', error);
        res.status(500).json({ error: 'Hiba történt a kosár adatainak lekérésekor.' });
    }
});
app.listen(3000, () => {
    console.log('http://localhost:3000');
})

