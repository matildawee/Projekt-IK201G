    /* <~~~~~ knapparna på startsidan ~~~~~~ */    

    $(document).ready(function(){
        $("#welcome").animate({opacity: '1'}, 1500);
    });

    function loadPage(clickedId, pageUrl, pageTitle){
        $('#page-content').load(pageUrl);
        $('#navBar-pageTitle').html(pageTitle);
        $('.menuBtn').removeClass('activePage');
        $(clickedId).addClass('activePage');
    }

    $('#startProjects').click(function (event) {
        event.preventDefault();
        loadPage('#portfolio','./pages/portfolio.html','Portfolio');

        // laddar in projekten    
        $.getJSON(
            'res/portfolio-data.json',
            function (data) {
                displayPortfolio(data.projects);
            }
        );
    });

    $('#startUs').click(function (event) {
        event.preventDefault();
        loadPage('#about','./pages/about.html','About us');

        // laddar in utvecklarna
        $.getJSON(
            'res/about-data.json',
            function (data) {
                displayAbout(data.person);
            });
    });

    /* ~~~~~~ knapparna på startsidan ~~~~~~> */  


    /* <~~~~~ hämtar portfolio json ~~~~~~ */    

    // $('#testknapp').click(function () {
    //     console.log("hej knapptryckare");
    //     $.getJSON(
    //         'res/portfolio-data.json',
    //         function (data) {
    //             displayPortfolio(data.projects);
    //         }
    //     );
    // });

    function displayPortfolio(projects) {

        var divlista = new Array();
        var divindex = 0;
        
        var startdiv = "<div id='stordiv'>";
        var slutdiv = "</div>";
        var helaGrejen = "<div id='stordiv'>";

        $.each(projects, function (ind, portfolio) {          
            var square = $(
                '<div class="subPortfolio">' + 
                '<img class="project-img" src="' + portfolio.image + '" title="Project" alt="Project">' +
                    '<h1>' + portfolio.title + '</h1>' +
                    '<p>' + portfolio.description + '</p>'+
                    //'<a href="' + portfolio.??? + '">Läs mer</a>' +
                '</div>'
            );
            helaGrejen += square;
            //$('#portfolio-box').append(square);
            if (ind > 0 && (ind + 1) % 4 == 0){
                //var startdiv = $('<div id="stordiv' + ind + '">');                
                //var helaDiven = startdiv + square + '</div>';
                helaGrejen += slutdiv;
                divlista[divindex] = helaGrejen;
                //console.log(helaGrejen);
                divindex++;
                helaGrejen = startdiv;        
            };            
        });
        if (ind = 0){
            divlista = '';
        };
        if ((ind + 1) % 4 != 0){
            helaGrejen += slutdiv;
            divlista[divindex] = helaGrejen;           
        };
        console.log(divlista);
        $('#portfolio-box').append(divlista[0]);
    };


    /* ~~~~~~ hämtar portfolio json ~~~~~> */ 

    
    /* <~~~~~ hämtar oss json ~~~~~~ */ 



    function displayAbout(person) {
        $.each(person, function (ind, employee) {                        
            var personSquare = $(
                '<div class="about-developer" id="personId' + ind + '">' + 
                '<img id="personId' + ind + '" src="' + employee.portrait + '" title="developer" alt="developer">' +
                    '<h1 id="personId' + ind + '">' + employee.firstname + '</h1>' +
                    '<p id="personId' + ind + '">' + employee.title + '</p>'+
                '</div>'
            );        

        $('#about-submain').append(personSquare);
        });

        //$("#personDiv").hide();
    };
   

    $('.about-main').find("div").click(function (event) {
        event.preventDefault();
        // $(this).find("img");
        var id = (event.target.id);
        $(".person-content").show();
        $(".persondiv").show();
        console.log(id);
        

        //ladda in info om utvecklare?
        $.getJSON(
            'res/about-data.json',
            function (data) {
                getDeveloper(data.person, id);
            }
        );
    });

    function getDeveloper(person, id) {
        $.each(person, function (ind, employee) { 
            
                if (employee.id == id)
                {
                    var developerSquare = $(
                        '<div class="person-content" id="personId' + ind + '">' + 
                            '<div class="person-content-left">' +
                                '<span class="fas fa-times" id="close-person"></span>' +
                                '<img src="' + employee.portraitBig + '" title="developer" alt="developer">' +                                
                            '</div>' +
                            '<div class="person-content-right">' +
                                '<h2>' + employee.firstname + ' ' + employee.lastname + '</h2>' +
                                '<h3>' + employee.title + '</h3>'+
                                '<h3>Contact</h3>'+
                                '<p>' + employee.email + '</p>'+
                                '<p>' + employee.telephone + '</p>'+
                                '<p>skillz</p>' +
                            '</div>' +
                        '</div>'
                    );
                $('.persondiv').html(developerSquare);             
                };
        });
    };

    // $('.about-personal').find(".persondiv").click(function (event) {
    //     event.preventDefault();
    //     console.log("persondiveeeeen");

    //     $(".person-content").hide();
    //     $(".persondiv").hide();

    // });


    $(".about-personal").on("click", "#close-person", function(event){
        event.preventDefault();
        $('.persondiv').html('');
        $(".person-content").hide();
        $(".persondiv").hide();

        
    });

    $(".about-personal").on("click", "#thePersondiv", function(event){
        if(event.target.id=="thePersondiv"){
            event.preventDefault();
            $('.persondiv').html('');
            $(".person-content").hide();
            $(".persondiv").hide();
        };
        
    });

    /* ~~~~~ hämtar oss json ~~~~~> */ 