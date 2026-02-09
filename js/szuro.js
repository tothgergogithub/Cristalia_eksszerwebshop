const checkboxes = document.querySelectorAll(".form-check-input");
const products = document.querySelectorAll(".product");

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", filterProducts);
});

function filterProducts() {
  const selectedOrigins = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  products.forEach(product => {
    const origin = product.dataset.origin;

    if (selectedOrigins.length === 0 || selectedOrigins.includes(origin)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}