
    /* <~~~~~ knapparna på startsidan ~~~~~~ */    

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


    /* <~~~~~ hämtar portfolio json ~~~~~~ */    

    function displayPortfolio(portfolios) {
        $.each(portfolioss, function (ind, portfolio) {
            var row = $(
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
            row.find('button').click(function () {
                addToBasket(book);
            });
            $('#listOfBooks').append(row);
        });
    
    }




    /* ~~~~~~ hämtar portfolio json ~~~~~~> */ 