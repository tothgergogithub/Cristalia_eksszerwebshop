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
                            <button class="btn btn-primary kosarba" data-id="${termek.id}" data-nev="${termek.nev}" data-ar="${termek.ar}">Kosárba</button>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            }
        });

        
        container.addEventListener('click', (e) => {
            const btn = e.target.closest('.kosarba');
            if (!btn) return;
            const termek = {
                id: String(btn.dataset.id),
                nev: btn.dataset.nev,
                ar: parseInt(btn.dataset.ar, 10),
                mennyiseg: 1
            };
            let kosar = JSON.parse(localStorage.getItem('kosar')) || [];
            const letezo = kosar.find(t => t.id == termek.id);
            if (letezo) {
                letezo.mennyiseg = (Number(letezo.mennyiseg) || 0) + 1;
             
            } else {
                kosar.push(termek);
            }
           // ...existing code...
            // mentés localStorage-be
            localStorage.setItem('kosar', JSON.stringify(kosar));
            // megakadályozzuk az alapértelmezett viselkedést (ha gomb submit lenne)
            e.preventDefault();
            // blokkoló értesítés
            alert("A termék a kosárba került!");
            // átirányítás a kosár oldalra az adott termék id-jával
            window.location.href = `/kosar.html?id=${encodeURIComponent(termek.id)}`;
// ...existing code...

        });
           

    } catch (error) {
        console.error("Hiba történt:", error);
    }
});

