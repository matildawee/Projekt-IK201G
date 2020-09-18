
    /* <~~~~~ knapparna på startsidan ~~~~~~ */    

    $('#startProjects').click(function (event) {
        event.preventDefault();
        $('#page-content').load('./pages/portfolio.html');

 
    });

    $('#startUs').click(function (event) {
        event.preventDefault();
        $('#page-content').load('./pages/about.html');
    });

    /* ~~~~~~ knapparna på startsidan ~~~~~~> */  


    /* <~~~~~ hämtar portfolio json ~~~~~~ */    

    $('#testknapp').click(function () {
        console.log("hej knapptryckare");
        $.getJSON(
            'res/portfolio-data.json',
            function (data) {
                displayPortfolio(data.portfolios);
            }
        );
    });

    function displayPortfolio(projects) {
        $.each(projects, function (ind, portfolio) {
            var square = $(
                // '<tr>' +
                //     '<td>' + portfolio.title + '</td>' +
                //     '<td>' + portfolio.date + '</td>' +
                //     '<td>' + portfolio.description + '</td>' +
                //     '<td>' + portfolio.image + '</td>' +
                //     '<td><button>L&auml;gg i korg</button></td>' +
                // '</tr>'
                '<div class="subPortfolio">' + 
                '<img class="project-img" src="' + portfolio.image + '" title="Project" alt="Project">' +
                    '<h1>' + portfolio.title + '</h1>' +
                    '<p>' + portfolio.description + '</p>'+
                    //<a href="">Läs mer</a>
                '</div>'

                
            );

            $('.portfolio-main').append(square);


        });
    
    }




    /* ~~~~~~ hämtar portfolio json ~~~~~~> */ 