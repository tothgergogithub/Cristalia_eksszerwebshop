document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("termekek-container");
    try {
    const response = await fetch("./kosar.json");
    if (!response.ok) throw new Error("Nem sikerült betölteni a kosar.json fájlt.");
    const termekek = await response.json();

    termekek.forEach(termek => {
        if (termek.kategoria === "fulbevalo") {
            const card = document.createElement("div");
            card.className = "col-12 col-lg-6 col-xl-4 col-xxl-3 termek";

            card.setAttribute('data-origin', termek.szarmazas);
            card.setAttribute('data-style', termek.stilus);
            card.setAttribute('data-carat', termek.karat);
            card.setAttribute('data-anyag', termek.anyag);
            card.setAttribute('data-price', termek.ar);

            card.innerHTML = `
                <div class="card mx-auto d-block" style="width: 18rem;">
                    <img src="${termek.kep}" class="card-img-top kartyakep" alt="${termek.nev}">
                    <div class="card-body">
                        <h5 class="card-title">${termek.nev}</h5>
                        <p class="card-text">${termek.leiras}</p>
                        <p class="card-price">${"Ár: " + termek.ar + "Ft"}</p>
                        <a href="kosar.html" class="btn btn-primary kosarba" data-id="${termek.id}" data-nev="${termek.nev}" data-ar="${termek.ar}">Kosárba</a>
                    </div>
                </div>
            `;
            container.appendChild(card);
    }});
    } 
    catch (error) {
        console.error("Hiba történt:", error);
    }
});