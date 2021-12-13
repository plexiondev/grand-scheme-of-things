(function() {
    let onpageLoad = localStorage.getItem("legacygallery") || "";
    let element = document.body;
    element.classList.add(onpageLoad);
})();

    function legacyGallery() {
        let element = document.body;
        element.classList.toggle("legacygallery");

        let option = localStorage.getItem("legacygallery");
        if (option && option === "legacygallery") {
            localStorage.setItem("legacygallery", "");
        } else {
            localStorage.setItem("legacygallery", "legacygallery");
        }
}