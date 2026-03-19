document.addEventListener("DOMContentLoaded", () => {
    const kosar = JSON.parse(localStorage.getItem('kosar')) || [];
    const template = document.getElementById('card-template');
    const fizetendoElem = document.getElementById('osszeg');

    let vegosszeg = 0;

    kosar.forEach(termek => {
        const clone = template.content.cloneNode(true);

       
        const img = clone.querySelector('.product-image');
        img.src = termek.kep;

        const leiras = clone.querySelector("p");
        leiras.textContent = `${termek.mennyiseg}× ${termek.nev}`;

        
        const arElem = clone.querySelector("#egy-termek-fizetendo");
        const osszeg = termek.ar * termek.mennyiseg;
        arElem.textContent = osszeg;

        
        vegosszeg += osszeg;

        
        template.parentElement.appendChild(clone);
    });

    
    fizetendoElem.textContent = vegosszeg;
});
