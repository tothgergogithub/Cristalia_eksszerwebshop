
let cart = JSON.parse(localStorage.getItem("cart")) || [];


fetch("Json/termekek.json")
    .then(res => res.json())
    .then(products => {
        renderCart(products);
    })
    .catch(err => console.error("Hiba a JSON betöltésekor:", err));



function renderCart(products) {

    
    const template = document.getElementById("card-template");
    const container = document.getElementsByTagName("section")[1]; 
    

    let total = 0;

    cart.forEach(id => {

        
        const product = products.find(p => p.id === id);
        if (!product) return;

        total += product.price;

      
        const clone = template.content.cloneNode(true);

       
     
clone.getElementsByClassName("product-image")[0].src = product.image;
clone.getElementsByClassName("product-image")[0].alt = product.name;


clone.getElementsByClassName("termek-leiras")[0].textContent = product.description;

// Ár
clone.getElementsByClassName("egy-termek-fizetendo")[0].textContent = product.price;

      
        container.appendChild(clone);
    });

    
    document.getElementById("osszeg").textContent = total;
}
