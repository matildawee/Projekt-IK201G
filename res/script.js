/* This JavaScript need jQuery to run */
$(document).ready(function() {

    $('#page-content').load('./pages/start.html');

    $('#home').click(function (event) {
        event.preventDefault();
        $('#page-content').load('./pages/start.html');
    });

    $('#portfolio').click(function (event) {
        event.preventDefault();
        $('#page-content').load('./pages/portfolio.html');
    });

    $('#about').click(function (event) {
        event.preventDefault();
        $('#page-content').load('./pages/about.html');
    });

    $('#contact').click(function (event) {
        event.preventDefault();
        $('#page-content').load('./pages/contact.html');
    });

    function classToggle() {
        const navs = document.querySelectorAll('.navBarItems')
        
        navs.forEach(nav => nav.classList.toggle('navBarToggleShow'));
      }
      
      document.querySelector('.navBarLink-toggle')
        .addEventListener('click', classToggle);

});