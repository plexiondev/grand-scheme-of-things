// Grab URL's project ID
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const project = urlParams.get('a')
console.log(project);

// Create new XMLHttpRequest object
const xhr = new XMLHttpRequest();

// Generate API URL
const url = `https://thingproxy.freeboard.io/fetch/https://api.scratch.mit.edu/users/pushtothelimit/projects/${project}`

// Open a new connection, using a GET request via URL endpoint
// Providing 3 arguments (GET/POST, The URL, Async True/False)
xhr.open('GET', url, true);

// When request is received
// Process it here
xhr.onload = function() {
    // Parse API data into JSON
    const data = JSON.parse(this.response);

    // Grab the project title
    let project_title = document.getElementById('project-title');
    project_title.innerHTML = (`${data.title}`)
    // Grab the project description
    let project_description = document.getElementById('project-description');
    project_description.innerHTML = (`${data.instructions}`)
    // Grab the project's stats
    data2 = data.stats
    let project_views = document.getElementById('project-views');
    project_views.innerHTML = (`${data2.views}`)
    let project_loves = document.getElementById('project-loves');
    project_loves.innerHTML = (`${data2.loves}`)
    let project_favourites = document.getElementById('project-favourites');
    project_favourites.innerHTML = (`${data2.favorites}`)
    let project_remixes = document.getElementById('project-remixes');
    project_remixes.innerHTML = (`${data2.remixes}`)
    // Grab the project's cover
    let project_cover = document.getElementById('project-cover');
    project_cover.style = (`background-image: url(${data.image});`)
    // Grab the project's URL
    let project_play = document.getElementById('project-play');
    project_play.href = (`https://scratch.mit.edu/projects/${data.id}`)
}

// Send the request to the server
xhr.send();