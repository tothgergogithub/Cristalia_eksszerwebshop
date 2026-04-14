async function loadNavbar() {
    const res = await fetch('/me');
    const data = await res.json();

    const nav = document.getElementById('palcement');
    const offcanva = document.getElementById("load-template")
    nav.innerHTML = "";
    offcanva.innerHTML=""

    if (data.loggedIn) {
        const navbar_template = document.getElementById('user-template');
        const nav_temp_clone = navbar_template.content.cloneNode(true);
        const offcanva_template = document.getElementById('offcanvas-user-temp');
        const offcanva_temp_clone = offcanva_template.content.cloneNode(true);

        //clone.querySelector('#username').textContent = data.user.username;

        nav.appendChild(nav_temp_clone);
        offcanva.appendChild(offcanva_temp_clone);

    } else {
       const navbar_template = document.getElementById('guest-template');
        const nav_temp_clone = navbar_template.content.cloneNode(true);
        const offcanva_template = document.getElementById('offcanvas-guest-temp');
        const offcanva_temp_clone = offcanva_template.content.cloneNode(true);

        nav.appendChild(nav_temp_clone);
        offcanva.appendChild(offcanva_temp_clone);
    }
}



loadNavbar()

