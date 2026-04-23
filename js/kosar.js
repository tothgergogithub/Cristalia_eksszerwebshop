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
        const response = await fetch('/getkosarjson'); // Lekérés a szerverről
        if (!response.ok) {
            throw new Error('Hiba történt az adatok lekérésekor.');
        }
        const termekek = await response.json(); // JSON válasz feldolgozása
        console.log('Kosár tartalma:', termekek); // Kiírás a konzolra
    } catch (error) {
        console.error('Hiba történt:', error);
    }
});
