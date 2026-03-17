document.addEventListener('DOMContentLoaded', function() {
    let originFilters = document.querySelectorAll('.origin-filter');
    let styleFilters = document.querySelectorAll('.data-style');
    let caratFilters = document.querySelectorAll('.data-carat');
    let anyagFilters = document.querySelectorAll('.data-anyag');
    let priceRange = document.querySelector('.data-price');
    let rangeValue = document.getElementById('rangeValue');
    let products = document.querySelectorAll('.termek');
  
    if (priceRange && rangeValue) {
      updateRangeValue();
      priceRange.addEventListener('input', updateRangeValue);
    }
  
    function updateRangeValue() {
      rangeValue.textContent = priceRange.value + ' Ft';
    }
  
    originFilters.forEach(filter => {
      filter.addEventListener('change', applyFilters);
    });
  
    styleFilters.forEach(filter => {
      filter.addEventListener('change', applyFilters);
    });
  
    caratFilters.forEach(filter => {
      filter.addEventListener('change', applyFilters);
    });
  
    anyagFilters.forEach(filter => {
      filter.addEventListener('change', applyFilters);
    });
  
    if (priceRange) {
      priceRange.addEventListener('input', applyFilters);
    }
  
    function applyFilters() {
      let selectedOrigins = Array.from(originFilters)
        .filter(f => f.checked)
        .map(f => f.value);
  
      let selectedStyles = Array.from(styleFilters)
        .filter(f => f.checked)
        .map(f => f.value);
  
      let selectedCarats = Array.from(caratFilters)
        .filter(f => f.checked)
        .map(f => f.value);
  
      let selectedAnyag = Array.from(anyagFilters)
        .filter(f => f.checked)
        .map(f => f.value);
  
      let maxPrice = parseInt(priceRange.value);
  
      products.forEach(product => {
        let productOrigin = product.dataset.origin;
        let productStyle = product.dataset.style;
        let productCarat = product.dataset.carat;
        let productAnyag = product.dataset.anyag;
        let productPrice = parseInt(product.dataset.price);
  
        let originMatch = selectedOrigins.length === 0 || selectedOrigins.includes(productOrigin);
        let styleMatch = selectedStyles.length === 0 || selectedStyles.includes(productStyle);
        let caratMatch = selectedCarats.length === 0 || selectedCarats.includes(productCarat);
        let anyagMatch = selectedAnyag.length === 0 || selectedAnyag.includes(productAnyag);
        let priceMatch = productPrice <= maxPrice;
  
        if (originMatch && styleMatch && caratMatch && anyagMatch && priceMatch) {
          product.style.display = '';
        } else {
          product.style.display = 'none';
        }
      });
    }
  
    applyFilters();
  });