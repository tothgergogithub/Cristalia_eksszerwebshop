async function getUser() {

    try {

        const response = await fetch('/me');

        const data = await response.json();

        console.log(data);

        return data;

    } catch (error) {

        console.error('Hiba a /me lekérésnél:', error);

        return null;
    }
}



if (!sessionStorage.getItem('kosar')) {

    sessionStorage.setItem('kosar', JSON.stringify([]));
}





function kosarba(termek) {

    console.log("MEGKAPOTT TERMÉK:", termek);

    let kosar = JSON.parse(sessionStorage.getItem('kosar')) || [];

    const letezo = kosar.find(item => item.id === termek.id);

    if (letezo) {

        letezo.mennyiseg++;

    } else {

        kosar.push({
            id: termek.id,
            nev: termek.nev,
            ar: termek.ar,
            kep: termek.kep || '',
            mennyiseg: 1
        });
    }

    sessionStorage.setItem('kosar', JSON.stringify(kosar));

    console.log("KOSÁR:", kosar);

    kosarMegjelenites();
}





function kosarMegjelenites() {

    const container = document.getElementById('kosar-lista');

    if (!container) return;

    let kosar = JSON.parse(sessionStorage.getItem('kosar')) || [];

    container.innerHTML = '';

if (kosar.length === 0) {

    container.innerHTML =
        '<p class="text-white">A kosár üres.</p>';

    const osszegElem =
        document.getElementById('osszeg');

    if (osszegElem) {

        osszegElem.textContent = '0';
    }

    return;
}

    let total = 0;

    kosar.forEach(item => {

        const reszosszeg = item.ar * item.mennyiseg;

        total += reszosszeg;

        const div = document.createElement('div');

        div.className = 'kosar-item';

        div.innerHTML = `
            <hr>

            
            <div class="text-white my-3 p-3">
            <h3>${item.nev}</h3>

            <p>Ár: ${item.ar.toLocaleString('hu-HU')} Ft</p>

            <p>Mennyiség: ${item.mennyiseg}</p>
            <p>Részösszeg: ${reszosszeg.toLocaleString('hu-HU')} Ft</p>

            <button onclick="torles(${item.id})">Törlés</button>
            </div>
        `;

        container.appendChild(div);
        
    });
    const osszegElem =
        document.getElementById('osszeg');

    if (osszegElem) {

        osszegElem.textContent =
            total.toLocaleString('hu-HU')
    }
    const uritesGomb = document.createElement('button');

    uritesGomb.textContent = 'Kosár ürítése';

    uritesGomb.className = 'btn btn-danger mt-3';

    uritesGomb.onclick = kosarUrites;

    container.appendChild(uritesGomb);
}







function torles(id) {

    let kosar = JSON.parse(sessionStorage.getItem('kosar')) || [];

    const index = kosar.findIndex(item => item.id == id);
    if (index === -1) return;

    if (kosar[index].mennyiseg > 1) {
        kosar[index].mennyiseg--;
    } else {
        kosar.splice(index, 1);
    }

    sessionStorage.setItem('kosar', JSON.stringify(kosar));

    kosarMegjelenites();
}





function kosarUrites() {
    sessionStorage.setItem('kosar', JSON.stringify([]));
    kosarMegjelenites();
}


function fizetes() {
    let kosar = JSON.parse(sessionStorage.getItem('kosar')) || [];

    if (kosar.length === 0) {
        alert("Nincs termék a kosárban, nem tudsz fizetni!");
        return;
    }

    alert("Sikeres fizetés!");

    sessionStorage.setItem('kosar', JSON.stringify([]));

    kosarMegjelenites();
}





document.addEventListener('DOMContentLoaded', async () => {

    await getUser();

    kosarMegjelenites();

});
