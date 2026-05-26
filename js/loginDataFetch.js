

function redRegisterFields() {
    return {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
    }

}

document.addEventListener("submit", e => {
    e.preventDefault()
    const fields = redRegisterFields()

    fetch('/login', {
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
                        throw hibaPeldany
                    }
                )
            }
        }
    ).then(() => {
        console.log("A bejelentkezés sikeres volt!")
        alert("A bejelentkezés sikeres volt.")
        location.replace('/')
    }
    ).catch(
        cougthError => {
            switch (cougthError.exeptions[0]) {
                case 8:
                    alert("A bejelentkezés sikertelen: nem található ilyen felhasználó.");
                    break;
                case 9:
                    alert("A bejelentkezés sikertelen: helytelen jelszó.");
                    break;
                default:
                    console.log(cougthError.message + "  ||  " + cougthError.exeptions)
                    break;
            }
        }
    )



})

