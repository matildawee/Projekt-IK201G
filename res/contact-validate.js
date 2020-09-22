$(document).ready(function() {
/* Start Contact validate */

    $("#contactName").blur(function() {
        var result = $("#contactErrorName");
        var textToValidate = $("#contactName").val();
        result.text("");

        if (validate(textToValidate, "name")) {
            result.text("OK");
            result.css("background", "green");
          } else {
            result.text("Not a valid name");
            result.css("background", "red");
          }
          return false;
    });

    $("#contactPhone").blur(function() {
        var result = $("#contactErrorPhone");
        var textToValidate = $("#contactPhone").val();
        result.text("");

        if (validate(textToValidate, "mobilePhone")) {
            result.text("OK");
            result.css("background", "green");
          } else {
            result.text("Not a valid phone");
            result.css("background", "red");
          }
          return false;
    });

    $("#contactEmail").blur(function () {
        var result = $("#contactErrorEmail");
        var textToValidate = $("#contactEmail").val();
        result.text("");
      
        if (validate(textToValidate, "eMail")) {
          result.text("OK");
          result.css("background", "green");
        } else {
          result.text("Not a valid email");
          result.css("background", "red");
        }
        return false; 
    });

    $("#contactSubject").blur(function () {
        var result = $("#contactErrorSubject");
        var textToValidate = $("#contactSubject").val();
        result.text("");
      
        if (validate(textToValidate, "#contactSubject")) {
          result.text("OK");
          result.css("background", "green");
        } else {
          result.text("Write a subject");
          result.css("background", "red");
        }
        return false; 
    });

    $("#contactMessage").blur(function () {
        var result = $("#contactErrorMessage");
        var textToValidate = $("#contactMessage").val();
        result.text("");
      
        if (validate(textToValidate, "#contactMessage")) {
          result.text("OK");
          result.css("background", "green");
        } else {
          result.text("Write a message");
          result.css("background", "red");
        }
        return false; 
    });

    function validate(value, type) {
        var regEx = ""
        if (type=="eMail"){
            regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        } else if (type=="mobilePhone") {
            regEx = /^((((0{2}?)|(\+){1})46)|0)7[\d]{8}/;
        } else if (type=="name") {
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