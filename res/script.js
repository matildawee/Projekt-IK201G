
$(document).ready(function() {

    $('main').load('start.html');

    $('#home').click(function (event) {
        event.preventDefault();
        $('main').load('start.html');
    });

    $('#portfolio').click(function (event) {
        event.preventDefault();
        $('main').load('portfolio.html');
    });

    $('#aboutUs').click(function (event) {
        event.preventDefault();
        $('main').load('aboutUs.html');
    });

});

