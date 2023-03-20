$(document).ready(function () {
    var search = document.querySelector(".search")

    $(".search-bar").hover(function () {
        $(".search-bar").css("width", "100%");
        $(search).css("padding", "8px");
        $("input:text").attr('placeholder', 'Пошук');
        $(".search-icon").css("background", "white");

    }, function () {
        if (search.value == "") {
            $(".search-bar").css("width", "70px")
            $(search).css("padding", "8px 0px")
            $("input:text").attr('placeholder', '');
            $(".search-icon").css("background", "rgb(0, 91, 187)");

        } else {
            $(".search-bar").css("width", "100%");
            $(search).css("padding", "8px");
            $("input:text").attr('placeholder', 'Пошук');
            $(".search-icon").css("background", "white");


        }

    });

});