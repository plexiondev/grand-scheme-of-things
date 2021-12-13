// Grab specifier in URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const theme = urlParams.get('d')
console.log("Requested " + theme + " theme in URL");

// Set theme to light if specified
if (theme == "light") {
    let body = (document.body);
    body.classList.remove(`dark`)
    console.log("Set theme to light")
}