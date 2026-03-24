async function kosar(){
    try{
        const kosarbetolt = await fetch("Json/kosar.json");
        const kosar = await kosarbetolt.json();
        console.log("Kosár:", kosar);

        const termekbetolt = await fetch("Json/kosar.json");
        const termek = await termekbetolt.json();
        console.log("Termékek:", termek);

    } catch(err){
        console.log(err);
    }
}

kosar();