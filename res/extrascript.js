    /* <~~~~~ knapparna på startsidan ~~~~~~ */    

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
        $("#personDiv").hide();
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
        va        r slutdiv = "</div>";
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
                '<div class="about-developer" id="persondiv' + ind + '">' + 
                '<img src="' + employee.image + '" title="developer" alt="developer">' +
                    '<h1>' + employee.firstname + '</h1>' +
                    '<p>' + employee.title + '</p>'+
                '</div>'
            );        

        $('#about-submain').append(personSquare);
        });

        //$("#personDiv").hide();
    };
   

    $('.about-main').find("div").click(function (event) {
        event.preventDefault();
        $(this).find("img");
        var id = (event.target.id);
        
        console.log(id);
        
        //$('#page-content').load('./pages/about.html');
        //$('#navBar-pageTitle').html('About');

 

        // ladda in info om utvecklare?
        // $.getJSON(
        //     'res/about-data.json',
        //     function (data) {
        //         displayAbout(data.person);
        //     }
        // );
    });



    /* ~~~~~ hämtar oss json ~~~~~> */ 