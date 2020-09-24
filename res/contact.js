$(document).ready(function() {
    var messageOkToSend = false;
    // Hämtar det sparade JSON objectet: "savedJsonObject" , som en string
        var localSavedJsonObject = JSON.parse(localStorage.getItem('savedJsonObject'));
    // Skriver ut det hämtade JSON objectet som en JSON i loggen. 
        console.log('savedJsonObject: ', localSavedJsonObject);

        loadMessageToForm(localSavedJsonObject);

        function loadMessageToForm(getJsonMessage) {  
            if (getJsonMessage != null){      
                $('#contactName').val(getJsonMessage.contactName);
                $('#contactPhone').val(getJsonMessage.contactPhone);
                $('#contactEmail').val(getJsonMessage.contactEmail);
                $('#contactSubject').val(getJsonMessage.contactSubject);
                $('#contactMessage').val(getJsonMessage.contactMessage);

                validateOkOrError("#contactName");
                validateOkOrError("#contactPhone");
                validateOkOrError("#contactEmail");
                validateOkOrError("#contactSubject");
                validateOkOrError("#contactMessage");
            }
        };

/* Start Contact validate */

    $("#contactName").blur(function() { //När focus tappas av rutan med id #contactName
        validateOkOrError("#contactName"); //Ska valideringsfunktionen köras på #contactName
        saveToJSON();
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

    $("#contactSubmit").click(function (event) {
        if(
        $('#contactNameError').text() == 'OK' &&
        $('#contactPhoneError').text() == 'OK' &&
        $('#contactEmailError').text() == 'OK' &&
        $('#contactSubjectError').text() == 'OK' &&
        $('#contactMessageError').text() == 'OK'
        ){
            localStorage.clear();
            clearContactForm();
            $('#contactMessageError').text('Thank you for the message!');            
        } else {
            $('#contactMessageError').text('Message not sent!');
        }

        console.log($('#contactSubjectError').text());

        event.preventDefault();
        load('./pages/contact.html');
    });

    function clearContactForm(){
        $('#contactName').val('');
        $('#contactPhone').val('');
        $('#contactEmail').val('');
        $('#contactSubject').val('');
        $('#contactMessage').val('');

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

        if (validate(contactLabelId, textToValidate)) {
            result.text("OK"); //Skriver ut OK som span meddelande för t.ex. id: #contactNameError 
            result.addClass("contactOk"); //Lägger till css klassen .contactOk på span-idt. 
        } else {
            result.text("Unvalid"); //Skriver ut "Unvalid" som error meddelande på samma span som ovan
            result.addClass("contactError"); //Lägger till css klassen .contactError på t.ex. #contactNameError
        }
    }

    function validate(labelId, value) {
        var regEx = ""
        if (labelId=="#contactEmail"){
            //regEx kontroll att det är en mailadress som innehåller (minst 2 tecken av a-z, A-Z, 0-9 eller godkända symboler i mailadress), (därefter @), (därefter minst 2 tecken som domännamn), (därefter punkt .) , (därefter minst 2 tecken som domän ändelse (ex: .se / .com / .annat))
            regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        } else if (labelId=="#contactPhone") {
            //regEx kollar om telefonnumret innehåller (0046, +46 eller 0 i början),(därefter 7),(därefter 8st siffror)
            regEx = /^((((0{2}?)|(\+){1})46)|0)7[\d]{8}/;
        } else if (labelId=="#contactName") {
            //regEx kollar a-ö,A-Ö,mellanslag och minst 3 tecken. 
            regEx = /[a-zA-ZåäöÅÄÖ+ ]{3,}/;
        } else if (labelId=="#contactSubject") {
            //regEx kollar a-ö,A-Ö,0-9,mellanslag samt tecken: ():;,.?!" och minst 1 tecken. 
            regEx = /[0-9.,:;()!?\"\-\/a-zA-ZåäöÅÄÖ+ ]{1,}/;
        } else if (labelId=="#contactMessage") {
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


}); //Stänger document.ready


/* End Contact save to JSON */