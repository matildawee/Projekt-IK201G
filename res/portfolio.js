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
            '<div class="subPortfolio" id="' + portfolio.projectId + '">' + 
            '<img class="project-img" id="' + portfolio.projectId + '"src="' + portfolio.image + '" title="Project" alt="Project">' +
                '<h1 id="' + portfolio.projectId + '">' + portfolio.title + '</h1>' +
                '<p id="' + portfolio.projectId + '">' + portfolio.description + '</p>' +
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
    $('#portfolio-box').html(divList[0]);
    
    };

    $('#arrowRight').click(function () {
        
        //$('#portfolio-box').fadeout();
        //$("#portfolio-box").delay( 100 ).fadeIn( 100 );
        //$("#portfolio-box").find("#portfolioGroup").fadeOut( 200 ).delay( 400 ).fadeIn( 200 );
        showIndex++;

        if (showIndex == divList.length){
            showIndex = 0;
        }

        $('#portfolio-box').html(divList[showIndex]);
        //$('#portfolio-box').fadein();
        
    });

    $('#arrowLeft').click(function () {
        
        showIndex--;

        if (showIndex < 0){
            showIndex = divList.length - 1;
        }

        $('#portfolio-box').html(divList[showIndex]);
        
    });
});

//TESTING!!!!!!

$('.portfolioMain').find(".subPortfolio").click(function (event) {
    console.log("knapp fungerar");
    event.preventDefault();
    var id = (event.target.id);

    $(".projectdiv").show();
    $(".project-content").show();

    $("body").css({"overflow": "hidden"});
    
    // Loads persons from about-data.json
    $.getJSON(
        'res/portfolio-data.json',
        function (data) {
            getProject(data.projects, id);
        }
    );
});

function getProject(projects, id) {
    $.each(projects, function (ind, project) {
            if (project.id == id)
            {
                var projectSquare = $(
                    '<div class="project-content" id="projectId' + ind + '">' + 
                        '<div class="project-content-left">' +
                            '<span class="fas fa-times" id="close-portfolio"></span>' +
                            '<img class="project-image" src="' + projects.image + '" title="developer" alt="developer">' +                                
                        '</div>' +
                        '<div class="project-content-right">' + 
                            '<h2> ' + projects.title + '</h2>' + '<hr/>' +
                            '<p>' + projects.description +'</p>' + 
                        '</div>' +
                            '<br/>' +
                            '<p>' + projects.date + '</p>' +                            
                    '</div>'
                );
            $('.projectdiv').html(projectSquare);  
            };
    });
};

// $(".about-personal").on("click", "#close-person", function(event){
//     event.preventDefault();
//     $('.persondiv').html('');
//     $(".person-content").hide();
//     $(".persondiv").hide(); 
//     $("body").css({"overflow": "scroll"});
// });

// $(".about-personal").on("click", "#thePersondiv", function(event){
//     if(event.target.id=="thePersondiv"){
//         event.preventDefault();
//         $('.persondiv').html('');
//         $(".person-content").hide();
//         $(".persondiv").hide();
//         $("body").css({"overflow": "scroll"});
//     }; 
//});