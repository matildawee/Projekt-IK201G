/* This JavaScript need jQuery to run */
$(document).ready(function() {

    $('#page-content').load('./pages/start.html');

    function loadPage(clickedId, pageUrl, pageTitle){
        $('#page-content').load(pageUrl);
        $('#navBar-pageTitle').html(pageTitle);
        $('.menuBtn').removeClass('activePage');
        $(clickedId).addClass('activePage');
        // classToggle();
    }

    $('#home').click(function (event) {
        event.preventDefault();
        loadPage('#home','./pages/start.html','Home');
    });

    $('#header-logo').click(function (event) {
        event.preventDefault();
        loadPage('#home','./pages/start.html','Home');
    });

    $('#portfolio').click(function (event) {
        event.preventDefault();
        loadPage('#portfolio','./pages/portfolio.html','Portfolio');

        // laddar in projekten
    //     $.getJSON(
    //         'res/portfolio-data.json',
    //         function (data) {
    //             displayPortfolio(data.projects);
    //         }
    //     );
    });

    $('#about').click(function (event) {
        event.preventDefault();
        loadPage('#about','./pages/about.html','About us');

        // laddar in utvecklarna
        $.getJSON(
            'res/about-data.json',
            function (data) {
                displayAbout(data.person);
            }
        );
    });

    $('#contact').click(function (event) {
        event.preventDefault();
        loadPage('#contact','./pages/contact.html','Contact');
    });

    function classToggle() {
        // $("nav").slideToggle();
        // $("nav").animate({'height': 'toggle'}, 'slow');
        const navs = document.querySelectorAll('nav');
        navs.forEach(nav => nav.classList.toggle('navBar-show'));
      }
      
      document.querySelector('.navButton-toggle')
        .addEventListener('click', classToggle);

    /* <~~~~~ knapparna på startsidan - dessa knappar finns också i extrascript ~~~~~~ */    

    $('#startProjects').click(function (event) {
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