document.addEventListener('DOMContentLoaded', function() {
    const originFilters = document.querySelectorAll('.origin-filter');
    const styleFilters = document.querySelectorAll('.data-style');
    const caratFilters = document.querySelectorAll('.data-carat');
    const anyagFilters = document.querySelectorAll('.data-anyag');
    const priceRange = document.querySelector('.data-price');
    const rangeValue = document.getElementById('rangeValue');
    const products = document.querySelectorAll('.termek');
  
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
      const selectedOrigins = Array.from(originFilters)
        .filter(f => f.checked)
        .map(f => f.value);
  
      const selectedStyles = Array.from(styleFilters)
        .filter(f => f.checked)
        .map(f => f.value);
  
      const selectedCarats = Array.from(caratFilters)
        .filter(f => f.checked)
        .map(f => f.value);
  
      const selectedAnyag = Array.from(anyagFilters)
        .filter(f => f.checked)
        .map(f => f.value);
  
      const maxPrice = parseInt(priceRange.value);
  
      products.forEach(product => {
        const productOrigin = product.dataset.origin;
        const productStyle = product.dataset.style;
        const productCarat = product.dataset.carat;
        const productAnyag = product.dataset.anyag;
        const productPrice = parseInt(product.dataset.price);
  
        const originMatch = selectedOrigins.length === 0 || selectedOrigins.includes(productOrigin);
        const styleMatch = selectedStyles.length === 0 || selectedStyles.includes(productStyle);
        const caratMatch = selectedCarats.length === 0 || selectedCarats.includes(productCarat);
        const anyagMatch = selectedAnyag.length === 0 || selectedAnyag.includes(productAnyag);
        const priceMatch = productPrice <= maxPrice;
  
        if (originMatch && styleMatch && caratMatch && anyagMatch && priceMatch) {
          product.style.display = '';
        } else {
          product.style.display = 'none';
        }
      });
    }
  
    applyFilters();
  });