// get rate limit info


// define xhr GET
const xhr = new XMLHttpRequest();
const url = `https://api.github.com/rate_limit`;
console.log(`Searching for ${url}`)
xhr.open('GET', url, true);


// latest release
xhr.onload = function() {
    console.log("Found!")

    // parse
    const data = JSON.parse(this.response);
    let resources = data.resources
    let core = resources.core
    let graphql = resources.graphql
    let manifest = resources.integration_manifest
    let search = resources.search

    // grab elements from page
    let core_remaining = document.getElementById('core_remaining');
    let graphql_remaining = document.getElementById('graphql_remaining');
    let manifest_remaining = document.getElementById('manifest_remaining');
    let search_remaining = document.getElementById('search_remaining');

    core_remaining.innerHTML = (`${core.used}`);
    graphql_remaining.innerHTML = (`${graphql.used}`);
    manifest_remaining.innerHTML = (`${manifest.used}`);
    search_remaining.innerHTML = (`${search.used}`);
}


// send
xhr.send();