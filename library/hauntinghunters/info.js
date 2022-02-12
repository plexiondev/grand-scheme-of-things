// get info of latest release + general repo from github


let repo = 'haunting-hunters';

// define xhr GET
// latest release
const xhr = new XMLHttpRequest();
const url = `https://api.github.com/repos/plex1on/` + repo + `/releases/latest`;
xhr.open('GET', url, true);
// general repo
const repo_xhr = new XMLHttpRequest();
const repo_url = `https://api.github.com/repos/plex1on/` + repo;
repo_xhr.open('GET', repo_url, true);


// latest release
xhr.onload = function() {

    // parse
    const data = JSON.parse(this.response);

    // grab elements from page
    let updated = document.getElementById('updated');
    let release_date = document.getElementById('release-date');
    let release_name = document.getElementById('release-name');
    let release_description = document.getElementById('release-description');


    // take release upload date

    // parse date
    var formattedDate = new Date(`${data.published_at}`);
    var d = formattedDate.getDate();
    var m =  formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    var y = formattedDate.getFullYear();

    if (d < 10) {
        d = "0" + d;
    }
    if (m < 10) {
        m = "0" + m;
    }

    var seconds = Math.floor((new Date() - formattedDate) / 1000);
    var interval = seconds / 31536000;

    interval = seconds / 2592000;
    if (interval > 1) {
        var months = Math.floor(interval);
    }
    interval = seconds / 86400;
    if (interval > 1) {
        var days = Math.floor(interval);
    }
    interval = seconds / 3600;
    if (interval > 1) {
        var hours = Math.floor(interval);
    }
    interval = seconds / 60;
    if (interval > 1) {
        var minutes = Math.floor(interval);
    }

    // display in metadata (d/m/y)
    updated_date = (d + "/" + m + "/" + y);
    updated.innerHTML = (`${updated_date}`)
    // display in release embed
    date = (d + "/" + m + "/" + y);
    if (minutes <= 60) {
        if (minutes == 1) {
            release_date.innerHTML = (`${minutes} minute ago`)
        } else {
            release_date.innerHTML = (`${minutes} minutes ago`)
        }
    } else if (hours <= 24) {
        if (hours == 1) {
            release_date.innerHTML = (`${hours} hour ago`)
        } else {
            release_date.innerHTML = (`${hours} hours ago`)
        }
    } else if (days <= 31) {
        if (days == 1) {
            release_date.innerHTML = (`${days} day ago`)
        } else {
            release_date.innerHTML = (`${days} days ago`)
        }
    } else if (months <= 12) {
        if (months == 1) {
            release_date.innerHTML = (`${months} month ago`)
        } else {
            release_date.innerHTML = (`${months} months ago`)
        }
    } else {
        release_date.innerHTML = (`${date}`)
    }



    // release name
    if (data.tag_name.indexOf("beta") >= 0) {
        document.body.classList.add("beta");
    }
    release_name.innerHTML = (`Version ${data.tag_name}: ${data.name}`)


    // release description
    var converter = new showdown.Converter();
    text = `${data.body}`;
    html = converter.makeHtml(text);
    release_description.innerHTML = (`${html}`)


    // release downloads (deprecated)
    //let release_downloads = document.getElementById('release-downloads');
    //data2 = data.assets
    //data3 = data2[0]
    //release_downloads.innerHTML = (`${data3.download_count} \(on Github\)`)


    // release size (deprecated)
    //let release_size = document.getElementById('release-size');
    //var sizetemp = (((data3.size / 10) / 10) / 10)
    //var sizetemp2 = Math.round(sizetemp * 10) / 10
    //release_size.innerHTML = (`${sizetemp2}KB`)
}


// general repo
repo_xhr.onload = function() {

    // parse
    const repo_data = JSON.parse(this.response);

    // grab elements from page
    let tags = document.getElementById('tags');
    

    // project tags
    let topics = repo_data.topics
    tags.textContent = `${topics}`.replace(/\,/g,' ');

    // archived check
    let archived = repo_data.archived
    if (archived == true) {
        document.body.classList.add("archived");
    }
}

// send
xhr.send();
repo_xhr.send();