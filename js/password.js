$(document).ready(function() {
  $(".forgot-en").keyup(function() {
    if (
      $("#resetPassword").val() != "" &&
      $("#resetConfirmPassword").val() != ""
    ) {
      $(".forgotsubmit").removeAttr("disabled");
    } else {
      $(".forgotsubmit").attr("disabled", "disabled");
    }
  });
});
function checkToken() {
  var currentURL = window.location.href;
  var url = new URL(currentURL);
  let authToken = url.searchParams.get("key");
  if (authToken == "" || authToken == null || authToken == undefined) {
    $("#experiedlink").text(
      "The password reset link has been expired. You will be redirected to home page where you can generate a new link by going to the forgot password screen."
    );
    $("#linkexpired").hide();
    setTimeout(function() {
      window.location.href = "../index.html";
    }, 6000);
  }
}
$(function() {
  $("form[name='password-register']").validate({
    rules: {
      resetPassword: {
        required: true,
        minlength: 8
      },
      resetConfirmPassword: {
        required: true,
        minlength: 8
      }
    },
    messages: {
      resetConfirmPassword: "please enter minimum 8 characters",
      resetPassword: "please enter minimum 8 characters"
    },
    submitHandler: function(form) {}
  });
});

function submitForm() {
  var currentURL = window.location.href;
  var url = new URL(currentURL);
  let authToken = url.searchParams.get("key");
  if (authToken == "" || authToken == null || authToken == undefined) {
    $("#errMsgs").html("Invalid Token");
    return false;
  }
  let password = $("#resetPassword").val();
  let confirmPassword = $("#resetConfirmPassword").val();
  if (password.length < 8) {
    $("#errMsgs").html("Password must be minimum of 8 in length");
    return false;
  }
  if (password != confirmPassword) {
    $("#errMsgs").html("Password does not match");
    return false;
  }

  var formData = {};
  formData["newPass"] = password;
  formData["confirmPass"] = password;
  formData = JSON.stringify(formData);
  $.ajax({
    type: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authToken
    },
    data: formData,
    url: "http:///donations.sivanandaonline.org/shivananda/User/updatePass",
    success: function(result) {
      var response = JSON.parse(result);
      if (response.STATUS) {
        $("#password-error-msg").modal("show");
        $("#passworderrormessage").text("Password updated successfully");
        setTimeout(function() {
          window.location.href = "../index.html";
        }, 3000);
      } else {
        $("#password-error-msg").modal("show");
        $("#passworderrormessage").text(
          "The password reset link has been expired. You will be redirected to home page where you can generate a new link by going to the forgot password screen."
        );
        setTimeout(function() {
          window.location.href = "../index.html";
        }, 6000);
      }
    }
  });
  return false;
}
