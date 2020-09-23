$(document).ready(function() {
/* Start Contact validate */

    $("#contactName").blur(function() {
        validateOkOrError("#contactName");
    });

    $("#contactPhone").blur(function() {
        validateOkOrError("#contactPhone");
    });

    $("#contactEmail").blur(function () {
        validateOkOrError("#contactEmail");
    });

    $("#contactSubject").blur(function () {
        validateOkOrError("#contactSubject"); 
    });

    $("#contactMessage").blur(function () {
        validateOkOrError("#contactMessage");
    });

    //Exempel indata: validateOkOrError("#contactName") för att skicka in label och span idn för namn
    function validateOkOrError(contactLabelId) {
        var textToValidate = $(contactLabelId).val(); //Exempel indata "#contactMessage" , samt val() = value
        var result = $(contactLabelId+"Error"); //"#contactMessageError"
        
        result.removeClass("contactError");
        result.removeClass("contactOk");
        result.text("");

        if (validate(textToValidate, contactLabelId)) {
            result.text("OK");
            result.addClass("contactOk");
        } else {
            result.text("Unvalid");
            result.addClass("contactError");
        }
    }

    function validate(value, type) {
        var regEx = ""
        if (type=="#contactEmail"){
            regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        } else if (type=="#contactPhone") {
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
        //Returns a regex test on Value:
        return regEx.test(value);
    }

    // function validateMobilePhone(mobilePhone) {
    //     var regExPhone = /^([+]46)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/;
    //     return regExPhone.test(mobilePhone);
    // }

      
    //   function validate() {
    //     const $result = $("#result");
    //     const eMail = $("#contactEmail").val();
    //     $result.text("");
      
    //     if (validateEmail(email)) {
    //       $result.text(email + " is valid :)");
    //       $result.css("color", "green");
    //     } else {
    //       $result.text(email + " is not valid :(");
    //       $result.css("color", "red");
    //     }
    //     return false;
    //   }
      
    //   $("#validate").on("keyup", validate);

/* End Contact validate */

});

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