$(document).ready(function() {
  getCountryCode();
  $("#guest").on("click", function() {
    deleteAllCookies();
  });
  $("#indian-donation-button").on("click", function() {
    $(".submit-button,.login-button").attr("disabled", "disabled");
    $("#donationmodelpopup").modal();
    $("#login-form,#guest").show();
    $("#forgot-form,#guest2,#code,#mobilecode,#loginCheck").hide();
    $("#login-mobileNumber,#password").val("");
    $(".login-en").keyup(function() {
      if ($("#mobileNumber").val() != "" && $("#password").val() != "") {
        $(".login-button").removeAttr("disabled");
      } else {
        $(".login-button").attr("disabled", "disabled");
      }
    });
    $(".forgot-en").keyup(function() {
      if ($("#forgot-MobileNumber").val() != "") {
        $(".submit-button").removeAttr("disabled");
      } else {
        $(".submit-button").attr("disabled", "disabled");
      }
    });
  });
  $("#foreign-donation-button").on("click", function() {
    $(".submit-button,.login-button").attr("disabled", "disabled");
    $("#donationmodelpopup").modal();
    $("#login-form,#guest2,#code,#mobilecode").show();
    $("#forgot-form,#guest,#loginCheck").hide();
    $("#login-mobileNumber,#password,#code,#mobilecode").val("");
    $(".login-en").keyup(function() {
      if (
        $("#mobileNumber").val() != "" &&
        $("#password").val() != "" &&
        $("#code").val() != ""
      ) {
        $(".login-button").removeAttr("disabled");
      } else {
        $(".login-button").attr("disabled", "disabled");
      }
    });
    $(".forgot-en").keyup(function() {
      if (
        $("#forgot-MobileNumber").val() != "" &&
        $("#mobilecode").val() != ""
      ) {
        $(".submit-button").removeAttr("disabled");
      } else {
        $(".submit-button").attr("disabled", "disabled");
      }
    });
  });
  $("#frgt-password").on("click", function() {
    $("#forgot-form").show();
    $("#login-form,#passwordCheckincorrect,#passwordChecksuccess").hide();
  });
  $("#login-2").on("click", function() {
    $("#forgot-form").hide();
    $("#login-form").show();
  });
});

$(function() {
  $("form[name='register']").validate({
    rules: {
      mobileNumber: {
        required: true,
        number: true,
        minlength: 10
      },
      MobileNumber: {
        required: true,
        number: true,
        minlength: 10
      },
      password: {
        required: true,
        minlength: 8
      },
      code: {
        required: {
          depends: function(element) {
            if ("none" == $("#code").val()) {
              $("#code").val("");
            }
            return true;
          }
        }
      }
    },
    messages: {
      mobileNumber: "Please enter a valid mobile number",
      MobileNumber: "Please enter a valid mobile number",
      code: "Please select Country Code",
      password: {
        required: "Enter old password",
        minlength: jQuery.validator.format("Enter at least {0} characters")
      }
    },
    submitHandler: function(form) {}
  });
});

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function validateLogin() {
  var formData = {};
  formData["mobile_number"] = $("#code").val() + $("#login-mobileNumber").val();
  formData["password"] = $("#password").val();

  formData = JSON.stringify(formData);
  $.ajax({
    type: "POST",
    headers: {
      "content-type": "application/json"
    },
    data: formData,
    url: "http://donations.sivanandaonline.org/shivananda/User/login",
    success: function(result) {
      var response = JSON.parse(result);
      if (response.STATUS) {
        var id = response.DATA[0].id;
        var razorpay_customer_id = response.DATA[0].razorpay_customer_id;
        var salutation = response.DATA[0].salutation;
        var fullname = response.DATA[0].fullname;
        var landline = response.DATA[0].landline;
        var user_email_id = response.DATA[0].user_email_id;
        var mobile_number = response.DATA[0].mobile_number;
        var pan_num = response.DATA[0].pan_num;
        var user_type = response.DATA[0].user_type;
        var created_on = response.DATA[0].created_on;
        var updated_on = response.DATA[0].updated_on;
        var TOKEN = response.TOKEN;
        var citizen = response.DATA[0].citizen;
        var passport = response.DATA[0].passport;
        // Set Cookies
        setCookie("id", id, 1);
        setCookie("razorpay_customer_id", razorpay_customer_id, 1);
        setCookie("salutation", salutation, 1);
        setCookie("fullname", fullname, 1);
        setCookie("landline", landline, 1);
        setCookie("user_email_id", user_email_id, 1);
        setCookie("mobile_number", mobile_number, 1);
        setCookie("pan_num", pan_num, 1);
        setCookie("user_type", user_type, 1);
        setCookie("created_on", created_on, 1);
        setCookie("updated_on", updated_on, 1);
        setCookie("TOKEN", TOKEN, 1);
        setCookie("citizen", citizen, 1);
        setCookie("passport", passport, 1);
        if (citizen == "India") {
          window.location.href = "indian";
          $(".login-button").attr("disabled", "disabled");
        } else {
          window.location.href = "foreign";
          $(".login-button").attr("disabled", "disabled");
        }
      } else {
        $("#loginCheck")
          .css("color", "red")
          .show();
        $(".login-button").attr("disabled", "disabled");
        setTimeout(function() {
          $("#login-mobileNumber").val();
          $("#password").val("");
          $("#code").val("");
          $("#loginCheck").hide();
        }, 3000);
      }
    }
  });
}
function validatePassword() {
  $("#loading-payment").modal({ backdrop: "static" });
  var formData = {};
  formData["mobile_number"] =
    $("#mobilecode").val() + $("#forgot-MobileNumber").val();
  formData = JSON.stringify(formData);
  $.ajax({
    type: "POST",
    headers: {
      "content-type": "application/json"
    },
    data: formData,
    url: "http://donations.sivanandaonline.org/shivananda/User/getPass",
    success: function(result) {
      var response = JSON.parse(result);
      if (response.STATUS) {
        var frgtSucc = response.STATUS_MSG;
        $("#loading-payment").modal("hide");
        $("#passwordChecksuccess")
          .text(frgtSucc)
          .css("color", "green")
          .show();
        $("#code,#forgot-MobileNumber").val("");
        $(".submit-button").attr("disabled", "disabled");
        setTimeout(function() {
          $("#code,#forgot-MobileNumber").val("");
          $("#passwordChecksuccess")
            .text(frgtSucc)
            .css("color", "green")
            .hide();
        }, 3000);
      } else {
        $("#loading-payment").modal("hide");
        var frgtErr = response.STATUS_MSG;
        $("#passwordCheckincorrect")
          .text(frgtErr)
          .css("color", "red")
          .show();
        $("#forgot-MobileNumber").val("");
        $("#code").val("");
        $(".submit-button").attr("disabled", "disabled");
        setTimeout(function() {
          $("#forgot-MobileNumber").val("");
          $("#code").val("");
          $("#passwordCheckincorrect")
            .text(frgtErr)
            .css("color", "red")
            .hide();
        }, 3000);
      }
    }
  });
}
function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
}
function getCountryCode() {
  var dialingCodeOptions = "<option value=''>Country Code</option>";
  for (let i = 0; i < dialingCodes.length; i++) {
    let code = dialingCodes[i].code;
    let Country = dialingCodes[i].Country;
    dialingCodeOptions +=
      "<option value='" + code + "'>" + code + " - " + Country + "</option>";
  }
  document.getElementById("code").innerHTML = dialingCodeOptions;
  document.getElementById("mobilecode").innerHTML = dialingCodeOptions;
  $("option[value='+91']").remove();
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
