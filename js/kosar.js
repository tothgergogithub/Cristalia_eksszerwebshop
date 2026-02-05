const productlist=document.getElementById("product-list");
const template=document.getElementById("product-card-template")
let cart=[];
fetch()
  .then(response => response.json())
  .then(data => {
    console.log(data); // itt már JS objektum!
  })
  .catch(error => console.error("Hiba:", error));