document.addEventListener("DOMContentLoaded", () => {
  const termekek = document.querySelectorAll(".termek");
  const originFilters = document.querySelectorAll(".origin-filter");
  const anyagFilters = document.querySelectorAll(".data-anyag");
  const styleFilters = document.querySelectorAll(".data-style");
  const caratFilters = document.querySelectorAll(".data-carat");
  const priceFilter = document.querySelector(".data-price");
  const priceOutput = document.querySelector("#rangeValue");

  priceOutput.textContent = `${priceFilter.value} Ft`;

  function szures() {
      const maxAr = parseInt(priceFilter.value);
      priceOutput.textContent = `${maxAr} Ft`;

      const getSelectedValues = (checkboxes) => 
          Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);

      const selectedOrigins = getSelectedValues(originFilters);
      const selectedAnyagok = getSelectedValues(anyagFilters);
      const selectedStyles = getSelectedValues(styleFilters);
      const selectedKarats = getSelectedValues(caratFilters);

      termekek.forEach(termek => {
          const termekAdatok = termek.dataset;
          const ar = parseInt(termekAdatok.price);
          const originMatch = selectedOrigins.length === 0 || selectedOrigins.includes(termekAdatok.origin);
          const anyagMatch = selectedAnyagok.length === 0 || selectedAnyagok.includes(termekAdatok.anyag);
          const styleMatch = selectedStyles.length === 0 || selectedStyles.includes(termekAdatok.style);
          const caratMatch = selectedKarats.length === 0 || selectedKarats.includes(termekAdatok.carat);
          const priceMatch = ar <= maxAr;

          // Megjelenítés vagy elrejtés
          if (originMatch && anyagMatch && styleMatch && caratMatch && priceMatch) {
              termek.style.display = "block";
          } else {
              termek.style.display = "none";
          }
      });
  }

  [...originFilters, ...anyagFilters, ...styleFilters, ...caratFilters].forEach(input => {
      input.addEventListener("change", szures);
  });

  priceFilter.addEventListener("input", szures);
});