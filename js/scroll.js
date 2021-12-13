$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 30) {
        $("body").addClass("scrolled");
        $("header").addClass("scrolled");
    } else {
        $("body").removeClass("scrolled");
        $("header").removeClass("scrolled");
    }
});