$(document).ready(function() {
        
    var divList = [];
    var divIndex = 0;
    var index = 0;

    var showIndex = 0;

    
    $.getJSON(
        'res/portfolio-data.json',
        function (data) {
            displayPortfolio(data.projects);
        }
    );

    function displayPortfolio(projects) {

    var startDiv = '<div id="portfolioGroup">';
    var endDiv = '</div>';
    var projectGroup = startDiv;

    $.each(projects, function (i, portfolio) {          
        var aProject = 
            '<div class="subPortfolio">' + 
            '<img class="project-img" src="' + portfolio.image + '" title="Project" alt="Project">' +
                '<h1>' + portfolio.title + '</h1>' +
                '<p>' + portfolio.description + '</p>' +
            '</div>';
        
        //skapar en div per projekt

        projectGroup += aProject;


        if (i > 0 && (i + 1) % 4 == 0){
            projectGroup += endDiv;
            divList[divIndex] = projectGroup;
            divIndex++;
            projectGroup = startDiv;    
            //för var fjärde div så skapas en slut tag, sen lagras diven i en yttre div
        };       
        index++;     
    });

    if (index == 0){
        divList = '';
        //tömmer diven ifall inga projekt finns
    };

    if ((index + 1) % 4 != 0){
        projectGroup += endDiv;
        divList[divIndex] = projectGroup;    
        //lägger till slut-div-tagg       
    };
    
    if (divList[divList.length-1] == '<div id="portfolioGroup"></div>'){
        divList.splice(divList.length-1,1); 
        //raderar en sista tom div som skapas när antalet projekt är delbart med 4
    }

    console.log(divList);
    $('#portfolio-box').html(divList[0]);
    
    };

    $('#arrowRight').click(function () {
        
        showIndex++;

        if (showIndex == divList.length){
            showIndex = 0;
        }

        $('#portfolio-box').html(divList[showIndex]);
        
    });

    $('#arrowLeft').click(function () {
        
        showIndex--;

        if (showIndex < 0){
            showIndex = divList.length - 1;
        }

        $('#portfolio-box').html(divList[showIndex]);
        
    });

});