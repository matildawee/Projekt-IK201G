
    function loadPage(clickedId, pageUrl, pageTitle){
        $('#page-content').load(pageUrl);
        $('#navBar-pageTitle').html(pageTitle);
        $('.menuBtn').removeClass('activePage');
        $(clickedId).addClass('activePage');
    }
    function displayAbout(person) {
        $.each(person, function (ind, employee) {                        
            var personSquare = $(
                '<div class="about-developer" id="personId' + ind + '">' + 
                '<img id="personId' + ind + '" src="' + employee.portrait + '" title="developer" alt="developer">' +
                    '<h1 id="personId' + ind + '">' + employee.firstname + '</h1>' +
                    '<p id="personId' + ind + '">' + employee.title + '</p>'+
                '</div>'
            );        
        $('#about-submain').append(personSquare);
        });
    };

   
    $('.about-main').find("div").click(function (event) {
        event.preventDefault();
        var id = (event.target.id);
        $(".persondiv").show();
        $(".person-content").show();

        $("body").css({"overflow": "hidden"});
        
        // Loads persons from about-data.json
        $.getJSON(
            'res/about-data.json',
            function (data) {
                getDeveloper(data.person, id);
            }
        );
    });

    function getDeveloper(person, id) {
        $.each(person, function (ind, employee) { 
           
                if (employee.id == id)
                {
                    var developerSquare = $(
                        '<div class="person-content" id="personId' + ind + '">' + 
                            '<div class="person-content-left">' +
                                '<span class="fas fa-times" id="close-person"></span>' +
                                '<img class="person-portrait" src="' + employee.portraitBig + '" title="developer" alt="developer">' +                                
                            '</div>' +
                            '<div class="person-content-right">' + 
                                '<h2> ' + employee.firstname + ' ' + employee.lastname + 
                                ' - ' + employee.title + '</h2>' + '<hr/>' +
                                '<p>' + employee.description +'</p>' + 
                                
                                '<div class="skills">' +        
                                    '<p>JAVA: </p>' +  
                                    '<div class="skill-meter">' +
                                        '<div class="java-skills">' +
                                        '&nbsp;&nbsp;' + employee.java + '&nbsp;&nbsp;' +
                                        '</div>' +                                        
                                    '</div>' +
                                    '<p>HTML: </p>' +  
                                    '<div class="skill-meter">' +
                                        '<div class="html-skills">' +
                                        '&nbsp;&nbsp;' + employee.html + '&nbsp;&nbsp;' +    
                                        '</div>' +                                       
                                    '</div>' +
                                    '<p>JAVASCRIPT: </p>' + 
                                    '<div class="skill-meter">' +
                                        '<div class="javascript-skills">' +
                                        '&nbsp;&nbsp;' + employee.javascript + '&nbsp;&nbsp;' +
                                        '</div>' +                                       
                                    '</div>' +
                                    '<p>CSS: </p>' + 
                                    '<div class="skill-meter">' +
                                        '<div class="css-skills">' +
                                        '&nbsp;&nbsp;' + employee.css + '&nbsp;&nbsp;' +
                                        '</div>' +                                       
                                    '</div>' +
                                    '<p>SQL: </p>' + 
                                    '<div class="skill-meter">' +
                                        '<div class="sql-skills">' +
                                        '&nbsp;&nbsp;' + employee.sql + '&nbsp;&nbsp;' +
                                        '</div>' +                                       
                                    '</div>' +
                                    '<p>PHOTOSHOP: </p>' + 
                                    '<div class="skill-meter">' +
                                        '<div class="photoshop-skills">' +
                                        '&nbsp;&nbsp;' + employee.photoshop + '&nbsp;&nbsp;' +
                                        '</div>' +                                       
                                    '</div>' +
                                '</div>' +

                                '<br/>' +
                                '<p>' + employee.email + '</p>' +
                                '<p>' + employee.telephone + '</p>' +
                            '</div>' +
                        '</div>'
                    );
                $('.persondiv').html(developerSquare);

                $(".java-skills").css({"width": employee.java});   
                $(".html-skills").css({"width": employee.html}); 
                $(".javascript-skills").css({"width": employee.javascript});   
                $(".css-skills").css({"width": employee.css});  
                $(".sql-skills").css({"width": employee.sql});   
                $(".photoshop-skills").css({"width": employee.photoshop});   
                };
        });
    };

    $(".about-personal").on("click", "#close-person", function(event){
        event.preventDefault();
        $('.persondiv').html('');
        $(".person-content").hide();
        $(".persondiv").hide(); 
        $("body").css({"overflow-y": "auto"});
    });

    $(".about-personal").on("click", "#thePersondiv", function(event){
        if(event.target.id=="thePersondiv"){
            event.preventDefault();
            $('.persondiv').html('');
            $(".person-content").hide();
            $(".persondiv").hide();
            $("body").css({"overflow-y": "auto"});
        }; 
    });