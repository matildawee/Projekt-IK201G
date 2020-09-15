
$(document).ready(function() {

    $('#page-content').load('start.html');

    $('#home').click(function (event) {
        event.preventDefault();
        $('#page-content').load('start.html');
    });

    $('#portfolio').click(function (event) {
        event.preventDefault();
        $('#page-content').load('portfolio.html');
    });

    $('#aboutUs').click(function (event) {
        event.preventDefault();
        $('#page-content').load('aboutUs.html');
    });

});

