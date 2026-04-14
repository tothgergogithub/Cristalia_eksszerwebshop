
    localStorage.clear();
    /*let mennyiseg = 0;
    const gombok = document.getElementsByClassName('kosarba');

   
    for (let i = 0; i < gombok.length; i++) {

        gombok[i].onclick = function (e) {
            e.preventDefault();

            const termek = {
                id: this.dataset.id,
                nev: this.dataset.nev,
                ar: parseInt(this.dataset.ar),
                
            };
            console.log(termek)

            let kosar = JSON.parse(localStorage.getItem('kosar')) || [];

            const letezo = kosar.find(t => t.id == termek.id);

            if (letezo) {
                letezo.mennyiseg++;
            } else {
                kosar.push(termek);
            }

            localStorage.setItem('kosar', JSON.stringify(kosar));

            alert("A termék a kosárba került!");
        };
    }

*/
