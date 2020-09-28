/* This JavaScript need jQuery to run */
$(document).ready(function() { //JavaScriptet nedan körs när HTML-sidan har laddat klart. 

    function hidePageSections() {
        $("#Home-Page").hide();
        $("#Portfolio-Page").hide();
        $("#About-Page").hide();
        $("#Contact-Page").hide();
    }

    hidePageSections();
    $("#Home-Page").show();

    // $('#page-content').load('./pages/start.html');

    function loadPage(clickedId, pageUrl, pageTitle){
        hidePageSections();
        $('#navBar-pageTitle').html(pageTitle);
        $('#' + clickedId + '-Page').show();
        // $('#page-content').load(pageUrl);
        $('.menuBtn').removeClass('activePage');
        $('#'+clickedId).addClass('activePage');
        // classToggle();
    }

    $('#Home').click(function (event) {
        event.preventDefault();
        loadPage('Home');
        $("#welcome").css({"opacity": "0"});
        $("#welcome").animate({opacity: '1'}, 1500);
    });

    $('#header-logo').click(function (event) {
        event.preventDefault();
        loadPage('Home');
        $("#welcome").css({"opacity": "0"});
        $("#welcome").animate({opacity: '1'}, 1500);
    });

    $('#Portfolio').click(function (event) {
        event.preventDefault();
        loadPage('Portfolio');
    });

    $('#About').click(function (event) {
        event.preventDefault();
        loadPage('About');

        // laddar in utvecklarna
        $.getJSON(
            'res/about-data.json',
            function (data) {
                displayAbout(data.person);
            }
        );
    });

    $('#Contact').click(function (event) {
        event.preventDefault();
        loadPage('Contact');
    });

    function classToggle() {
        // $("nav").slideToggle();
        // $("nav").animate({'height': 'toggle'}, 'slow');
        const navs = document.querySelectorAll('nav');
        navs.forEach(nav => nav.classList.toggle('navBar-show'));
      }
      
      document.querySelector('.navButton-toggle')
        .addEventListener('click', classToggle);

    /* <~~~~~ knapparna på startsidan - dessa knappar finns också i extrascript ~~~~~~ */    

    $('#startProjects').click(function (event) {
        event.preventDefault();
        loadPage('Portfolio');
    });

    $('#startUs').click(function (event) {
        event.preventDefault();
        loadPage('About');
        // $('#page-content').load('./pages/about.html');
    });




    /* ~~~~~~ knapparna på startsidan ~~~~~~> */  


    /* start Contact.js */

        /* Start Contact load from JSON */
        
            // Hämtar det sparade JSON-objectet: "savedJsonObject" , som en string vi gör om till ett JSON-object med JSON.parse() och sparar i variablen "localSavedJsonObject".
            var localSavedJsonObject = JSON.parse(localStorage.getItem('savedJsonObject'));
        
            // Anropar funktionen "loadMessageToForm" och skickar med JSON-objectet ifrån ovan.  
            loadMessageToForm(localSavedJsonObject);
        
            //Skapar en funktion som laddar in all data till formuläret ifrån localStorage via variabeln localSavedJsonObject.
            function loadMessageToForm(getJsonMessage) {  
                if (getJsonMessage != null){ //Kollar om det finns någon JSON data lagrad sedan tidigare.
                    //Om det finns data, så skriver vi ut datan i nedanstående input-fält: 
                    $('#contactName').val(getJsonMessage.contactName);
                    $('#contactPhone').val(getJsonMessage.contactPhone);
                    $('#contactEmail').val(getJsonMessage.contactEmail);
                    $('#contactSubject').val(getJsonMessage.contactSubject);
                    $('#contactMessage').val(getJsonMessage.contactMessage);
        
                    //Om JSON-objectets värde är tomt, så händer inget nedan, men om det är skiljt ifrån tomt (!=) så ska valideringen "validateOkOrError" köras på fälten.
                    if (getJsonMessage.contactName != ""){
                        validateOkOrError("#contactName");
                    }
                    if (getJsonMessage.contactPhone != ""){
                        validateOkOrError("#contactPhone");
                    }
                    if (getJsonMessage.contactEmail != ""){
                        validateOkOrError("#contactEmail");
                    }
                    if (getJsonMessage.contactSubject != ""){
                        validateOkOrError("#contactSubject");
                    }
                    if (getJsonMessage.contactMessage != ""){
                        validateOkOrError("#contactMessage");
                    }
                } //slut på IF-sats som kollar om getJsonMessage
            }; //slut på Funktionen loadMessageToForm(getJsonMessage)
        
            // console.log(localSavedJsonObject); //kommentera bort denna rad om ni vill se hela sparade JSON-objectet i loggen när sidan contact laddas.
        
        /* End Contact load from JSON */
        
        /* Start Contact validate */
        
            $("#contactName").blur(function() { //När focus tappas av rutan med id "#contactName"
                validateOkOrError("#contactName"); //Ska valideringsfunktionen köras på "#contactName"
                saveToJSON(); //När focus tappats från fältet så körs också funktionen "saveToJSON()" (se längst ned i denna fil).
            });
        
            $("#contactPhone").blur(function() { //Samma som ovan, men på id: #contactPhone
                validateOkOrError("#contactPhone");
                saveToJSON();
            });
        
            $("#contactEmail").blur(function () { //Samma som ovan, men på id: #contactEmail
                validateOkOrError("#contactEmail");
                saveToJSON();
            });
        
            $("#contactSubject").blur(function () { //Samma som ovan, men på id: #contactSubject
                validateOkOrError("#contactSubject"); 
                saveToJSON();
            });
        
            $("#contactMessage").blur(function () { //Samma som ovan, men på id: #contactMessage
                validateOkOrError("#contactMessage");
                saveToJSON();
            });
        
            //Funktion som körs när man klickar på "Send": 
            $("#contactSubmit").click(function (event) {
                if( //Kollar om alla valideringar är OK
                $('#contactNameError').text() == 'OK' &&
                $('#contactPhoneError').text() == 'OK' &&
                $('#contactEmailError').text() == 'OK' &&
                $('#contactSubjectError').text() == 'OK' &&
                $('#contactMessageError').text() == 'OK'
                ){
                    localStorage.clear(); //Tömmer JSON-objectet ifrån localStorage. 
                    clearContactForm(); //Tömmer alla input fält. 
                    clearContactErrors(); //Tömmer alla felmeddelanden. 
                    $('#contactSubmitMessage').text('Thank you for your message!'); //Skriver ut ett meddelande och tackar för mottaget meddelande. 
                    $('#contactSubmitMessage').removeClass("contactError contactOk").addClass("contactOk"); //Tar bort css klasserna: "contactError" och "contactOk" , sedan lägger till endast "contactOk".   
                } else { //Om inte alla valideringar är OK. 
                    $('#contactSubmitMessage').text('Message is not sent!'); //Skriver ut ett meddelande om meddelandet inte skickats. 
                    $('#contactSubmitMessage').removeClass("contactError contactOk").addClass("contactError"); //Tar bort css klasserna: "contactError" och "contactOk" , sedan lägger till endast "contactError". 
                } //slut på IF-sats som kollar valideringar
                event.preventDefault(); //Ignorerar Default med preventDefault() , så inte sidan ska laddas om. 
            }); //Slut på funktionen #contactSubmit.click
        
            //Tömmer alla input-fält
            function clearContactForm(){
                $('#contactName').val('');
                $('#contactPhone').val('');
                $('#contactEmail').val('');
                $('#contactSubject').val('');
                $('#contactMessage').val('');
            }
        
            //Tömmer alla span-error meddelanden. 
            function clearContactErrors(){
                $('#contactNameError').text('');
                $('#contactPhoneError').text('');
                $('#contactEmailError').text('');
                $('#contactSubjectError').text('');
                $('#contactMessageError').text('');
            }
        
            //Exempel indata: validateOkOrError("#contactName") för att skicka in label id för namn (behöver även en tillhörande span med id: contactNameError)
            function validateOkOrError(contactLabelId) {
                var textToValidate = $(contactLabelId).val(); //Exempel indata "#contactName" , samt val() = value
                var result = $(contactLabelId+"Error"); //"#contactNameError" , för att skriva ut OK eller Unvalid i den <span> som ligger efter label
                
                result.removeClass("contactError"); //rensar bort Classen contactError, om den finns på span där error ska skrivas ut.
                result.removeClass("contactOk"); //rensar bort Classen contactOk, om den finns. 
                result.text(""); //Tömmer meddelandet som stod i span för Error-meddelandet
        
                if (validate(contactLabelId, textToValidate)) { //Kollar om valideringen har gått OK
                    result.text("OK"); //Skriver ut OK som span meddelande för t.ex. id: #contactNameError 
                    result.addClass("contactOk"); //Lägger till css klassen .contactOk på span-idt. 
                } else if (textToValidate == "") { //Om det inte finns något skriver i input-fältet, så sätts felmeddelandet i span-error till blankt. 
                    result.text("");
                } else { //Annars om det är data i input-fältet och den inte validerat OK, så skrivs det ut "Unvalid".
                    result.text("Unvalid"); //Skriver ut "Unvalid" som error meddelande på samma span-error idt
                    result.addClass("contactError"); //Lägger till css klassen .contactError på t.ex. #contactNameError
                } //slut på IF-satsen ovan. 
            } //slut på Funktionen validateOkOrError()
        
            //Funktion för att validera med regular expression:
            function validate(inputId, value) {
                var regEx = ""
                if (inputId=="#contactEmail"){
                    //regEx kontroll att det är en mailadress som innehåller (minst 2 tecken av a-z, A-Z, 0-9 eller godkända symboler i mailadress), (därefter @), (därefter minst 2 tecken som domännamn), (därefter punkt .) , (därefter minst 2 tecken som domän ändelse (ex: .se / .com / .annat))
                    regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                } else if (inputId=="#contactPhone") {
                    //regEx kollar om telefonnumret innehåller (0046, +46 eller 0 i början),(därefter 7),(därefter 8st siffror)
                    regEx = /^((((0{2}?)|(\+){1})46)|0)7[\d]{8}/;
                } else if (inputId=="#contactName") {
                    //regEx kollar a-ö,A-Ö,mellanslag och minst 3 tecken. 
                    regEx = /[a-zA-ZåäöÅÄÖ+ ]{3,}/;
                } else if (inputId=="#contactSubject") {
                    //regEx kollar a-ö,A-Ö,0-9,mellanslag samt tecken: ():;,.?!" och minst 1 tecken. 
                    regEx = /[0-9.,:;()!?\"\-\/a-zA-ZåäöÅÄÖ+ ]{1,}/;
                } else if (inputId=="#contactMessage") {
                    //regEx kollar a-ö,A-Ö,0-9,mellanslag samt tecken: ():;,.-/\+?!" och minst 1 tecken. 
                    regEx = /[0-9.,:;()!?\"\-\+\/a-zA-ZåäöÅÄÖ+ ]{1,}/;
                } else {
                    regEx = "";
                }
                //Returnerar ett regular expression test på value:
                return regEx.test(value);
            }
        
        /* End Contact validate */
        
        /* Start Contact save to JSON */
        
        function saveToJSON() {
            var name = $('#contactName').val();
            var phone = $('#contactPhone').val();
            var email = $('#contactEmail').val();
            var subject = $('#contactSubject').val();
            var message = $('#contactMessage').val();
        
            var messageJsonObject = { 
                'contactName': name,
                'contactPhone': phone,
                'contactEmail': email,
                'contactSubject': subject, 
                'contactMessage': message
            };
        
            //Lagrar ned messageJsonObject i localStorage med namnet: "savedJsonObject" på användarens dator. 
            localStorage.setItem('savedJsonObject', JSON.stringify(messageJsonObject));
        }
        /* End Contact save to JSON */
        
        

    /* end Contact.js */


    /* start of Portfolio.js */

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

    /* end of portfolio.js */


    /* start of about.js */
    

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

        $(".about-main").on("click", ".about-developer", function(event){
        // $('#about-submain').find("div").click(function (event) {
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
            if(event.target.id=="close-person"){
            event.preventDefault();
            $('.persondiv').html('');
            $(".person-content").hide();
            $(".persondiv").hide(); 
            $("body").css({"overflow-y": "auto"});
            };
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

    /* end of about.js */


    /* start of extrascript.js */
        $("#welcome").animate({opacity: '1'}, 1500);
        

            /* <~~~~~ knapparna på startsidan ~~~~~~ */    
            $('#startUs').click(function (event) {
                event.preventDefault();
                loadPage('About');
        
                // laddar in utvecklarna
                $.getJSON(
                    'res/about-data.json',
                    function (data) {
                        displayAbout(data.person);
                    });
            });

        $('#startProjects').click(function (event) {
            event.preventDefault();
            loadPage('Portfolio');

        });



        /* <~~~~~ hämtar oss json ~~~~~~ */ 

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
    
            //$("#personDiv").hide();
        };
    /* end of extrascript.js */

 });