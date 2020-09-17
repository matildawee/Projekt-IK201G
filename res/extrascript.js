
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


