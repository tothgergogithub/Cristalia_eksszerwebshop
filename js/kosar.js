document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('kosar-lista');
    if (!container) {
        console.error('Nincs #kosar-lista elem a kosar.html-ben.');
        return;
    }
    

    function setFizetendo(total) {
        const formatted = Number(total).toLocaleString('hu-HU');
      
        const osszegEl = document.getElementById('osszeg');
        const penznemEl = document.getElementById('penznem');
        if (osszegEl) {
            osszegEl.textContent = formatted;
            if (penznemEl) penznemEl.textContent = penznemEl.textContent || 'HUF';
            return;
        }

        
        let bubble = document.getElementById('fizetendo-bubble');
        if (bubble) {
            const text = `Fizetendő: ${formatted} Ft`;
            if (bubble.tagName === 'INPUT' || bubble.tagName === 'TEXTAREA') bubble.value = text;
            else bubble.textContent = text;
            bubble.style.display = '';
            return;
        }

        
        bubble = document.querySelector('.fizetendo-bubble, .white-bubble, [data-role="fizetendo"]');
        if (bubble) {
            const text = `Fizetendő: ${formatted} Ft`;
            if (bubble.tagName === 'INPUT' || bubble.tagName === 'TEXTAREA') bubble.value = text;
            else bubble.textContent = text;
            bubble.style.display = '';
            return;
        }

        const newBubble = document.createElement('div');
        newBubble.id = 'fizetendo-bubble';
        newBubble.className = 'fizetendo-bubble white-bubble';
        newBubble.style.cssText =
            'display:flex;align-items:center;justify-content:space-between;background:#fff;color:#000;padding:10px 18px;border-radius:20px;box-shadow:0 2px 8px rgba(0,0,0,0.12);min-width:260px;max-width:760px;margin:12px auto;';
        newBubble.textContent = `Fizetendő: ${formatted} Ft`;

        if (container && container.parentNode) container.parentNode.insertBefore(newBubble, container);
        else document.body.appendChild(newBubble);
    }


    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        
        const ls = localStorage.getItem('kosar');
        let localTermekek = [];
        if (ls) {
            try { localTermekek = JSON.parse(ls); } catch (e) { localTermekek = []; }
        }

        const response = await fetch('/getkosarjson');
        let termekek = [];
        if (response.ok) {
            try { termekek = await response.json(); } catch { termekek = []; }
        }

        if (Array.isArray(localTermekek) && localTermekek.length > 0) {
            termekek = localTermekek;
        }
        if (!Array.isArray(termekek)) termekek = [];

        if (!id) {
           
            if (termekek.length === 0) {
                container.innerHTML = '<p>A kosár üres.</p>';
                setFizetendo(0);
                return;
            }

            container.innerHTML = '';
            let totalSum = 0;
            termekek.forEach(item => {
                const qty = Number(item.mennyiseg) || 1;
                const price = Number(item.ar) || 0;
                const subtotal = price * qty;
                totalSum += subtotal;

                const el = document.createElement('div');
                el.className = 'kosar-item';
                el.innerHTML = `
                    ${item.kep ? `<img src="${item.kep}" alt="${item.nev}" style="max-width:80px;">` : ''}
                    <strong>${item.nev || 'Név hiányzik'}</strong><br/>
                    Egységár: ${price.toLocaleString('hu-HU')} Ft — Darab: ${qty} — Részösszeg: ${subtotal.toLocaleString('hu-HU')} Ft
                `;
                container.appendChild(el);
            });

            setFizetendo(totalSum);
            const totalEl = document.createElement('div');
            totalEl.className = 'kosar-total';
            totalEl.style.marginTop = '12px';
            totalEl.innerHTML = `<hr/><h4>Fizetendő összeg: ${totalSum.toLocaleString('hu-HU')} Ft</h4>`;
            container.appendChild(totalEl);
            return;
        }

        
        const item = termekek.find(t => String(t.id) === String(id));
        if (!item) {
            container.innerHTML = '<p>Nem található a kiválasztott termék a kosárban.</p>';
            setFizetendo(0);
            return;
        }

        const qty = Number(item.mennyiseg) || 1;
        const price = Number(item.ar) || 0;
        const subtotal = price * qty;

        container.innerHTML = `
            <div class="termek-detail">
                ${item.kep ? `<img src="${item.kep}" alt="${item.nev}" style="max-width:150px;">` : ''}
                <h2>${item.nev || 'Név hiányzik'}</h2>
                <p>${item.leiras || ''}</p>
                <p>Egységár: ${price.toLocaleString('hu-HU')} Ft</p>
                <p>Mennyiség: ${qty}</p>
                <p>Részösszeg: ${subtotal.toLocaleString('hu-HU')} Ft</p>
                <hr/>
               
            </div>
        `;
        setFizetendo(subtotal);

    } catch (error) {
        console.error('Hiba a kosár betöltésekor:', error);
        container.innerHTML = `<p>Hiba: ${error.message}</p>`;
        setFizetendo(0);
    }
});
