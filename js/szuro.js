const checkboxes = document.querySelectorAll(".form-check-input");
const products = document.querySelectorAll(".termek");

const rangeInput = document.getElementById('range4');
const rangeOutput = document.getElementById('rangeValue');
              
// Set initial value
rangeOutput.textContent = rangeInput.value;
              
rangeInput.addEventListener('input', function() {
  rangeOutput.textContent = this.value;
});

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
      product.classList.remove("hidden");
    } else {
      product.classList.add("hidden");
    }
  });
}