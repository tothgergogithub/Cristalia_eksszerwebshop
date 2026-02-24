const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, 'stilesheets')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'js')));

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
