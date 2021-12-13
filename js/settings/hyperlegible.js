(function() {
    let onpageLoad = localStorage.getItem("hyperlegible") || "";
    let element = document.body;
    element.classList.add(onpageLoad);
})();

    function toggleHyperlegibleFont() {
        let element = document.body;
        element.classList.toggle("hyperlegible");

        let hyperlegible = localStorage.getItem("hyperlegible");
        if (hyperlegible && hyperlegible === "hyperlegible") {
            localStorage.setItem("hyperlegible", "");
        } else {
            localStorage.setItem("hyperlegible", "hyperlegible");
        }
}