document.addEventListener("DOMContentLoaded", () => navbarToggle())
async function navbarToggle() {
    const userInfo = await fetchUserInfo()
    console.log(userInfo)
    const HTML = await getHtmlElements()
    console.log(HTML)
    HTML.navbarReplacables.innerHTML = ""
    HTML.offcanvasReplaceables.innerHTML = ""
    
    if (userInfo.loggedIn != true) {
        await loadContent(HTML.navbarReplacables, HTML.navbarGuestTemplate)
        await loadContent(HTML.offcanvasReplaceables, HTML.offcanvasGuestTemplate)
    }
    else {
        await loadContent(HTML.navbarReplacables, HTML.navbarUserTemplate)
        await loadContent(HTML.offcanvasReplaceables, HTML.offcanvasUserTemplate)
    }
    
}
function getHtmlElements() {
    HTML = {
        navbarReplacables: document.getElementById("navbar-replaceable-buttons"),
        offcanvasReplaceables: document.getElementById("offcanvas-replacable-elements"),
        navbarGuestTemplate: document.getElementById("guest-template"),
        navbarUserTemplate: document.getElementById("user-template"),
        offcanvasGuestTemplate: document.getElementById("offcanvas-guest-template"),
        offcanvasUserTemplate: document.getElementById("offcanvas-user-tempplate"),
    }
    return HTML
}
async function fetchUserInfo() {
    const resSessionData = await fetch('/me')
    const userInfo = await resSessionData.json()
    return userInfo
}


function loadContent(parentObject, template) {
    const clone = template.content.cloneNode(true)
    console.log(clone)
    parentObject.appendChild(clone)
}


