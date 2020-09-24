$(document).ready(function() { //JavaScriptet nedan körs när HTML-sidan har laddat klart. 

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


}); //Stänger document.ready