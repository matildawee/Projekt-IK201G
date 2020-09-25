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
            '<div class="subPortfolio" id="' + portfolio.id + '">' + 
            '<img class="project-img" id="' + portfolio.id + '"src="' + portfolio.image + '" title="Project" alt="Project">' +
                '<h1 id="' + portfolio.id + '">' + portfolio.title + '</h1>' +
                '<p id="' + portfolio.id + '">' + portfolio.description + '</p>' +
            '</div>';
        
        //skapar en div per projekt

        projectGroup += aProject;


        if (i > 0 && (i + 1) % 4 == 0){
            projectGroup += endDiv;
            divList[divIndex] = projectGroup;
            divIndex++;
            projectGroup = startDiv;    
            //för var fjärde div så skapas en slut-tag, sen lagras 4 divar i en yttre div
        };       
        index++;     
    });

    if (index == 0){
        divList = '';
        //tömmer diven ifall inga projekt finns
    };

    if ((index) % 4 != 0){
        projectGroup += endDiv;
        divList[divIndex] = projectGroup;    
        //lägger till slut-div-tagg       
    };
    
    console.log(divList);

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

//About-project...

var slideshowInterval = clearInterval(slideshowInterval);

var images = [];

var playflag = false;

$(".portfolioMain").on("click", ".subPortfolio", function(event){
    event.preventDefault();
    var id = (event.target.id);

    $(".projectdiv").show();
    $(".project-content").show();

    $("body").css({"overflow-y": "auto"});
    
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
            if (project.id == id) {              
                
                var projectSquare = $(
                    '<div class="project-content" id="' + project.id + '">' + 
                        '<div class="project-content-top">' +
                            '<span class="fas fa-times" id="close-portfolio"></span>' +                           
                            //'<div class="slideshowDiv">' +
                                '<img class="slideshow-image" id="slideshow" src="' + project.slideshow[0] + '" title="developer" alt="developer">' + 
                                '<span class="fas fa-pause" id="slideShowPause"></span>' + 
                                '<span class="fas fa-play" id="slideShowPlay"></span>' + 
                            //'</div>' +                
                        '</div>' +
                        '<div class="project-content-bottom">' + 
                            '<h2> ' + project.title + '</h2>' + 
                            '<p>' + project.date + '</p>' +  '<hr/>' +
                            '<p>' + project.description +'</p>' + 
                            
                        '</div>' +
                            '<br/>' +
                                                       
                    '</div>'
                    
                );

            images = project.slideshow;
            $('.projectdiv').html(projectSquare);  

            

            slideshowInterval = setInterval(slideshow, 2000); 
            playflag = true;
            };
    });
};

var slideIndex = 1;

function slideshow(){
    
    if (slideIndex == images.length){
        slideIndex=0;
    }    
    document.getElementById('slideshow').src=images[slideIndex];
    slideIndex++;
}

$(".about-project").on("click", "#close-portfolio", function(event){
    event.preventDefault();
    $('.projectdiv').html('');
    $(".project-content").hide();
    $(".projectdiv").hide(); 
    clearInterval(slideshowInterval); 
    playflag = true;
    $("body").css({"overflow": "auto"});
});

$(".about-project").on("click", "#theProjectdiv", function(event){
    if(event.target.id=="theProjectdiv"){
        event.preventDefault();
        $('.projectdiv').html('');
        $(".project-content").hide();
        $(".projectdiv").hide(); 
        clearInterval(slideshowInterval); 
        playflag = true; 
        $("body").css({"overflow": "auto"});
    }; 
});

$(".about-project").on("mouseover", "#slideshow", function(event){
    if (playflag == true){
        $("#slideShowPause").css({"visibility": "visible"});
    }
    else {
        $("#slideShowPlay").css({"visibility": "visible"});
    }

    $(".slideshow-image").css({backgroundColor: "black"});
    $(".slideshow-image").css({"opacity": "0.8"});    
});
$(".about-project").on("mouseover", "#slideShowPlay", function(event){
    if (playflag == true){
        $("#slideShowPause").css({"visibility": "visible"});
    }
    else {
        $("#slideShowPlay").css({"visibility": "visible"});
    }

    $(".slideshow-image").css({"background-color": "black"});
    $(".slideshow-image").css({"opacity": "0.8"});
    
});
$(".about-project").on("mouseover", "#slideShowPause", function(event){
    if (playflag == true){
        $("#slideShowPause").css({"visibility": "visible"});
    }
    else {
        $("#slideShowPlay").css({"visibility": "visible"});
    }

    $(".slideshow-image").css({"background-color": "black"});
    $(".slideshow-image").css({"opacity": "0.8"});
    
});
$(".about-project").on("mouseleave", "#slideshow", function(event){
    $("#slideShowPlay").css({"visibility": "hidden"});
    $("#slideShowPause").css({"visibility": "hidden"});

    $(".slideshow-image").css({"background-color": "rgba(0, 0, 0, 0)"});
    $(".slideshow-image").css({"opacity": "1"});
    
});

$(".about-project").on("click", "#slideShowPause", function(event){
    clearInterval(slideshowInterval);
    playflag = false; 
    $("#slideShowPause").css({"visibility": "hidden"});
    $("#slideShowPlay").css({"visibility": "visible"});
});

$(".about-project").on("click", "#slideShowPlay", function(event){
    slideshowInterval = setInterval(slideshow, 2000); 
    playflag = true;
    $("#slideShowPause").css({"visibility": "visible"});
    $("#slideShowPlay").css({"visibility": "hidden"});
});