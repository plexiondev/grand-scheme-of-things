(function() {
    let onpageLoad = localStorage.getItem("snowoff") || "";
    let element = document.body;
    element.classList.add(onpageLoad);
})();

    function toggleSnow() {
        let element = document.body;
        element.classList.toggle("snowoff");

        let option = localStorage.getItem("snowoff");
        if (option && option === "snowoff") {
            localStorage.setItem("snowoff", "");
        } else {
            localStorage.setItem("snowoff", "snowoff");
        }
}