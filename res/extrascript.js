
    /* <~~~~~ knapparna på startsidan ~~~~~~ */    

    $('#startProjects').click(function (event) {
        event.preventDefault();
        $('#page-content').load('./pages/portfolio.html');

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
var projectList = {};
    function displayPortfolio(projects) {
        projectList.projects = new Array();
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
            projectList.projects.push({square});
            
            
            $('.portfolio-box').append(square);
            //$('#listOfBla').append(square);
        });
        console.log(projectList);
    };
    
    /* ~~~~~~ hämtar portfolio json ~~~~~~> */ 