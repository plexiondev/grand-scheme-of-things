// project directory


const view_types = {
    'all': 0,
    'event': 1,
    'datapack': 2,
    'resourcepack': 3,
    'map': 4
}
const info_headers = {
    'pmc': 'PMC',
    'github': 'Github',
    'issues': 'Support email'
};

// set default view
const dir_query = window.location.search;
const dir_url = new URLSearchParams(dir_query);
const dir_view = dir_url.get('c') || "all";

// create category list
$.get( `/js/directory.json`, function( response ) {
    let data = response;

    for (let i in data.categories) {
        let category = document.createElement('li');
        category.classList.add('category',`sort_${data.categories[i].type}`);

        category.innerHTML = (`
        <button onclick="directory('${data.categories[i].type}')">
            <i class="icon w-24" data-feather="${data.categories[i].icon}"></i>
            <h4>${data.categories[i].name}</h4>
        </button>
        `);

        // append
        document.getElementById('list').appendChild(category);
    }
    for (let i in data.links) {
        let link = document.createElement('li');

        link.innerHTML = (`
        <a href="${data.links[i].link}" target="_blank">${info_headers[data.links[i].type]}</a>
        `);

        // append
        document.getElementById('links').appendChild(link);
    }
    feather.replace();
});

let categories = document.getElementById('list').getElementsByClassName('category');
setTimeout(function() {
    directory(dir_view,undefined);
}, 130);

// sort by directory type
function directory(type) {
    let search = document.getElementById('search').value || undefined;
    
    log('general',`Searching by ${type}, ${search}`);
    request(type,search);

    // make selected (run through each child)
    // essentially (for let i in x) but done manually (i = 0 sets the default, i++ adds 1 every run)
    for (i = 0; i < categories.length; i++) {
        categories[i].classList.remove('focus');

        // find type
        categories[view_types[type]].classList.add('focus');
    }
}

// request data
function request(type,search) {
    // cache
    let cached_out = localStorage.getItem("library_cache") || "";
    let cache = localStorage.getItem("library") || "";
    let now = new Date();

    // if not cached
    if (Date.parse(now) >= Date.parse(cached_out) || cached_out == "") {
        // define xhr GET
        const xhr = new XMLHttpRequest();
        const url = `https://api.github.com/orgs/plex1on/repos`;
        xhr.open('GET', url, true);
        
        xhr.onload = function() {

            // send off
            try {
                parse(JSON.parse(this.response),type,search);
                // cache
                localStorage.setItem("library", this.response);
            }
            catch(error) {
                log('error',error.message);
            }
        }

        // send
        xhr.send();

        // then cache
        now = new Date(now);
        now.setMinutes ( now.getMinutes() + 7 );
        log('general',`Cached until ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} (7 min)`);
        localStorage.setItem("library_cache", now);
    } else {
        // send off
        try {
            parse(JSON.parse(cache),type,search);
        }
        catch(error) {
            log('error',error.message);
        }
    }
}

// parse
function parse(data,type,search) {
    // clear
    document.getElementById('cards').innerHTML = '';
    document.getElementById('cards').classList.remove('error-override');

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
        
        // gsot check :tm:
        let topics = data[i].topics;
        let cover = `/library/${link}/cover.png`;
        for (let t2 in data[i].topics) {
            let t = topics[t2];

            if (t == "gsot") {
                card.href = `https://gsot.plexion.dev/library/${link}/`;
                cover = `https://gsot.plexion.dev/library/${link}/cover.png`;
            }
        }

        // html
        card.innerHTML = (`
        <div class="cover"><img src="${cover}"></div>
        <div class="info">
        <h4>${name}</h4>
        <p>${data[i].description}</p>
        <p class="col-alt over">${date}</p>
        </div>
        <div class="featuring">
        <svg class="event" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award icon w-24"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
        <svg class="datapack" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-code icon w-20"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
        <svg class="resourcepack" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy icon w-20"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        <svg class="map" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe icon w-20"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
        </div>
        `);

        // project tags/(topics)
        for (let t2 in data[i].topics) {
            let t = topics[t2];

            if (t == "datapack" && (type == "datapack" || type == "all") && criteria(name,data[i].description,search)) {
                // datapacks
                card.classList.add("datapack");

                // append
                document.getElementById('cards').appendChild(card);
            } else if (t == "resourcepack" && (type == "resourcepack" || type == "all") && criteria(name,data[i].description,search)) {
                // resourcepacks
                card.classList.add("resourcepack");

                // append
                document.getElementById('cards').appendChild(card);
            } else if (t == "map" && (type == "map" || type == "all") && criteria(name,data[i].description,search)) {
                // maps
                card.classList.add("map");

                // append
                document.getElementById('cards').appendChild(card);
            } else if (t == "event" && (type == "event" || type == "all") && criteria(name,data[i].description,search)) {
                // events
                card.classList.add("event");

                // append
                document.getElementById('cards').appendChild(card);
            } // skip if else (beta)
        }

    }

    // if no results
    if (document.getElementById('cards').children.length == 0) {
        document.getElementById('cards').classList.add('error-override');
        document.getElementById('cards').innerHTML = (`
        <span class="error">
            <h3>Nothing...</h3>
            <p class="text-18">Try a different search query or category</p>
        </span>
        `);
    }
}

// check if matches search criteria
function criteria(name,description,search) {
    // check if search is passed
    if (search != undefined) {
        if ((name.toLowerCase()).includes(search.toLowerCase())) {
            // does name contain search
            return true;
        } else if ((description.toLowerCase()).includes(search.toLowerCase())) {
            // does description contain search
            return true;
        } else {
            return false;
        }
    } else {
        // search is null (no entry)
        return true;
    }
}

// take search
function search() {
    req = document.getElementById('search').value;

    directory('all');
}

// clear search
function clear_search() {
    console.log('a')
    document.getElementById('search').value = "";
    search();
}

// enter
$("#search").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#search-con").click();
    }
});

// escape
$("#search").keyup(function(event) {
    if (event.keyCode === 27) {
        clear_search();
    }
});