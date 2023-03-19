$(document).ready(function () {

    var carouselBody = document.querySelectorAll(".carousel-body")
    $(carouselBody).hide();
    $(".active").show();

    $(".next").click(function () {

        let current = $(".active");
        let nextSib = current.next();

        if (nextSib.length) {

            current.fadeOut("slow").removeClass("active");
            setTimeout(() => {
                nextSib.addClass("active").fadeIn("slow");
            }, 700);

        } else {
            nextSib = current.prev();
            current.fadeOut("slow").removeClass("active")
            setTimeout(() => {
                nextSib.addClass("active").fadeIn("slow")
            }, 700);
        }

    });

    $(".previous").click(function () {

        let current = $(".active");
        let prevSib = current.prev();

        if (prevSib.length) {
            current.fadeOut("slow").removeClass("active");
            setTimeout(() => {
                prevSib.addClass("active").fadeIn("slow");
            }, 1000);

        } else {
            prevSib = current.next();
            current.fadeOut("slow").removeClass("active")
            setTimeout(() => {
                prevSib.addClass("active").fadeIn("slow")
            }, 1000);

        }

    });

});