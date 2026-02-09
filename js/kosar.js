fetch("Json/kosar.json")
  .then(res => {
    if (!res.ok) throw new Error("Nem található a JSON");
    return res.json();
  })
  .then(data => {
    console.log("JSON betöltve:", data);
  })
  .catch(err => console.error("Hiba:", err));