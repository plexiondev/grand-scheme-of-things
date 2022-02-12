// get repos from github


// define xhr GET
const xhr = new XMLHttpRequest();
const url = `https://api.github.com/orgs/plex1on/repos`;
xhr.open('GET', url, true);


// request is received
xhr.onload = function() {

    // parse
    const data = JSON.parse(this.response)
    let root = document.getElementById('userRepos');

    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }

    // error response
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
    } else { // success

        // get lists
        let maps = document.getElementById('maps');
        // deprecated (still required for now)
        let header = document.getElementById('reposHeader');
        let ul = document.getElementById('userRepos');

        // loop over pool
        for (let i in data) {

            // create element
            let card = document.createElement('a');
            card.classList.add('card');
            card.classList.add('hover');
            
            // parse link
            let link = `${data[i].name}`.replace(/\-/g,'').toLowerCase(); //replace dashes with empty & lower
            card.href = `/library/${link}/`

            // update date
            var d = new Date(`${data[i].pushed_at}`);
            var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var date = month[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();

            // name
            let name = `${data[i].name}`.replace(/\-/g,' '); //replace dashes with spaces

            // html
            card.innerHTML = (`
            <div class="cover"><img src="/library/${link}/cover.png"></div>
            <div class="info">
            <h4 class="text-20">${name}</h4>
            <p>${data[i].description}</p>
            <p class="col-alt over">${date}</p>
            </div>
            <div class="featuring">
            <svg class="datapack" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-code icon w-20"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            <svg class="resourcepack" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy icon w-20"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <svg class="map" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe icon w-20"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            `);

            // project tags/(topics)
            let topics = data[i].topics;
            for (let t2 in data[i].topics) {
                let t = topics[t2];

                if (t == "gsot") {
                    // maps
                    maps.appendChild(card);
                    card.classList.add("map");
                } // skip if else
            }

        }

    }
}


// send
xhr.send();