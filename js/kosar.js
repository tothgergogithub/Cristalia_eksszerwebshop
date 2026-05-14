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

        container.innerHTML = '<p>A kosár üres.</p>';

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

            ${item.kep ? `<img src="${item.kep}" width="80">` : ''}

            <h3>${item.nev}</h3>

            <p>Ár: ${item.ar.toLocaleString('hu-HU')} Ft</p>

            <p>Mennyiség: ${item.mennyiseg}</p>

            <p>
                Részösszeg:
                ${reszosszeg.toLocaleString('hu-HU')} Ft
            </p>

            <button onclick="torles(${item.id})">
                Törlés
            </button>
        `;

        container.appendChild(div);
    });

    const totalDiv = document.createElement('div');

    totalDiv.innerHTML = `
        <hr>

        <h2>
            Fizetendő:
            ${total.toLocaleString('hu-HU')} Ft
        </h2>

        <button onclick="kosarUrites()">
            Kosár ürítése
        </button>
    `;

    container.appendChild(totalDiv);
}





function torles(id) {

    let kosar = JSON.parse(sessionStorage.getItem('kosar')) || [];

    kosar = kosar.filter(item => item.id !== id);

    sessionStorage.setItem('kosar', JSON.stringify(kosar));

    kosarMegjelenites();
}





function kosarUrites() {

    sessionStorage.setItem('kosar', JSON.stringify([]));

    kosarMegjelenites();
}





document.addEventListener('DOMContentLoaded', async () => {

    await getUser();

    kosarMegjelenites();

});