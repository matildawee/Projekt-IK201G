/* This JavaScript need jQuery to run */
$(document).ready(function() {

    $('#page-content').load('./pages/contact.html');

    $('#home').click(function (event) {
        event.preventDefault();
        $('#page-content').load('./pages/start.html');
        $('#navBar-pageTitle').html('Home');
    });

    $('#header-logo').click(function (event) {
        event.preventDefault();
        $('#page-content').load('./pages/start.html');
        $('#navBar-pageTitle').html('Home');
    });

    $('#portfolio').click(function (event) {
        event.preventDefault();
        $('#page-content').load('./pages/portfolio.html');
        $('#navBar-pageTitle').html('Portfolio');

        // laddar in projekten
        $.getJSON(
            'res/portfolio-data.json',
            function (data) {
                displayPortfolio(data.projects);
            }
        );
    });

    $('#about').click(function (event) {
        event.preventDefault();
        $('#page-content').load('./pages/about.html');
        $('#navBar-pageTitle').html('About');
    });

    $('#contact').click(function (event) {
        event.preventDefault();
        $('#page-content').load('./pages/contact.html');
        $('#navBar-pageTitle').html('Contact');
    });

    function classToggle() {
        const navs = document.querySelectorAll('nav')
        
        navs.forEach(nav => nav.classList.toggle('navBar-show'));
      }
      
      document.querySelector('.navButton-toggle')
        .addEventListener('click', classToggle);

    /* <~~~~~ knapparna på startsidan - dessa knappar finns också i extrascript ~~~~~~ */    

    $('#startProjects').click(function (event) {
        console.log("hej knapptryckare");
        event.preventDefault();
        $('#page-content').load('./pages/portfolio.html');
    });

    $('#startUs').click(function (event) {
        event.preventDefault();
        $('#page-content').load('./pages/about.html');
    });




    /* ~~~~~~ knapparna på startsidan ~~~~~~> */  


    /* portfoliotest */
    // $('#autoWidth').lightSlider({
    //     autoWidth:true,
    //     loop:true,
    //     onSliderLoad: function() {
    //         $('#autoWidth').removeClass('cS-hidden');
    //     } 
    // });  


 });
