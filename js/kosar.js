fetch("Json/kosar.json")
  .then(res => {
    if (!res.ok) throw new Error("Nem található a JSON");
    return res.json();
  })
  .then(data => {
    console.log("JSON betöltve:", data);
  })
  .catch(err => console.error("Hiba:", err));

  document.addEventListener("DOMContentLoaded", () => {
    const kosar = JSON.parse(localStorage.getItem('kosar')) || [];
    const template = document.getElementById('card-template');
    const container = document.querySelector('main section.row:last-of-type');

    let vegosszeg = 0;

    kosar.forEach(termek => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('.product-image').src = termek.kep;
        clone.querySelector('.product-image').alt = termek.nev;

        clone.querySelector('p').textContent = termek.nev;
        clone.querySelector('#egy-termek-fizetendo').textContent = termek.ar;

        container.appendChild(clone);

        vegosszeg += termek.ar;
    });

    document.getElementById('osszeg').textContent = vegosszeg;
});
