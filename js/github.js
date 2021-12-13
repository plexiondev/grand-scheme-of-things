// Create new XMLHttpRequest object
const xhr = new XMLHttpRequest();

// GitHub endpoint, dynamically passing in specified username
const url = `https://api.github.com/orgs/plex1on/repos`;

// Open a new connection, using a GET request via URL endpoint
// Providing 3 arguments (GET/POST, The URL, Async True/False)
xhr.open('GET', url, true);

// When request is received
// Process it here
xhr.onload = function() {

    // Parse API data into JSON
    const data = JSON.parse(this.response)
    let root = document.getElementById('userRepos');
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    if (data.message === "Not Found") {
        let ul = document.getElementById('error');

        // Create variable that will create li's to be added to ul

            // Create the html markup for each li
        ul.innerHTML = (`
        <section class="center limited" style="position: relative; bottom: 100px;">
            <div class="big-card">
                <i class="material-icons" style="font-size: 64px; color: var(--text-head);">error</i>
                <h3>Error 404</h3>
                <p class="text-18">We're having some issues connecting to Github. Check your network connection.</p>
            </div>
        </section>
        `);
    } else {

        // Get the ul with id of of userRepos
        let header = document.getElementById('reposHeader');
        let ul = document.getElementById('userRepos');
        let datapacks = document.getElementById('datapacks');
        let resourcepacks = document.getElementById('resourcepacks');
        let maps = document.getElementById('maps');
        // Loop over each object in data array
        for (let i in data) {

            // Create variable that will create li's to be added to ul
            let li = document.createElement('a');
            //li.href = `${data[i].html_url}`
            let link = `${data[i].name}`.replace(/\-/g,'').toLowerCase();
            li.href = `/library/${link}/`

            // Add Bootstrap list item class to each li
            li.classList.add('card')
            li.classList.add('hover')

            // Date formatting
            var d = new Date(`${data[i].pushed_at}`);
            var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            var date = month[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();

            let updated = (date);
            // Create the html markup for each li
            let name = `${data[i].name}`.replace(/\-/g,' ');
            li.innerHTML = (`
            <div class="cover"><img src="/library/${link}/cover.png"></div>
            <div class="info">
            <h3 class="text-20">${name}</h3>
            <p>${data[i].description}</p>
            <p class="col-alt over">${updated}</p>
            </div>
            `);

            // append
            let topics = data[i].topics;
            if (topics[0] == "datapack") {
                datapacks.appendChild(li);
            } else if (topics[0] == "resourcepack" || name == "Metro Dark Theme") {
                resourcepacks.appendChild(li);
            } else if (topics[0] == "map") {
                maps.appendChild(li);
            }

        }

    }
}

// Send the request to the server
xhr.send();