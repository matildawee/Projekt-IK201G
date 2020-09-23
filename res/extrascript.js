    /* <~~~~~ knapparna på startsidan ~~~~~~ */    

    $(document).ready(function(){
        $("#welcome").animate({opacity: '1'}, 1500);
    });

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
        // $.getJSON(
        //     'res/portfolio-data.json',
        //     function (data) {
        //         displayPortfolio(data.projects);
        //     }
        // );
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

    // function displayPortfolio(projects) {

    //     var divlista = [];
    //     var divindex = 0;
    //     var index = 0;
        
    //     var startdiv = "<div id='stordiv'>";
    //     var slutdiv = "</div>";
    //     var helaGrejen = "<div id='stordiv'>";

    //     $.each(projects, function (ind, portfolio) {          
    //         var square = 
    //             '<div class="subPortfolio">' + 
    //             '<img class="project-img" src="' + portfolio.image + '" title="Project" alt="Project">' +
    //                 '<h1>' + portfolio.title + '</h1>' +
    //                 '<p>' + portfolio.description + '</p>' +
    //             '</div>';
            
    //         //console.log(square);

    //         helaGrejen += square;

    //         //$('#portfolio-box').append(square);

    //         if (ind > 0 && (ind + 1) % 4 == 0){
    //             helaGrejen += slutdiv;
    //             divlista[divindex] = helaGrejen;
    //             //console.log(helaGrejen);
    //             divindex++;
    //             helaGrejen = startdiv;        
    //         };       
    //         index++;     
    //     });
    //     console.log(index);
    //     if (index == 0){
    //         divlista = '';
    //     };
    //     if ((index + 1) % 4 != 0){
    //         helaGrejen += slutdiv;
    //         divlista[divindex] = helaGrejen;           
    //     };
        
    //     console.log(divlista);
    //     $('#portfolio-box').html(divlista[0]);
    // };

    // var showindex = 0;

    // $('#testknapp').click(function () {
    //     console.log("hej knapptryckare");
        
    //     showindex++;

    //     if (showindex > divlista.length){
    //         showindex = 0;
    //     }


    //     $('#portfolio-box').html(divlista[showindex]);
        
    // });



    // function displayPortfolio(projects) {

    //     //var divList = new Array();
    //     var divContent = new Array();

    //     $.each(projects, function (ind, portfolio) {          
                
    //         divContent[ind]=
    //         '<div class="subPortfolio">'
    //         + '<img class="project-img" src="' + portfolio.image + '" title="Project" alt="Project">'
    //         +'<h1>' + portfolio.title + '</h1>'
    //         +'<p>' + portfolio.description + '</p>'
    //         + '</div>'

    //         //divList[ind] = divContent;

    //     });
    //     //console.log(divContent);
    //     //console.log("hej");

    //     var i=0;
    //     var iPlus4=4;

    //     while (i<iPlus4){
    //         console.log(divContent);
    //         $('#portfolio-box').append(divContent[i]);

    //         i++;
    //     };
    // };


    /* ~~~~~~ hämtar portfolio json ~~~~~> */ 


    
    /* <~~~~~ hämtar oss json ~~~~~~ */ 

    // function displayAbout(person) {
    //     $.each(person, function (ind, employee) {                        
    //         var personSquare = $(
    //             '<div class="about-developer" id="personId' + ind + '">' + 
    //             '<img id="personId' + ind + '" src="' + employee.portrait + '" title="developer" alt="developer">' +
    //                 '<h1 id="personId' + ind + '">' + employee.firstname + '</h1>' +
    //                 '<p id="personId' + ind + '">' + employee.title + '</p>'+
    //             '</div>'
    //         );        

    //     $('#about-submain').append(personSquare);
    //     });

    //     //$("#personDiv").hide();
    // };
   

    // $('.about-main').find("div").click(function (event) {
    //     event.preventDefault();
    //     // $(this).find("img");
    //     var id = (event.target.id);
    //     $(".persondiv").show();
    //     $(".person-content").show();
        
    //     console.log(id);
        

    //     //ladda in info om utvecklare?
    //     $.getJSON(
    //         'res/about-data.json',
    //         function (data) {
    //             getDeveloper(data.person, id);
    //         }
    //     );
    // });

    // function getDeveloper(person, id) {
    //     $.each(person, function (ind, employee) { 
           
    //             if (employee.id == id)
    //             {
    //                 var developerSquare = $(
    //                     '<div class="person-content" id="personId' + ind + '">' + 
    //                         '<div class="person-content-left">' +
    //                             '<span class="fas fa-times" id="close-person"></span>' +
    //                             '<img class="person-portrait" src="' + employee.portraitBig + '" title="developer" alt="developer">' +                                
    //                         '</div>' +
    //                         '<div class="person-content-right">' + 
    //                             '<h2> ' + employee.firstname + ' ' + employee.lastname + 
    //                             ' - ' + employee.title + '</h2>' + '<hr/>' +
    //                             '<p>' + employee.description +'</p>' + 
                                
    //                             '<div class="skills">' +        
    //                                 '<p>JAVA: </p>' +  
    //                                 '<div class="skill-meter">' +
    //                                     '<div class="java-skills">' +
    //                                     '&nbsp;&nbsp;' + employee.java + '&nbsp;&nbsp;' +
    //                                     '</div>' +                                        
    //                                 '</div>' +
    //                                 '<p>HTML: </p>' +  
    //                                 '<div class="skill-meter">' +
    //                                     '<div class="html-skills">' +
    //                                     '&nbsp;&nbsp;' + employee.html + '&nbsp;&nbsp;' +    
    //                                     '</div>' +                                       
    //                                 '</div>' +
    //                                 '<p>JAVASCRIPT: </p>' + 
    //                                 '<div class="skill-meter">' +
    //                                     '<div class="javascript-skills">' +
    //                                     '&nbsp;&nbsp;' + employee.javascript + '&nbsp;&nbsp;' +
    //                                     '</div>' +                                       
    //                                 '</div>' +
    //                                 '<p>CSS: </p>' + 
    //                                 '<div class="skill-meter">' +
    //                                     '<div class="css-skills">' +
    //                                     '&nbsp;&nbsp;' + employee.css + '&nbsp;&nbsp;' +
    //                                     '</div>' +                                       
    //                                 '</div>' +
    //                                 '<p>SQL: </p>' + 
    //                                 '<div class="skill-meter">' +
    //                                     '<div class="sql-skills">' +
    //                                     '&nbsp;&nbsp;' + employee.sql + '&nbsp;&nbsp;' +
    //                                     '</div>' +                                       
    //                                 '</div>' +
    //                                 '<p>PHOTOSHOP: </p>' + 
    //                                 '<div class="skill-meter">' +
    //                                     '<div class="photoshop-skills">' +
    //                                     '&nbsp;&nbsp;' + employee.photoshop + '&nbsp;&nbsp;' +
    //                                     '</div>' +                                       
    //                                 '</div>' +
    //                             '</div>' +

    //                             '<br/>' +
    //                             '<p>' + employee.email + '</p>' +
    //                             '<p>' + employee.telephone + '</p>' +
    //                         '</div>' +
    //                     '</div>'
    //                 );
                
    //                 console.log(employee.html);
                
    //             $('.persondiv').html(developerSquare);

    //             $(".java-skills").css({"width": employee.java});   
    //             $(".html-skills").css({"width": employee.html}); 
    //             $(".javascript-skills").css({"width": employee.javascript});   
    //             $(".css-skills").css({"width": employee.css});  
    //             $(".sql-skills").css({"width": employee.sql});   
    //             $(".photoshop-skills").css({"width": employee.photoshop});   
    //             };
    //     });
    // };

    // $(".about-personal").on("click", "#close-person", function(event){
    //     event.preventDefault();
    //     $('.persondiv').html('');
    //     $(".person-content").hide();
    //     $(".persondiv").hide();

        
    // });

    // $(".about-personal").on("click", "#thePersondiv", function(event){
    //     if(event.target.id=="thePersondiv"){
    //         event.preventDefault();
    //         $('.persondiv').html('');
    //         $(".person-content").hide();
    //         $(".persondiv").hide();
    //     };
        
    // });

    /* ~~~~~ hämtar oss json ~~~~~> */ 
    