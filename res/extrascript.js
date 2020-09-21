
    /* <~~~~~ knapparna på startsidan ~~~~~~ */    

    $('#startProjects').click(function (event) {
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

    $('#startUs').click(function (event) {
        event.preventDefault();
        $('#page-content').load('./pages/about.html');
        $('#navBar-pageTitle').html('About');
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

        var divlista;

        var startdiv = "<div id=stordiv>";
        var slutdiv = "</div>";
        
        var helaGrejen = "<div id=stordiv>";

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

            console.log(ind);
            console.log(square);

            if (ind > 0 && ind+1 % 4 == 0){

                //var startdiv = $('<div id="stordiv' + ind + '">');                
                //var helaDiven = startdiv + square + '</div>';

                helaGrejen += slutdiv;
                divlista[ind] = helaGrejen;

                console.log(helaGrejen);

                //helaGrejen = startdiv;
            
                
            }; 
           
            //$('.portfolio-box').append(square);

        });

        console.log(divlista);
        
    };
    
    /* ~~~~~~ hämtar portfolio json ~~~~~~> */ 