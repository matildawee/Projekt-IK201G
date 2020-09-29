/* This JavaScript need jQuery to run */
$(document).ready(function() { //JavaScriptet nedan körs när HTML-sidan har laddat klart. 

    //funktion som döljer alla sidor
    function hidePageSections() { 
        $("#Home-Page").hide();
        $("#Portfolio-Page").hide();
        $("#About-Page").hide();
        $("#Contact-Page").hide();
    }

    hidePageSections(); //vid första laddning av webbsidan, döljs alla sidor med funktionen ovan
    $("#Home-Page").show(); //visar startsida vid första laddning
    $("#Home-Page").animate({opacity: '1'}, 1500); //animera fram "Welcome" vid första laddning

    
    /*    <~~~ Navigering start ~~~~   */

        //funktion som anropas när man klickar på olika navigeringslänkar, döljer alla sidor, uppdaterar vilken sida som är aktiv just nu,
        //visar och uppdaterar Page-Title i mobilvyn visar och döljer navbar i mobilvyn
        function loadPage(clickedId){ 
            hidePageSections(); 
            $('#' + clickedId + '-Page').show();
            $('.menuBtn').removeClass('activePage');
            $('#'+clickedId).addClass('activePage');

            $('#navBar-pageTitle').html(clickedId);
            classToggle();
        }

        //funktion som anropas när man klickar på Home
        $('#Home').click(function (event) {
            event.preventDefault();
            loadPage('Home');
            $("#Home-Page").css({"opacity": "0"});
            $("#Home-Page").animate({opacity: '1'}, 1500);
        });

        //funktion som används när vi klickar på loggan i mobile eller desktop läge. 
        function loadLogoHomePage() {
            hidePageSections(); 
            $('#Home-Page').show();
            $('.menuBtn').removeClass('activePage');
            $('#Home').addClass('activePage');

            $('#navBar-pageTitle').html('Home');
            $('nav').removeClass('navBar-show');
            $("#Home-Page").css({"opacity": "0"});
            $("#Home-Page").animate({opacity: '1'}, 1500);
        }

        //funktion som anropas när man klickar på loggan, dock mera hårdkodad.
        $('#header-logo').click(function (event) {
            event.preventDefault();
            loadLogoHomePage();
        });

        //funktion som anropas när man klickar på loggan, dock mera hårdkodad.
        $('#header-logo-mobile').click(function (event) {
            event.preventDefault();
            loadLogoHomePage();
        });

        //funktion som anropas när man klickar på Portfolio
        $('#Portfolio').click(function (event) {
            event.preventDefault();
            loadPage('Portfolio');
        });

        //funktion som anropas när man klickar på About us
        $('#About').click(function (event) {
            event.preventDefault();
            loadPage('About');

            //laddar in utvecklarna
            $.getJSON(
                'res/about-data.json',
                function (data) {
                    displayAbout(data.person);
                }
            );
        });

        //funktion som anropas när man klickar på Contact
        $('#Contact').click(function (event) {
            event.preventDefault();
            loadPage('Contact');
            $('#contactSubmitMessage').text("");
        });

        //funktion som lägger till respektive tar bort navBar-show, dvs. döljer eller visar navigerings-menyn
        function classToggle() {
            const navs = document.querySelectorAll('nav');
            navs.forEach(nav => nav.classList.toggle('navBar-show'));
        }
        
        //När man klickar på hamburgermenu-knappen i mobil-vy, så anropas funktionen ovanför som visar/döljer navigeringen
        document.querySelector('#navButton-toggle').addEventListener('click', classToggle);

    /*    ~~~~ Navigering end ~~~>   */


    /*    <~~~ Home-Page start ~~~~   */

        //funktion som visar Portfolio när man klickat på knappen på Startsidan
        $('#startProjects').click(function (event) {
            event.preventDefault();
            loadPage('Portfolio');
        });

        //funktion som visar About us när man klickat på knappen på Startsidan
        $('#startUs').click(function (event) {
            event.preventDefault();
            loadPage('About');

            //laddar in utvecklarna
            $.getJSON(
                'res/about-data.json',
                function (data) {
                    displayAbout(data.person);
                }
            );
        });
        
    /*    ~~~~ Home-Page end ~~~>   */


    /*    <~~~ Portfolio-Page start ~~~~   */

        //Deklarerar variabler som används i funktioner för portfoliosidan
        var divList = [];
        var divIndex = 0;
        var index = 0;
        var playflag = false;
        var showIndex = 0;

        // Laddar in project från portfolio-data.json
        $.getJSON(
            'res/portfolio-data.json',
            function (data) {
                displayPortfolio(data.projects);
            }
        );

        //Här skapas divar som i sig innehåller upp till 4 divar, en per projekt. Detta lagras i en array
        function displayPortfolio(projects) { 

            var startDiv = '<div id="portfolioGroup">';
            var endDiv = '</div>';

            //startar den yttre diven med startdiv-taggen
            var projectGroup = startDiv;
            
            //loopar igenom projekten och lägger varje projekt i en inre div
            $.each(projects, function (i, portfolio) {

                //Om det är mer än 170 tecken i description på portfolio-sidan, så skrivs det på slutet "..." och man måste trycka på projektet för att läsa hela beskrivningen. 
                if (portfolio.description.length > 170) {
                    portfolio.description = portfolio.description.substring(0, 170) + "...";
                };

                //skapar div för varje projekt
                var aProject = 
                    '<div class="subPortfolio" id="' + portfolio.id + '">' + 
                    '<img class="project-img" id="' + portfolio.id + '"src="' + portfolio.image + '" title="Project" alt="Project" />' +
                        '<h2 id="' + portfolio.id + '">' + portfolio.title + '</h2>' +
                        '<p id="' + portfolio.id + '">' + portfolio.description + '</p>' +
                    '</div>';

                //adderar varje enskild projekt-div till en variabel som innehåller alla dessa
                projectGroup += aProject;

                //för var fjärde div så adderas en slutdiv-tag för de fyra senast skapade projekt-divarna
                //sedan läggs de i en array. Exempel på array-rad med två projekt: <div><div>*ett projekt*</div><div>*ett till projekt*</div></div>
                //sedan påbörjas en ny, tom yttre div
                if (i > 0 && (i + 1) % 4 == 0){
                    projectGroup += endDiv;
                    divList[divIndex] = projectGroup;
                    divIndex++;
                    projectGroup = startDiv;               
                };       
                index++;     
            });

            //Tömmer arrayen om inga projekt finns
            if (index == 0){
                divList = '';      
            };

            //Lägger till slut-div-tagg (detta sker ifall each-loopen har brutit på ett tal som inte är delbart med 4, 
            //isåfall har ingen sluttag skapats i loopen)
            if ((index) % 4 != 0){
                projectGroup += endDiv;
                divList[divIndex] = projectGroup;          
            };

            //Raderar en sista tom div som skapas när antalet projekt är delbart med 4
            if (divList[divList.length-1] == '<div id="portfolioGroup"></div>'){
                divList.splice(divList.length-1,1); 
            }

            //lägger in den första div-gruppen på sajten
            $('#portfolio-box').html(divList[0]);
        };

        //Visar nästa div-grupp när knappen klickas
        $('#arrowRight').click(function () {
            showIndex++;

            if (showIndex == divList.length){
                showIndex = 0;
            }
            $('#portfolio-box').html(divList[showIndex]);
        });

        //Visar nästa div-grupp när knappen klickas
        $('#arrowRightMobile').click(function () {
            showIndex++;

            if (showIndex == divList.length){
                showIndex = 0;
            }
            $('#portfolio-box').html(divList[showIndex]);
        });

        //Visar föregående div-grupp när knappen klickas
        $('#arrowLeft').click(function () {
            
            showIndex--;

            if (showIndex < 0){
                showIndex = divList.length - 1;
            }

            $('#portfolio-box').html(divList[showIndex]);
        });

        //Visar föregående div-grupp när knappen klickas
        $('#arrowLeftMobile').click(function () {
            
            showIndex--;

            if (showIndex < 0){
                showIndex = divList.length - 1;
            }

            $('#portfolio-box').html(divList[showIndex]);
        });

        //Här är funktionen för att trycka på de olika projekten för att få upp mer info
        $(".portfolioMain").on("click", ".subPortfolio", function(event){
            event.preventDefault();
            var id = (event.target.id);

            slideIndex = 1;
        
            $(".projectdiv").show();
            $(".project-content").show();
        
            $("body").css({"overflow-y": "auto"});
            
            // Laddar projekt från portfolio-data.json
            $.getJSON(
                'res/portfolio-data.json',
                function (data) {
                    getProject(data.projects, id);
                }
            );
        });
        
        //Skapar en div för det valda projektet med data från portfolio-data.json
        function getProject(projects, id) {
            $.each(projects, function (ind, project) {
                //loopas igenom, när det valda id:t hittas i filen så skapas en ruta med info
                    if (project.id == id) {              
                        
                        var projectSquare = $(
                            '<div class="project-content" id="' + project.id + '">' + 
                                '<div class="project-content-top">' +
                                    '<span class="fas fa-times" id="close-portfolio"></span>' +                           
                                    '<div class="slideshowDiv">' +
                                        '<img class="slideshow-image" id="slideshow" src="' + project.slideshow[0] + '" alt=" ' + project.title + ' " />' + 
                                        '<span class="fas fa-pause" id="slideShowPause"></span>' + 
                                        '<span class="fas fa-play" id="slideShowPlay"></span>' + 
                                    '</div>' +                
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
                    $("body").css({"overflow": "hidden"}); 
                    
                    //Startar intervall för bildspel
                    slideshowInterval = setInterval(slideshow, 2000); 
                    playflag = true;
                    };
            });
        };

        var slideIndex = 1;
        
        //Loopar igenom slideshow-arrayen i portfolio-data.json och visar bildspel
        function slideshow(){
            if (slideIndex >= images.length){
                slideIndex=0;
            };    
            document.getElementById('slideshow').src=images[slideIndex];
            slideIndex++;
        };

        //Stänger projectdiv och project-content samt avslutar bildspel när knapp klickas
        $(".about-project").on("click", "#close-portfolio", function(event){
            event.preventDefault();
            $('.projectdiv').html('');
            $(".project-content").hide();
            $(".projectdiv").hide(); 
            clearInterval(slideshowInterval); 
            playflag = true;
            $("body").css({"overflow": "auto"});
        });

        //Stänger projectdiv och project-content samt avslutar bildspel när man klickar utanför rutan
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

        //Visar paus- eller play-knapp när man drar muspekaren över bilden
        $(".about-project").on("mouseover", "#slideshow", function(event){
            if (playflag == true){
                $("#slideShowPause").css({"visibility": "visible"});
            }
            else {
                $("#slideShowPlay").css({"visibility": "visible"});
            }
            $(".slideshow-image").css({"filter": "brightness(75%)"});  

            var screenWidth = window.innerWidth;
            //vid mobilvy så fade:ar knapparna bort efter 3 sekunder
            if (screenWidth<769){
                setTimeout(hideButton, 3000); 
            };
        });

        //Visar paus- eller play-knapp när man trycker på bilden (för mobilvy)
        $(".about-project").on("click", "#slideshow", function(event){
            if (playflag == true){
                $("#slideShowPause").css({"visibility": "visible"});
            }
            else {
                $("#slideShowPlay").css({"visibility": "visible"});
            }
            $(".slideshow-image").css({"filter": "brightness(75%)"});  

            var screenWidth = window.innerWidth;
            //vid mobilvy så fade:ar knapparna bort efter 3 sekunder
            if (screenWidth<769){
                setTimeout(hideButton, 3000); 
            };
        });

        //gömmer knapparna
        function hideButton() {
            $("#slideShowPlay").fadeOut(800);
            $("#slideShowPause").fadeOut(800);
            $(".slideshow-image").css({"filter": "brightness(100%)"});
            setTimeout(fadeBack, 800);
        }

        //dom måste fade:a tillbaka för annars kommer dom inte tillbaka via "visibilty: visible"
        function fadeBack() {
            $("#slideShowPlay").css({"visibility": "hidden"});      
            $("#slideShowPause").css({"visibility": "hidden"});
            $("#slideShowPlay").fadeIn(0);
            $("#slideShowPause").fadeIn(0);
        }

        //Visar play-knapp när man drar muspelaren över play-knappen
        $(".about-project").on("mouseover", "#slideShowPlay", function(event){
            if (playflag == true){
                $("#slideShowPause").css({"visibility": "visible"});
            }
            else {
                $("#slideShowPlay").css({"visibility": "visible"});
            }
            $(".slideshow-image").css({"filter": "brightness(75%)"});
        });
        
        //Visar paus-knapp när man drar muspelaren över paus-knappen
        $(".about-project").on("mouseover", "#slideShowPause", function(event){
            if (playflag == true){
                $("#slideShowPause").css({"visibility": "visible"});
            }
            else {
                $("#slideShowPlay").css({"visibility": "visible"});
            }
            $(".slideshow-image").css({"filter": "brightness(75%)"});
        });
        
        //Gömmer play- eller paus-knapp när muspekaren lämnar bilden
        $(".about-project").on("mouseleave", "#slideshow", function(event){
            $("#slideShowPlay").css({"visibility": "hidden"});
            $("#slideShowPause").css({"visibility": "hidden"});
            $(".slideshow-image").css({"filter": "brightness(100%)"});
        });

        //Pausar bildspel, gömmer paus-knapp samt visar play-knapp
        $(".about-project").on("click", "#slideShowPause", function(event){
            clearInterval(slideshowInterval);
            playflag = false; 
            $("#slideShowPause").css({"visibility": "hidden"});
            $("#slideShowPlay").css({"visibility": "visible"});
        });

        //Pausar bildspel, gömmer play-knapp samt visar paus-knapp
        $(".about-project").on("click", "#slideShowPlay", function(event){
            slideshowInterval = setInterval(slideshow, 2000);
            playflag = true;
            $("#slideShowPause").css({"visibility": "visible"});
            $("#slideShowPlay").css({"visibility": "hidden"});
        });

    /*    ~~~ Portfolio-Page end ~~~~>   */


    /*    <~~~ About-Page start ~~~~   */

        //här hämtas utvecklarna som får varsin ruta med bild och info
        function displayAbout(person) {
            var allDevelopers = "";
            $.each(person, function (ind, employee) {                        
                var personSquare = (
                    '<div class="about-developer" id="personId' + ind + '">' + 
                    '<img id="personId' + ind + '" src="' + employee.portrait + '" title="developer" alt="developer" />' +
                        '<h2 id="personId' + ind + '">' + employee.firstname + '</h2>' +
                        '<p id="personId' + ind + '">' + employee.title + '</p>'+
                    '</div>'
                );
                    
                allDevelopers+=personSquare;
            });
            $('#about-submain').html(allDevelopers);
        };

        //här är funktionen för att visa info om utvecklarna, när deras respektive inforuta klickas på
        $(".about-main").on("click", ".about-developer", function(event){
            event.preventDefault();
            var id = (event.target.id);
            $(".persondiv").show();
            $(".person-content").show();

            $("body").css({"overflow": "hidden"});
            
            //hämtas från en jsonfil
            $.getJSON(
                'res/about-data.json',
                function (data) {
                    getDeveloper(data.person, id);
                }
            );
        });

        //här skapas en ruta över skärmen där info om utvecklarna presenteras
        function getDeveloper(person, id) {
            $.each(person, function (ind, employee) { 
                //loopar igenom och skapar rutan för det valda id:t
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

                //här skapas "skill-meters:arna", genom att bredden på en färgad div inom en tom div sätts till den procent som utvecklarens skill-nivå har uppskattats till
                $(".java-skills").css({"width": employee.java});   
                $(".html-skills").css({"width": employee.html}); 
                $(".javascript-skills").css({"width": employee.javascript});   
                $(".css-skills").css({"width": employee.css});  
                $(".sql-skills").css({"width": employee.sql});   
                $(".photoshop-skills").css({"width": employee.photoshop});   
                };
            });
        };

        //stänger inforutan när krysset trycks
        $(".about-personal").on("click", "#close-person", function(event){
            if(event.target.id=="close-person"){
            event.preventDefault();
            $('.persondiv').html('');
            $(".person-content").hide();
            $(".persondiv").hide(); 
            $("body").css({"overflow-y": "auto"});
            };
        });

        //stänger inforutan när ytan utanför trycks
        $(".about-personal").on("click", "#thePersondiv", function(event){
            if(event.target.id=="thePersondiv"){
                event.preventDefault();
                $('.persondiv').html('');
                $(".person-content").hide();
                $(".persondiv").hide();
                $("body").css({"overflow-y": "auto"});
            };
        });

    /*    ~~~ About-Page end ~~~~>   */

    /*    <~~~ Contact-Page start ~~~~   */

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
            } 
        }; 

        // console.log(localSavedJsonObject); //kommentera bort denna rad om ni vill se hela sparade JSON-objectet i loggen när sidan contact laddas.


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
        }); 
    
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
        function validateOkOrError(contactInputId) {
            var textToValidate = $(contactInputId).val(); //Exempel indata "#contactName" , samt val() = value
            var result = $(contactInputId+"Error"); //"#contactNameError" , för att skriva ut OK eller Unvalid i den <span> som ligger efter label
            
            result.removeClass("contactError"); //rensar bort Classen contactError, om den finns på span där error ska skrivas ut.
            result.removeClass("contactOk"); //rensar bort Classen contactOk, om den finns. 
            result.text(""); //Tömmer meddelandet som stod i span för Error-meddelandet
    
            if (validate(contactInputId, textToValidate)) { //Kollar om valideringen har gått OK
                result.text("OK"); //Skriver ut OK som span meddelande för t.ex. id: #contactNameError 
                result.addClass("contactOk"); //Lägger till css klassen .contactOk på span-idt. 
            } else if (textToValidate == "") { //Om det inte finns något skriver i input-fältet, så sätts felmeddelandet i span-error till blankt. 
                result.text("");
            } else { //Annars om det är data i input-fältet och den inte validerat OK, så skrivs det ut "Unvalid".
                result.text("Unvalid"); //Skriver ut "Unvalid" som error meddelande på samma span-error idt
                result.addClass("contactError"); //Lägger till css klassen .contactError på t.ex. #contactNameError
            } 
        } 
    
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
        
        //funktion som sparar värdena från alla inputs till localStorage som JSON på användarens enhet
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

    /*    ~~~~ Contact-Page end ~~~>   */

 });