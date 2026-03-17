// 1. Kosár betöltése localStorage-ből
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 2. Termékek betöltése JSON-ból
fetch("Json/termekek.json")
    .then(res => res.json())
    .then(products => {
        renderCart(products);
    })
    .catch(err => console.error("Hiba a JSON betöltésekor:", err));


// 3. Kosár megjelenítése
function renderCart(products) {

    // Template és konténer kiválasztása
    const template = document.getElementById("card-template");
    const container = document.getElementsByTagName("section")[1]; 
    // Ez a második <section>, ahol a termékek vannak

    let total = 0;

    cart.forEach(id => {

        // Megkeressük a terméket a JSON-ban
        const product = products.find(p => p.id === id);
        if (!product) return;

        total += product.price;

        // Template klónozása
        const clone = template.content.cloneNode(true);

       
        // Kép
clone.getElementsByClassName("product-image")[0].src = product.image;
clone.getElementsByClassName("product-image")[0].alt = product.name;

// Leírás
clone.getElementsByClassName("termek-leiras")[0].textContent = product.description;

// Ár
clone.getElementsByClassName("egy-termek-fizetendo")[0].textContent = product.price;

        // Hozzáadás a DOM-hoz
        container.appendChild(clone);
    });

    // Végösszeg kiírása
    document.getElementById("osszeg").textContent = total;
}
