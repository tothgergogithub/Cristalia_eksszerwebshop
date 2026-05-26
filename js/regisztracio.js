

function redRegisterFields() {
    return {
        vezeteknev: document.getElementById("vezeteknev").value,
        keresztnev: document.getElementById("keresznev").value,
        email: document.getElementById("email").value,
        telefon: document.getElementById("telefon").value,
        jelszo: document.getElementById("jelszo").value,
        jelszoismet: document.getElementById("jelszoismet").value
    }

}

document.addEventListener("submit", e => {
    e.preventDefault()
    const fields = redRegisterFields()

    fetch('/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(fields)
    }).then(
        response => {
            if (response.ok) {
                return response.json()
            } else {
                return response.json().then(
                    hibasAdat => {
                        const hibaPeldany = new Error()
                        hibaPeldany.exeptions = hibasAdat.exeptions
                        hibaPeldany.message = hibasAdat.message
                        throw hibaPeldany
                    }
                )
            }
        }
    ).then(() => {
        console.log("A regisztráció sikeres volt!")
        alert("A regisztráció sikeres volt.")
        location.replace('/')
    }
    ).catch(
        cougthError => {

            console.log(cougthError.message + "  ||  " + cougthError.exeptions)

            switch (cougthError.exeptions[0]) {
                case 1:
                    alert("A megadott jelszó nem felel meg a követelményeknek.");
                    break;
                case 2:
                    alert("A megadott jelszavak nem egyeznek.");
                    break;
                case 3:
                    alert("Az e-mail cím formátuma érvénytelen.");
                    break;
                case 4:
                    alert("A telefonszám hossza nem megfelelő.");
                    break;
                case 5:
                    alert("A telefonszám kizárólag számokat tartalmazhat.");
                    break;
                case 6:
                    alert("A megadott vezetéknév túl hosszú.");
                    break;
                case 7:
                    alert("A megadott keresztnév túl hosszú.");
                    break;
                case 10:
                    alert("Ezzel az azonosítóval már regisztráltak fiókot.");
                    break;

                default:
                    console.log(cougthError.message + "  ||  " + cougthError.exeptions)
                    break;
            }

        }
    )



})

