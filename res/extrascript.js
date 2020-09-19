
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
        $.each(projects, function (ind, portfolio) {
            // if (ind % 4 == 0){
            //     var square = $('<div id="div">')
            // }; 
            
            var square = $(
                '<div class="subPortfolio">' + 
                '<img class="project-img" src="' + portfolio.image + '" title="Project" alt="Project">' +
                    '<h1>' + portfolio.title + '</h1>' +
                    '<p>' + portfolio.description + '</p>'+
                    //'<a href="' + portfolio.??? + '">Läs mer</a>' +
                '</div>'
            );
            
            $('.portfolio-box').append(square);

        });
        
    };
    
    /* ~~~~~~ hämtar portfolio json ~~~~~~> */ 