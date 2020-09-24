$(document).ready(function() {
/* Start Contact validate */

    $("#contactName").blur(function() { //När focus tappas av rutan med id #contactName
        validateOkOrError("#contactName"); //Ska valideringsfunktionen köras på #contactName
    });

    $("#contactPhone").blur(function() { //Samma som ovan, men på id: #contactPhone
        validateOkOrError("#contactPhone");
    });

    $("#contactEmail").blur(function () { //Samma som ovan, men på id: #contactEmail
        validateOkOrError("#contactEmail");
    });

    $("#contactSubject").blur(function () { //Samma som ovan, men på id: #contactSubject
        validateOkOrError("#contactSubject"); 
    });

    $("#contactMessage").blur(function () { //Samma som ovan, men på id: #contactMessage
        validateOkOrError("#contactMessage");
    });

    //Exempel indata: validateOkOrError("#contactName") för att skicka in label id för namn (behöver även en tillhörande span med id: contactNameError)
    function validateOkOrError(contactLabelId) {
        var textToValidate = $(contactLabelId).val(); //Exempel indata "#contactName" , samt val() = value
        var result = $(contactLabelId+"Error"); //"#contactNameError" , för att skriva ut OK eller Unvalid i den <span> som ligger efter label
        
        result.removeClass("contactError"); //rensar bort Classen contactError, om den finns på span där error ska skrivas ut.
        result.removeClass("contactOk"); //rensar bort Classen contactOk, om den finns. 
        result.text(""); //Tömmer meddelandet som stod i span för Error-meddelandet

        if (validate(textToValidate, contactLabelId)) {
            result.text("OK"); //Skriver ut OK som span meddelande för t.ex. id: #contactNameError 
            result.addClass("contactOk"); //Lägger till css klassen .contactOk på span-idt. 
        } else {
            result.text("Unvalid"); //Skriver ut "Unvalid" som error meddelande på samma span som ovan
            result.addClass("contactError"); //Lägger till css klassen .contactError på t.ex. #contactNameError
        }
    }

    function validate(value, type) {
        var regEx = ""
        if (type=="#contactEmail"){
            //regEx kontroll att det är en mailadress som innehåller (minst 2 tecken av a-z, A-Z, 0-9 eller godkända symboler i mailadress), (därefter @), (därefter minst 2 tecken som domännamn), (därefter punkt .) , (därefter minst 2 tecken som domän ändelse (ex: .se / .com / .annat))
            regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        } else if (type=="#contactPhone") {
            //regEx kollar om telefonnumret innehåller (0046, +46 eller 0 i början),(därefter 7),(därefter 8st siffror)
            regEx = /^((((0{2}?)|(\+){1})46)|0)7[\d]{8}/;
        } else if (type=="#contactName") {
            //regEx kollar a-ö,A-Ö,mellanslag och minst 3 tecken. 
            regEx = /[a-zA-ZåäöÅÄÖ+ ]{3,}/;
        } else if (type=="#contactSubject") {
            //regEx kollar a-ö,A-Ö,0-9,mellanslag samt tecken: ():;,.?!" och minst 1 tecken. 
            regEx = /[0-9.,:;()!?\"\-\/a-zA-ZåäöÅÄÖ+ ]{1,}/;
        } else if (type=="#contactMessage") {
            //regEx kollar a-ö,A-Ö,0-9,mellanslag samt tecken: ():;,.-/\+?!" och minst 1 tecken. 
            regEx = /[0-9.,:;()!?\"\-\+\/a-zA-ZåäöÅÄÖ+ ]{1,}/;
        } else {
            regEx = "";
        }
        //Returnerar ett regular expression test på value:
        return regEx.test(value);
    }

/* End Contact validate */

}); //Stänger document.ready

/* Start Contact save to JSON */

$( window ).unload(function() {

    var name = $('#contactName').val();
    console.log(name);

    const contactMessage = {
        "name": name,
        "phone": "07312345678",
        "email": "info@jonas.se",
        "subject": "En rubrik",
        "message": "Mitt lilla meddelande..."
    }

});

/* End Contact save to JSON */