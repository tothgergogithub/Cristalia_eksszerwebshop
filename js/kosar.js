/*async function kosar() {
    try {
        const res = await fetch("Json/kosar.json");

        if (!res.ok) {
            throw new Error("Nem található a JSON fájl!");
        }

        const adat = await res.json();
        console.log("Kosár:", adat);

    } catch (err) {
        console.log("Hiba:", err);
    }
}

kosar();
*/
// Példa fetch kérés az oldal betöltésekor
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/getkosarjson'); 
        if (!response.ok) {
            throw new Error('Hiba történt az adatok lekérésekor.');
        }
        const termekek = await response.json(); 
        console.log('Kosár tartalma:', termekek); 
    } catch (error) {
        console.error('Hiba történt:', error);
    }
});


document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('kosar-lista');
    if (!container) {
        console.error('Nincs #kosar-lista elem a kosar.html-ben.');
        return;
    }

    

    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id'); 
        const response = await fetch('/getkosarjson');
        let termekek = [];
        if (response.ok) {
            termekek = await response.json();
        } else {
            console.log('GET /getkosarjson nem OK, fallback localStorage.');
        }

        
        if (!Array.isArray(termekek) || termekek.length === 0) {
            const ls = localStorage.getItem('kosar');
            if (ls) {
                try { termekek = JSON.parse(ls); } catch (e) { termekek = []; }
            }
        }

        if (!id) {
            container.innerHTML = '<p>Nincs kiválasztott termék. Nyisd meg a termék oldalát és kattints a kosár gombra.</p>';
            return;
        }

        const item = (Array.isArray(termekek) ? termekek : []).find(t => String(t.id) === String(id));
        if (!item) {
            container.innerHTML = '<p>Nem található a kiválasztott termék a kosárban.</p>';
            return;
        }

        const qty = Number(item.mennyiseg) || 1;
        const price = Number(item.ar) || 0;
        const subtotal = price * qty;

        container.innerHTML = `
            <div class="termek-detail">
                ${item.kep ? `<img src="${item.kep}" alt="${item.nev}" style="max-width:150px;">` : ''}
                <h2>${item.nev || 'Név hiányzik'}</h2>
                <p>${item.leiras || ''}</p>
                <p>Egységár: ${price.toLocaleString('hu-HU')} Ft</p>
                <p>Mennyiség: ${qty}</p>
                <p>Részösszeg: ${subtotal.toLocaleString('hu-HU')} Ft</p>
                <hr/>
                <p><strong>Fizetendő összeg: ${subtotal.toLocaleString('hu-HU')} Ft</strong></p>
            </div>
        `;
    } catch (error) {
        console.error('Hiba a kosár betöltésekor:', error);
        container.innerHTML = `<p>Hiba: ${error.message}</p>`;
    }
});
