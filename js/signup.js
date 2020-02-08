$(document).ready(function() {
  getCountryCode();
  $("#showsignup").hide();
  getCountries();
  jQuery.validator.addMethod(
    "alphanumeric",
    function(value, element) {
      return this.optional(element) || /^[\w.]+$/i.test(value);
    },
    "Letters, numbers, and underscores only please"
  );
  jQuery.validator.addMethod(
    "lettersonly",
    function(value, element) {
      return this.optional(element) || /^[a-z]+$/i.test(value);
    },
    "Letters only please"
  );
  jQuery.validator.addMethod(
    "letterswithspace",
    function(value, element) {
      return this.optional(element) || /^[a-z][a-z\s]*$/i.test(value);
    },
    "letters only"
  );
  jQuery.validator.addMethod("pannumber", function(value, element) {
    return (
      this.optional(element) ||
      /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/i.test(value)
    );
  });
  $("form[name='registration']").validate({
    rules: {
      salutation: {
        required: {
          depends: function(element) {
            if ("none" == $("#inputSalutate").val()) {
              $("#inputSalutate").val("");
            }
            return true;
          }
        }
      },
      fullname: {
        required: true,
        letterswithspace: true
      },
      pan_num: {
        alphanumeric: true,
        pannumber: true,
        minlength: 10,
        maxlength: 10
      },

      address_line1: "required",
      state: {
        required: {
          depends: function(element) {
            if ("none" == $("#state").val()) {
              $("#state").val("");
            }
            return true;
          }
        }
      },

      country: {
        required: {
          depends: function(element) {
            if ("none" == $("#country").val()) {
              $("#country").val("");
            }
            return true;
          }
        }
      },
      foreigncountry: {
        required: {
          depends: function(element) {
            if ("none" == $("#foreigncountry").val()) {
              $("#salutation").val("");
            }
            return true;
          }
        }
      },
      district: {
        required: {
          depends: function(element) {
            if ("none" == $("#inputdistrict").val()) {
              $("#district").val("");
            }
            return true;
          }
        }
      },
      city: {
        required: true,
        lettersonly: true
      },
      email: {
        required: true,
        email: true
      },
      confirmmail: {
        required: true,
        email: true,
        equalTo: "#email"
      },
      pincode: {
        required: true,
        number: true,
        minlength: 6,
        maxlength: 6
      },
      mobile_number: {
        required: true,
        number: true,
        minlength: 10,
        maxlength: 10
      },
      password: {
        required: true,
        minlength: 8
      },
      confirPassword: {
        required: true,
        equalTo: "#password"
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
      salutation: "Please select Salutate",
      fullname: "Please enter your Name",
      pan_num: "Please enter the valid Pan",
      city: "Please enter valid city",
      district: "Please select valid district",
      state: "Please select valid state",
      address1: "Please enter a valid address1",
      email: "Please enter a valid email address",
      confirmmail: "Please enter the same email address",
      pincode: "Please enter a valid pincode address",
      mobilenumber: "Please enter a valid mobile number",
      password: "please enter minimum 8 characters",
      confirmpassword: "Password incorrect",
      salutation: "Please select code"
    },
    submitHandler: function(form) {
      event.preventDefault();
      var formData = {};
      formData["address_id"] = 0;
      formData["citizen"] = $("#citizen").val();
      formData["country"] = $("#country").val();
      $.each($(form).serializeArray(), function() {
        formData[this.name] = this.value;
      });
      formData["mobile_number"] = $("#code").val() + $("#mobilenum").val();
      formData = JSON.stringify(formData);
      $.ajax({
        type: "POST",
        headers: {
          "content-type": "application/json"
        },
        data: formData,
        url: "http://donations.sivanandaonline.org/shivananda/User/signup",
        success: function(result) {
          var response = JSON.parse(result);
          if (response.STATUS) {
            $("#notice-modal").modal();
            $("#notice-modal-message").text(
              "You've been successfully registered with Sivananda Online"
            );
            setTimeout(function() {
              window.location = "./index.html";
            }, 3000);
          } else {
            $("#notice-modal").modal();
            $("#notice-modal-message").text(
              "Citizenship cannot be changed. A user with different citizenship already exists for the given mobile number."
            );
          }
        }
      });
      return false;
    }
  });
});

function getCountryCode() {
  var dialingCodeOptions = "<option value=''>Country Code</option>";
  for (let i = 0; i < dialingCodes.length; i++) {
    let code = dialingCodes[i].code;
    let Country = dialingCodes[i].Country;
    dialingCodeOptions +=
      "<option value='" + code + "'>" + code + " - " + Country + "</option>";
  }
  document.getElementById("code").innerHTML = dialingCodeOptions;
  $("option[value='+91']").remove();
}

function getCountries() {
  var countryOptions = "<option value=''>Select Country</option>";
  for (let i = 0; i < cList.length; i++) {
    let name = cList[i].name;
    countryOptions += "<option value='" + name + "'>" + name + "</option>";
  }
  document.getElementById("country").innerHTML = countryOptions;
  document.getElementById("citizen").innerHTML = countryOptions;
}

$("#citizen").on("change", function() {
  $("#showsignup").show();
  $("#indiandonationform").trigger("reset");
  if ($(this).val() == "India") {
    $("#pannumber").prop("required", true);
    $('label[for="pannumber"]').text("PAN*");
    $("#state")
      .prop("readonly", true)
      .css("cursor", "not-allowed");
    $("#district")
      .prop("readonly", true)
      .css("cursor", "not-allowed");
    $(".foreign-salutation").addClass("d-none");
    $(".indian-salutation").removeClass("d-none");
    $("#passport-field").hide();
    $("#countrycode").hide();
    $("#country-india").hide();
  } else {
    $("#passport-field").show();
    $("#pannumber").prop("required", false);
    $('label[for="pannumber"]').text("PAN");
    $("#countrycode").show();
    $("#state")
      .prop("readonly", false)
      .css("cursor", "auto");
    $(".foreign-salutation").removeClass("d-none");
    $(".indian-salutation").addClass("d-none");
    $("#district,#state,#address1,#address2,#pincode,#city,#country")
      .prop("readonly", false)
      .css("cursor", "auto");
  }
});

$("#pincode").on("blur", function() {
  if ($("#citizen").val() === "India") {
    var pinCode = $("#pincode").val();
    if (pinCode.length == 6) {
      $.ajax({
        type: "POST",
        headers: {
          "content-type": "application/json"
        },
        url: "http://donations.sivanandaonline.org/shivananda/User/getpostal",
        data: JSON.stringify({ pincode: pinCode }),
        success: function(result) {
          result = JSON.parse(result);
          if (result.STATUS) {
            $("#state").val(result.DATA.state);
            $("#district").val(result.DATA.district);
          } else {
            $("#state").val("");
            $("#district").val("");
            $("#pincode").val("");
            $("#errsucmsg").text("Please enter a valid pincode");
            $("#successerrormodal").modal();
          }
        }
      });
    }
  } else {
  }
});
