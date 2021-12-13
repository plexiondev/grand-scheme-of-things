(function() {
    let onpageLoad = localStorage.getItem("high-contrast") || "";
    let element = document.body;
    element.classList.add(onpageLoad);
})();

    function toggleHighContrast() {
        let element = document.body;
        element.classList.toggle("high-contrast");

        let option = localStorage.getItem("high-contrast");
        if (option && option === "high-contrast") {
            localStorage.setItem("high-contrast", "");
        } else {
            localStorage.setItem("high-contrast", "high-contrast");
        }
}