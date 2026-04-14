

    let mennyiseg = 0;
    const gombok = document.getElementsByClassName('kosarba');

   
    for (let i = 0; i < gombok.length; i++) {

        gombok[i].onclick = function (e) {
            e.preventDefault();

            const termek = {
                id: this.dataset.id,
                nev: this.dataset.nev,
                ar: parseInt(this.dataset.ar),
                
            };

            let kosar = JSON.parse(localStorage.getItem('kosar')) || [];

            const letezo = kosar.find(t => t.id == termek.id);

            if (letezo) {
                letezo.mennyiseg++;
            } else {
                kosar.push(termek);
            }

            localStorage.setItem('kosar', JSON.stringify(kosar));

            alert("A termék a kosárba került!");
        };
    }


document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("termekek-container");
    try {
    const response = await fetch("./kosar.json");
    if (!response.ok) throw new Error("Nem sikerült betölteni a kosar.json fájlt.");
    const termekek = await response.json();

    termekek.forEach(termek => {
        if (termek.kategoria === "nyaklanc") {
            const card = document.createElement("div");
            card.className = "col-12 col-lg-6 col-xl-4 col-xxl-3 termek";
            card.innerHTML = `
                <div class="card mx-auto d-block" style="width: 18rem;">
                <img src="${termek.kep}" class="card-img-top kartyakep" alt="${termek.nev}">
                <div class="card-body">
                    <h5 class="card-title">${termek.nev}</h5>
                    <p class="card-text">${termek.leiras}</p>
                    <a href="kosar.html" class="btn btn-primary kosarba" data-id="${termek.id}" data-nev="${termek.nev}" data-ar="${termek.ar}">Kosárba</a>
                </div>
                </div>
            `;
            container.appendChild(card);
    }});
    } catch (error) {
    console.error("Hiba történt:", error);
    }
});