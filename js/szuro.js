document.addEventListener("DOMContentLoaded", function () {

  const products = document.querySelectorAll(".termek");
  const priceRange = document.querySelector(".data-price");
  const priceOutput = document.getElementById("rangeValue");

  const originFilters = document.querySelectorAll(".origin-filter");
  const materialFilters = document.querySelectorAll(".data-anyag");
  const styleFilters = document.querySelectorAll(".data-style");
  const caratFilters = document.querySelectorAll(".data-carat");

  priceOutput.textContent = priceRange.value + " Ft";

  priceRange.addEventListener("input", function () {
    priceOutput.textContent = this.value + " Ft";
    filterProducts();
  });

  [...originFilters, ...materialFilters, ...styleFilters, ...caratFilters]
    .forEach(input => input.addEventListener("change", filterProducts));

  function getCheckedValues(nodeList) {
    return Array.from(nodeList)
      .filter(input => input.checked)
      .map(input => input.value);
  }

  function filterProducts() {

    const selectedOrigins = getCheckedValues(originFilters);
    const selectedMaterials = getCheckedValues(materialFilters);
    const selectedStyles = getCheckedValues(styleFilters);
    const selectedCarats = getCheckedValues(caratFilters);

    const maxPrice = parseInt(priceRange.value);

    products.forEach(product => {

      const productOrigin = product.dataset.origin;
      const productMaterial = product.dataset.anyag;
      const productStyle = product.dataset.style;
      const productCarat = product.dataset.carat;
      const productPrice = parseInt(product.dataset.price);

      let show = true;
      if (selectedOrigins.length > 0 && !selectedOrigins.includes(productOrigin)) {
        show = false;
      }
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(productMaterial)) {
        show = false;
      }
      if (selectedStyles.length > 0 && !selectedStyles.includes(productStyle)) {
        show = false;
      }
      if (selectedCarats.length > 0 && !selectedCarats.includes(productCarat)) {
        show = false;
      }
      if (productPrice > maxPrice) {
        show = false;
      }
      product.style.display = show ? "block" : "none";

    });
  }

});