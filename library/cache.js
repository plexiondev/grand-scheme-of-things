// reset cache


const repos = {
    0: "haunting-hunters",
    1: "survival-games-map"
};

// reset project storage
function resetProjectStorage() {
    console.log("Deleting all project storage...")
    for (let i in repos) {
        localStorage.removeItem(`${repos[i]}_archived`);
        localStorage.removeItem(`${repos[i]}_cachel`);
        localStorage.removeItem(`${repos[i]}_description`);
        localStorage.removeItem(`${repos[i]}_name`);
        localStorage.removeItem(`${repos[i]}_tag`);
        localStorage.removeItem(`${repos[i]}_tags`);
        localStorage.removeItem(`${repos[i]}_updated`);
        console.log(`Deleted all from ${repos[i]}`)
    }
    console.log("Deleting library storage...")
    localStorage.removeItem("library");
    localStorage.removeItem("library_cache");
}

// reset analytics storage
function resetAnalyticStorage() {
    console.log("Deleting all analytics storage...")
    for (let i in repos) {
        localStorage.removeItem(`${repos[i]}`);
        localStorage.removeItem(`${repos[i]}_cache`);
        console.log(`Deleted all from ${repos[i]}`)
    }
}

// reset ALL storage
function resetStorage() {
    console.log("Deleting all storage...")
    for (let i in repos) {
        localStorage.removeItem(`${repos[i]}_archived`);
        localStorage.removeItem(`${repos[i]}_cachel`);
        localStorage.removeItem(`${repos[i]}_description`);
        localStorage.removeItem(`${repos[i]}_name`);
        localStorage.removeItem(`${repos[i]}_tag`);
        localStorage.removeItem(`${repos[i]}_tags`);
        localStorage.removeItem(`${repos[i]}_updated`);
        localStorage.removeItem(`${repos[i]}`);
        localStorage.removeItem(`${repos[i]}_cache`);
        console.log(`Deleted all from ${repos[i]}`)
    }
    localStorage.removeItem("library");
    localStorage.removeItem("library_cache");
}