// Date
var countDownDate = new Date("October 16, 2021 17:00:00").getTime();
        
// Countdown
var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = ("0"+Math.floor(distance / (1000 * 60 * 60 * 24))).toString().slice(-2);
    var hours = ("0"+Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toString().slice(-2);
    var minutes = ("0"+Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).toString().slice(-2);
    var seconds = ("0"+Math.floor((distance % (1000 * 60)) / 1000)).toString().slice(-2);

    // Result
    if (days == "00") {
        if (hours == "00") {
            if (minutes == "00") {
                document.getElementById("countdown").innerHTML = (seconds);
            }
            else {
                document.getElementById("countdown").innerHTML = (minutes + ":" + seconds);
            }
        }
        else {
            document.getElementById("countdown").innerHTML = (hours + ":"
    + minutes + ":" + seconds);
        }
    }
    else {
        document.getElementById("countdown").innerHTML = (days + ":" + hours + ":"
    + minutes + ":" + seconds);
    }

    // When finished
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = `
        <div class="video">
        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/bjY04q-SHNY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`;
    }
}, 1000);

// Based on original MC Live Countdown from 2020 - https://plexion.dev/versions/plexion.online/minecraft_live