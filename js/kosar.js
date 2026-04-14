async function kosar() {
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
