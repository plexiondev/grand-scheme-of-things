// Create new XMLHttpRequest object
const xhr2 = new XMLHttpRequest();

// GitHub endpoint, dynamically passing in specified username
const url2 = `https://api.github.com/users/plexiondev/repos`;

// Open a new connection, using a GET request via URL endpoint
// Providing 3 arguments (GET/POST, The URL, Async True/False)
xhr2.open('GET', url2, true);

// When request is received
// Process it here
xhr2.onload = function() {

    // Parse API data into JSON
    const data = JSON.parse(this.response)
    let root = document.getElementById('localUser');
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    if (data.message === "Not Found") {
        let ul = document.getElementById('error2');

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
        let ul = document.getElementById('localUser');
        // Loop over each object in data array
        for (let i in data) {
            // Create variable that will create li's to be added to ul
            let li = document.createElement('a');
            //li.href = `${data[i].html_url}`
            let link = `${data[i].name}`.replace(/\-/g,'').toLowerCase();
            li.href = `${data[i].html_url}`

            // Add Bootstrap list item class to each li
            li.classList.add('card')
            li.classList.add('hover')

            // Date formatting
            var d = new Date(`${data[i].pushed_at}`);
            var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            var date = month[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();

            let updated = (date);
            // Create the html markup for each li
            let name = `${data[i].name}`;
            li.innerHTML = (`
            <div class="info">
            <h3 class="text-28">${name}</h3>
            <p>${data[i].description}</p>
            <p class="col-alt ${data[i].name}">${updated}</p>
            </div>
            `);

            // Append each li to the ul
            ul.appendChild(li);

        }

    }
}

// Send the request to the server
xhr2.send();