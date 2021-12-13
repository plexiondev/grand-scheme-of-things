(function() {
    let onpageLoad = localStorage.getItem("background-videos") || "";
    let element = document.body;
    element.classList.add(onpageLoad);
})();

    function toggleHeaderVideos() {
        let element = document.body;
        element.classList.toggle("background-videos");

        let option = localStorage.getItem("background-videos");
        if (option && option === "background-videos") {
            localStorage.setItem("background-videos", "");
        } else {
            localStorage.setItem("background-videos", "background-videos");
        }
}