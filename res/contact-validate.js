$(document).ready(function() {
/* Start Contact validate */

    $("#contactName").keyup(function() {
        $("#contactErrorName").html("Wrong name");
    });

    $("#contactPhone").blur(function() {
        var result = $("#contactErrorPhone");
        var mobilePhone = $("#contactPhone").val();
        result.text("");

        if (validate(mobilePhone, "mobilePhone")) {
            result.text("OK");
            result.css("background", "green");
          } else {
            result.text("Not valid phone");
            result.css("background", "red");
          }
          return false;
    });

    $("#contactEmail").blur(function () {
        var result = $("#contactErrorEmail");
        var eMail = $("#contactEmail").val();
        result.text("");
      
        if (validate(eMail, "eMail")) {
          result.text("OK");
          result.css("background", "green");
        } else {
          result.text("Not valid email");
          result.css("background", "red");
        }
        return false;
        // $("#contactErrorEmail").html("Wrong email (info@domain.com)");  
    });


    function validate(value, type) {
        var regEx = ""
        if (type=="eMail"){
            regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        } else if (type=="mobilePhone") {
            regEx = /^([+]46)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/;
        } else if (type=="name") {

        } else if (type=="message") {

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