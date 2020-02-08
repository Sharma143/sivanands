var dismissBhandara = false;
var bhandaraFormObject = false;
let selectedCorpus = [];
let arrDonations = [];
var neftCanceled = false;
var datepicker = $.fn.datepicker.noConflict(); // return $.fn.datepicker to previously assigned value
$.fn.bootstrapDP = datepicker; // give $().bootstrapDP the bootstrap-datepicker functionality

const preFill = () => {
  var userId = getCookie("id");
  if (!userId) {
    $("#home-page").show();
  } else {
    $("#home-page").hide();
  }
  if (userId.length == 0) {
    $("#address_id").val("");
    $("#addresChange").hide();
    $("#pincode, #city, #address1, #address2,#mobilenum")
      .removeAttr("readonly")
      .css("cursor", "auto");
    return false;
  }
  var id = getCookie("id");
  var salutation = getCookie("salutation");
  var fullname = getCookie("fullname");
  var landline = getCookie("landline");
  var user_email_id = getCookie("user_email_id");
  var mobile_number = getCookie("mobile_number");
  var pan_num = getCookie("pan_num");
  var address_line1 = getCookie("address_line1");
  var address_line2 = getCookie("address_line2");
  var city = getCookie("city");
  var district = getCookie("district");
  var state = getCookie("state");
  var pincode = getCookie("pincode");
  var token = getCookie("TOKEN");

  $("#fullname").val(fullname);
  $("#pannumber").val(pan_num);
  $("#salutation").val(salutation);
  $("#email").val(user_email_id);
  $("#confirmmail").val(user_email_id);
  $("#landline").val(landline);
  $("#mobilenum").val(mobile_number);
  $("#address1").val(address_line1);
  $("#address2").val(address_line2);
  $("#city").val(city);
  $("#state").val(state);
  $("#district").val(district);
  $("#pincode").val(pincode);

  var formData = {};
  formData["user_id"] = id;

  formData = JSON.stringify(formData);
  $.ajax({
    type: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: token
    },
    data: formData,
    url: "http://donations.sivanandaonline.org/shivananda/address/addressList",
    success: function(response) {
      var response = JSON.parse(response);
      if (response.STATUS) {
        var address = response.DATA[0];
        var addressId = address.id;
        var address1 = address.address_line1;
        var address2 = address.address_line2;
        var city = address.city;
        var district = address.district;
        var state = address.state;
        var pincode = address.pincode;

        $("#address_id").val(addressId);
        $("#address1").val(address1);
        $("#address2").val(address2);
        $("#city").val(city);
        $("#pincode").val(pincode);
        $("#state").val(state);
        $("#district").val(district);
      }
    }
  });
};

// address list functions

function changeAddres() {
  var userId = getCookie("id");
  if (!userId) {
    $("#address_id").val(0);
    return false;
  }
  var formData = {};
  formData["user_id"] = userId;

  formData = JSON.stringify(formData);
  $.ajax({
    type: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "token"
    },
    data: formData,
    url: "http://donations.sivanandaonline.org/shivananda/Address/addressList",
    success: function(response) {
      var response = JSON.parse(response);
      var arrAddress = response.DATA;
      var address = "";
      var addressTable = "";
      for (var i = 0; i < arrAddress.length; i++) {
        address = arrAddress[i];
        addressTable +=
          "<a onclick='selectAddress(" +
          JSON.stringify(address) +
          ")'>" +
          address.address_line1 +
          ", " +
          address.address_line2 +
          ", " +
          address.district +
          ", " +
          address.city +
          ", " +
          address.state +
          " - " +
          address.pincode +
          " - " +
          address.country +
          "</a><br><br>";
        $("#pincode, #city, #address1, #address2").attr("readonly", true);
      }
      $("#addressPopup").html(addressTable);
    }
  });
}

function addAddress() {
  $("#address_id").val(0);
  $("#address1").val("");
  $("#address2").val("");
  $("#city").val("");
  $("#pincode").val("");
  $("#state").val("");
  $("#district").val("");
  $(".popup-overlay, .popup-content").removeClass("active");
  $("#address1").focus();
  $("#pincode, #city, #address1, #address2")
    .removeAttr("readonly")
    .css("cursor", "auto");
}
function selectAddress(address) {
  $("#address_id").val(address.id);
  $("#address1").val(address.address_line1);
  $("#address2").val(address.address_line2);
  $("#city").val(address.city);
  $("#pincode").val(address.pincode);
  $("#state").val(address.state);
  $("#district").val(address.district);
  $(".popup-overlay,.popup-content").removeClass("active");
}

$(".changeAddress").on("click", function() {
  $(".popup-overlay,.popup-content").addClass("active");
});

$(".close_Address").on("click", function() {
  $(".popup-overlay,.popup-content").removeClass("active");
});

$(document).ready(function() {
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
            if ("none" == $("#salutation").val()) {
              $("#salutation").val("");
            }
            return true;
          }
        }
      },
      citizen: {
        required: {
          depends: function(element) {
            if ("none" == $("#citizen").val()) {
              $("#citizen").val("");
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
        required: true,
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
              $("#inputState").val("");
            }
            return true;
          }
        }
      },
      district: {
        required: {
          depends: function(element) {
            if ("none" == $("#district").val()) {
              $("#inputdistrict").val("");
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
      }
    },
    messages: {
      salutation: "Please select Salutate",
      fullname: "Please enter your Name",
      pan_num: "Please enter the valid Pan",
      city: "Please enter valid city",
      district: "Please select valid city",
      state: "Please select valid state",
      address1: "Please enter a valid address1",
      email: "Please enter a valid email address",
      confirmmail: "Please enter the same email address",
      pincode: "Please enter a valid pincode",
      mobilenum: "Please enter a valid mobile number"
    },
    submitHandler: function(form) {
      $("#displaypersonaldetails1").html($("#salutation").val());
      $("#displaypersonaldetails2").html($("#fullname").val());
      $("#displaypersonaldetails3").html($("#pannumber").val());
      $("#displaypersonaldetails4").html($("#city").val());
      $("#displaypersonaldetails5").html($("#district").val());
      $("#displaypersonaldetails6").html($("#state").val());
      $("#displaypersonaldetails7").html($("#address1").val());
      $("#displaypersonaldetails8").html($("#email").val());
      $("#displaypersonaldetails9").html($("#pincode").val());
      $("#displaypersonaldetails10").html($("#mobilenum").val());
      $("#displaypersonaldetails11").html($("#landline").val());

      $("#personaldetialmodal").modal({ backdrop: "static" });
    }
  });
});

$("body").on(
  "change",
  ".general-donation.donation-checkbox, .corpus-donation.donation-checkbox",
  function(e) {
    let donationid = $(this).data("donation");
    if (donationid == 0) {
      $("#bhandara-modal").modal({ backdrop: "static" });
      if (bhandaraFormObject) {
        this.checked = true;
      }
    } else {
      if (e.target.checked) {
        $("#donation-" + donationid).addClass("show");
      } else {
        $("#donation-" + donationid).removeClass("show");
        if ($(this).hasClass("general-donation")) {
          genSum -= $("#donation-" + donationid).val();
        } else {
          corpSum -= $("#donation-" + donationid).val();
        }
        $("#donation-" + donationid).val("");
        $("#error-donation-" + donationid).addClass("d-none");
        $("#totalgeneraldonations").text("₹" + genSum);
        $("#totalcorpusdonations").text("₹" + corpSum);
        $("#totaldonationamount").text("₹" + (genSum + corpSum));
      }
    }
  }
);

var bhandaraTotal = 0;
let totalToDisplay = 0;
$("#bhandara-details-form").on(
  "change",
  ".bhandara-donation.donation-checkbox",
  function(e) {
    if (e.target.checked) {
      totalToDisplay += $("#" + this.name).data("amount");
    } else {
      totalToDisplay -= $("#" + this.name).data("amount");
    }
    $("#bhandarafoodtotal").text("₹ " + totalToDisplay);
  }
);

$(document).ready(function(e) {
  $.ajax({
    url: "../donation-cat-list.json",
    success: function(result) {
      result.DATA.forEach(donItem => {
        if (donItem.parent_id == "1" || donItem.parent_id == "0") {
          let d = getDonationItem(donItem, "general");
          $("#general-donations-container").append(d);
        } else if (donItem.parent_id == "2") {
          let d = getDonationItem(donItem, "corpus");
          $("#corpus-donations-container").append(d);
        } else {
          let d = getBhandaraItem(donItem);
          $("#bhandara-donations-container").append(d);
        }
      });
    }
  });
});
var genSum = 0;
var corpSum = 0;
$("body").on("blur", ".donation-amount", function(e) {
  if ($(this).hasClass("general-donation")) {
    let elem = this;
    calculateGeneralDonations();
  }

  if ($(this).hasClass("corpus-donation")) {
    let elem = this;
    corpSum = 0;
    $.each($(".corpus-donation.donation-amount"), function(i, e) {
      if ($(e).val() != "") {
        if ($(e).val() < 25000) {
          $("#notice-modal-message").text(
            "Corpus Fund donation should be minimum of Rs.25,000/-. Alternatively the donor can choose to donate under General Donations."
          );
          $("#notice-modal").modal("show");
          $(elem).val("");
          $(elem).focus();
        } else {
          corpSum += parseInt($(e).val());
        }
        $("#totalcorpusdonations").text("₹" + corpSum);
        $("#totaldonationamount").text("₹" + (genSum + corpSum));
      }
    });
  }
});

function calculateGeneralDonations() {
  genSum = 0;
  $.each($(".general-donation.donation-amount"), function(i, e) {
    if ($(e).val() != "") {
      genSum += parseInt($(e).val());
      $("#totalgeneraldonations").text("₹" + genSum);
      $("#totaldonationamount").text("₹" + (genSum + corpSum));
    }
  });
  if (genSum > 150000) {
    genSum = 0;
    $("#notice-modal-message").text(
      "For various practical reasons the Ashram does not accept huge amounts (more than 1,50,000 INR) under General Donations. The donor may kindly contact the General Secretary through generalsecretary@sivanandaonline.org for further details and instructions"
    );
    $(".general-donation").prop("checked", false);
    $(".general-donation")
      .removeClass("show")
      .val("");
    $("#bhandara-details-form")[0].reset();
    $("#donation-0")
      .val("")
      .removeClass("show");
    $(".error")
      .text("")
      .css("display", "none");
    let bhandaraTotal = 0;
    $("#bhandarafoodtotal").text("₹ " + bhandaraTotal);
    calculateGeneralDonations();
    $("#totalgeneraldonations").text("₹" + genSum);
    $("#totaldonationamount").text("₹" + (genSum + corpSum));
    $("#notice-modal").modal("show");
  }
}

$("#clear-bhandara").on("click", function() {
  totalToDisplay = 0;
  $("#bhandara-details-form")[0].reset();
  $("input[name='donation-0']")[0].checked = false;
  $("#donation-0")
    .val("")
    .removeClass("show");
  let bhandaraTotal = 0;
  $("#bhandarafoodtotal").text("₹ " + bhandaraTotal);
  calculateGeneralDonations();
  $("#totalgeneraldonations").text("₹" + genSum);
  $("#totaldonationamount").text("₹" + (genSum + corpSum));
});

$("#bhandara-details-form").validate({
  rules: {
    "bhandara-date": {
      required: "input.bhandara-donation.donation-checkbox:checked"
    }
  },
  submitHandler: function(form) {
    let bhandaraArray = $(form).serializeArray();
    if (bhandaraArray.length > 3) {
      bhandaraFormObject = {};
      $("#bhandara-error-msg").addClass("d-none");
      let bhandaraTotal = 0;
      $.each(bhandaraArray, function() {
        if (this.name.split("-")[0] == "donation") {
          bhandaraFormObject[this.name] = $("#" + this.name).data("amount");
          bhandaraTotal += $("#" + this.name).data("amount");
          $("#bhandarafoodtotal").text("₹ " + bhandaraTotal);
        } else {
          bhandaraFormObject[this.name] = this.value;
        }
      });

      dismissBhandara = true;
      $("#bhandara-modal").modal("hide");
      $("#donation-0")
        .attr("readonly", true)
        .val(bhandaraTotal)
        .addClass("show");
      calculateGeneralDonations();
    } else {
      if ($("#bhandara-date").val().length > 0) {
        $("#bhandara-error-msg").removeClass("d-none");
      } else {
        bhandaraFormObject = false;
        dismissBhandara = true;
        $("#donation-0")
          .val("")
          .removeClass("show");
        $("input[name='donation-0']")[0].checked = false;
        bhandaraTotal = 0;

        $("#bhandarafoodtotal").text("₹ " + bhandaraTotal);
        calculateGeneralDonations();
        $("#totalgeneraldonations").text("₹" + genSum);

        $("#totaldonationamount").text("₹" + (genSum + corpSum));
        $("#bhandara-modal").modal("hide");
      }
    }
    return false;
  }
});

$("#donations-form").on("submit", function(event) {
  if (genSum == "" && corpSum == "") {
    $("#notice-modal").modal();
    $("#notice-modal-message").text(
      "Please select any of the above options to proceed further"
    );
    $(".donation-checkbox").prop("checked", false);
    $(".donation-amount").removeClass("show");
  }
  if (genSum >= 1 && corpSum >= 1) {
    $("#genCorpTotal").show();
  } else {
    $("#genCorpTotal").hide();
  }

  let genItems = "";
  let corpusItems = "";
  selectedCorpus = [];
  arrDonations = [];
  let eachRec = {};
  let f = $(this).serializeArray();
  let stop = false;
  $.each(f, function(i, e) {
    let v = $("#" + this.name).val();
    let did = $("input[name=" + this.name + "]").data("donation");
    let label = $("#label-" + did).text();
    let parent = $("input[name=" + this.name + "]").data("parent");
    eachRec = { id: did, parent_id: parent, dcat_amount: v };
    arrDonations.push(eachRec);
    if (did != 0) {
      if (v.length > 0 && v > 0) {
        $("#error-" + this.name).addClass("d-none");
        if (
          $("input[name='" + this.name + "']").hasClass("corpus-donation") &&
          v < 25000
        ) {
          $("#notice-modal-message").text(
            "Corpus Fund donation should be minimum of Rs.25,000/-. Alternatively the donor can choose to donate under General Donations."
          );
          $("#notice-modal").modal("show");
          $("#" + this.name).focus();
          stop = true;
          return false;
        }
      } else {
        $("#error-" + this.name)
          .text("This field is required")
          .removeClass("d-none");
        $(".error").css("display", "block");
        $("#" + this.name).focus();
        stop = true;
        return false;
      }
    }

    let item =
      "<div class='row'>" +
      "<div class='col col-md-7'><p>" +
      label +
      "</p></div><div class='col col-md-2'><hr></div><div class='col col-md-3 text-center'>" +
      "₹" +
      v +
      "</div>" +
      "</div>";
    if (parent == "1") {
      genItems += item;
    } else {
      corpusItems += item;
      selectedCorpus.push(label + " = ₹" + v);
    }

    $("#generalbody").html(genItems);
    $("#corpusbody").html(corpusItems);
    $("#previewtotaldonamount").html($("#totaldonationamount").text());
    if (genItems < 1) {
      $("#generalheading").hide();
    } else {
      $("#generalheading").show();
    }
    if (corpusItems < 1) {
      $("#corpusheading").hide();
    } else {
      $("#corpusheading").show();
    }
  });

  let bhanVal = Object.keys(bhandaraFormObject);
  bhanVal.forEach(e => {
    let k = e.split("-");
    if (k[0] == "donation" && $("input[name=" + e + "]")["0"].checked) {
      arrDonations.push({
        id: k[1],
        parent_id: 3,
        dcat_amount: bhandaraFormObject[e]
      });
    }
  });

  if (stop) {
    return false;
  }

  if (arrDonations.length !== 0) {
    $("#donationpreview").modal();
  }

  event.preventDefault();
});
$("#proceedbutton3").on("click", function() {
  $("input[name='consentcheck']")[0].checked = false;
  $("#agreedonation")
    .prop("disabled", true)
    .css("background-color", "#80808063");
  $("#consent-salutation").val("");
  $("#consent-fullname").val("");
  let salute = $("#salutation").val();
  if (salute == "M/S") {
    $("#consentauthorizationblock").show();
  } else {
    $("#consentauthorizationblock").hide();
  }
  let numOfCorpus = selectedCorpus.length;
  if (numOfCorpus > 0) {
    let corpustext = "";
    $.each(selectedCorpus, function(i, e) {
      if (numOfCorpus == 1) {
        corpustext = selectedCorpus[i];
        corpustext = corpustext.split("=");
        corpustext = corpustext[0];
      } else if (numOfCorpus > 1) {
        corpustext +=
          i == numOfCorpus - 1
            ? " & " + selectedCorpus[i]
            : i == numOfCorpus - 2
            ? selectedCorpus[i]
            : selectedCorpus[i] + ", ";
      }
    });
    $("#consentletter").modal({ backdrop: "static" });
    $("#selectedcorpusitems").html(corpustext);
    $("#consenttotalamount").html("₹" + corpSum);
    $("#consentletterdate").html(
      new Date().toLocaleDateString().replace(/\//g, "-")
    );
  } else {
    submitDonations();
    return false;
  }
});

function getDonationItem(donation, type) {
  let donationItem = `<hr/>
                           <div class="form-row align-items-center">
                                <div class="form-check col-md-8 col-sm-12 pt-3 stretch"> 
                                    <label class="checkmark-container"><p id="label-${donation.id}">${donation.dcat_name}</p>
                                        <input name="donation-${donation.id}" data-parent="${donation.parent_id}" data-donation="${donation.id}" class="${type}-donation donation-checkbox" type="checkbox">
                                        <span class="checkmark"></span>
                                    </label>                                     
                                </div>
                                <div class="form-group col-md-4 col-sm-12 pt-3"> 
                                    <input  id="donation-${donation.id}" type="number" class="${type}-donation donation-amount form-control" placeholder="Enter Amount">
                                    <label id="error-donation-${donation.id}" class="error d-none" for="donation-${donation.id}"></label> 
                                </div>
                            </div>`;

  return donationItem;
}
function getBhandaraItem(donation) {
  let donationItem = `
                            <div class="row">
                                <div class="col col-md-10 col-sm-10 pb-3">
                                    <label class="checkmark-container"><p>${donation.dcat_name}</p>
                                        <input  name="donation-${donation.id}" name="" data-parent="${donation.parent_id}" data-donation="${donation.id}" class="bhandara-donation donation-checkbox" type="checkbox">
                                        <span class="checkmark"></span>
                                    </label>                                     
                                </div>
                                <div class="form-group col col-md-2 col-sm-2"> 
                                   <p id="donation-${donation.id}" data-amount="${donation.amount}" class="m-0 text-center bhandara-donation donation-amount">₹${donation.amount}</p> 
                                </div>
                            </div>
                            `;
  return donationItem;
}

function setCookie(cname, cvalue, exdays) {
  if (!exdays) {
    exdays = 1;
  }
  var today = new Date();
  today.setTime(today.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + today.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
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
function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
}

$("#logout").on("click", function() {
  deleteAllCookies();
  window.location.href = "../index.html";
});

$("#proceedbutton4").on("click", function() {
  var formData = {};
  var id = getCookie("id");
  $.each($("#indiandonationform").serializeArray(), function() {
    formData[this.name] = this.value;
  });
  if (!id) {
    formData["address_id"] = 0;
  } else {
    formData["address_id"] = $("#address_id").val();
  }
  formData["country"] = "India";
  formData["citizen"] = "India";
  jsonData = JSON.stringify(formData);
  $.ajax({
    type: "POST",
    headers: {
      "content-type": "application/json"
    },
    data: jsonData,
    url: "http://donations.sivanandaonline.org/shivananda/User/signup",
    success: function(result) {
      var response = JSON.parse(result);
      if (response.STATUS) {
        if (response.PENDING_TRANS.length > 0) {
          neftPendingTrans(response);
        } else {
          setCookie("salutation", formData["salutation"]);
          setCookie("fullname", formData["fullname"]);
          setCookie("userId", response.DATA.userId);
          setCookie("addressId", response.DATA.addressId);
          setCookie("user_email_id", formData["user_email_id"]);
          setCookie("mobile_number", formData["mobile_number"]);
          $("#personaldetialmodal").modal("hide");
          $("#errsucmsg").text("success");
          $(".personaldetaildone").show();
          $("#personaldetail-tab").removeClass("active show");
          $("#personaldetail").removeClass("active");
          $("#indiandonation-tab").addClass("active show");
          $("#indiandonation").addClass("active show");
        }
      } else {
        $("#personaldetialmodal").modal("hide");
        $("#errsucmsg").text("failed");
        $("#successerrormodal").modal();
      }
    }
  });
});

function loadStateDistrict() {
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
}

$(document).ready(function() {
  var token = getCookie("TOKEN");
  if (token.length > 0) {
    $("#displayuser").text(getCookie("fullname"));
    $("#logoutblock").removeClass("d-none");
  } else {
    $("#logoutblock").addClass("d-none");
  }
  jQuery.validator.addMethod(
    "letterswithspace",
    function(value, element) {
      return this.optional(element) || /^[a-z][a-z\s]*$/i.test(value);
    },
    "letters only"
  );

  $("form[name='consent-register']").validate({
    rules: {
      consentsalutation: {
        required: {
          depends: function(element) {
            if ("none" == $("#salutation").val()) {
              $("#salutation").val("");
            }
            return true;
          }
        }
      },
      consentfullname: {
        required: true,
        letterswithspace: true
      }
    },
    messages: {
      consentsalutation: "Please select Salutate",
      consentfullname: "Please enter your Name"
    },
    submitHandler: function(form) {
      submitDonations();
    }
  });
});
$("#consentcheck").on("change", function() {
  if (this.checked == true) {
    $("#agreedonation").removeAttr("disabled", !this.checked);
    $("#agreedonation").css("background-color", "#e97601");
  } else {
    $("#agreedonation").attr("disabled", !this.checked);
    $("#agreedonation").css("background-color", "#80808063");
  }
});

$(".close-button-consent").on("click", function() {
  $("input[name='consentcheck']")[0].checked = false;
  $("#agreedonation")
    .prop("disabled", true)
    .css("background-color", "#80808063");
});

function submitDonations() {
  let bhanDate = $("#bhandara-date").val();
  var totalSum = genSum + corpSum;
  let formData = new FormData();
  formData["user_id"] = getCookie("userId");
  formData["address_id"] = getCookie("addressId");
  formData["total_amount"] = genSum + corpSum;
  formData["currency_type"] = "INR";
  formData["donationIds"] = arrDonations;
  formData["emp_salutation"] = getCookie("salutation");
  formData["emp_name"] = getCookie("fullname");
  formData["feeding_time"] = bhanDate;
  formData["feeder_name"] = $("#bhandaradonarname").val();
  formData["occasion"] = $("#occasion").val();
  jsonData = JSON.stringify(formData);
  $.ajax({
    type: "POST",
    headers: {
      "content-type": "application/json"
    },
    data: jsonData,
    url: "http://donations.sivanandaonline.org/shivananda/Payment/getPayment",
    success: function(result) {
      var response = JSON.parse(result);
      if (response.STATUS) {
        if (response.PAYMENT_TYPE == 1) {
          $("#errsucmsg").text("success");
          $("#successerrormodal").modal();
          $("#donationpreview").modal("hide");
          $("#consentletter").modal("hide");
          $("#loading-payment").modal({ backdrop: "static" });
          callPaymentGateway(totalSum, response.DATA.razorpay_orderid);
          arrDonations = [];
        } else {
          let neftMessage =
            "Please use the below details to make the NEFT transaction for completing the payment. Currently, we do not support any other payment method for amount more than 5,00,000 INR.";
          $("#neft-message").text(neftMessage);
          $("#neft-account-number").text(
            "Account Number: " + response.DATA.razorpay_virtual_accno
          );
          $("#neft-ifsc-number").text(
            "IFSC Number: " + response.DATA.razorpay_virtual_ifscno
          );
          $("#neft-transaction-amount").text(
            "Amount: " + response.PENDING_TRANS.total_amount
          );
          $("#donationpreview").modal("hide");
          $("#consentletter").modal("hide");
          $("#neft-message-modal").modal({ backdrop: "static" });
        }
      } else {
        $("#errsucmsg").text("failed");
        $("#successerrormodal").modal();
      }
    }
  });
}
$("#neft-message-modal").on("hide.bs.modal", function(e) {
  if (!neftCanceled) {
    e.preventDefault();
  }
});
function updatePaymentCapture(paymentId) {}
// razorpay

function callPaymentGateway(totalAmount, order_id) {
  const razKey = "rzp_test_aOMpXRSgIY0QS1";

  var options = {
    key: razKey,
    amount: totalAmount * 100, /// The amount is shown in currency subunits. Actual amount is ₹599.
    name: "Sivananda Online Donation",
    order_id: order_id, // Pass the order ID if you are using Razorpay Orders.
    currency: "INR", // Optional. Same as the Order currency
    description: "Doantions for the Ashram",
    modal: {
      ondismiss: function(e) {
        closedRazorpay = true;
        $("#loading-payment").modal("hide");
      }
    },

    handler: function(response) {
      updatePaymentCapture(response.razorpay_payment_id);
      setCookie("transID", response.razorpay_payment_id);
      var formData = {};
      formData["payment_id"] = response.razorpay_payment_id;
      formData["razorpay_orderid"] = order_id;

      formData = JSON.stringify(formData);
      $.ajax({
        type: "POST",
        headers: {
          "content-type": "application/json"
        },
        data: formData,
        url:
          "http://donations.sivanandaonline.org/shivananda/VirtualAccount/verify",
        success: function(result) {
          var response = JSON.parse(result);
          if (response.STATUS) {
            setCookie("invoice_path", response.DATA.invoice_path);
            setCookie("transactionId", response.DATA.transactionId);
            window.location.href = "../thankyou.html";
          }
        }
      });
    },
    prefill: {
      name: getCookie("fullname"),
      email: getCookie("user_email_id"),
      contact: getCookie("mobile_number")
    },
    notes: {
      address: "Customer Address"
    }
  };
  var rzp1 = new Razorpay(options);
  rzp1.open();
}
function neftPendingTrans(response) {
  let neftMessage =
    'You had an earlier pending transaction with the below details. If you paid the amount, please wait for upto 24 hours to be reflected in our systems. If you have not paid and  would like to cancel this transaction and start after please press "Cancel Transaction" button and continue ';
  $("#neft-message").text(neftMessage);
  $("#neft-account-number").text(
    "Account Number: " + response.ACCT_DETAILS.razorpay_virtual_accno
  );
  $("#neft-ifsc-number").text(
    "IFSC Number: " + response.ACCT_DETAILS.razorpay_virtual_ifscno
  );
  $("#neft-transaction-amount").text(
    "Total Amount: " + response.PENDING_TRANS[0].total_amount
  );
  $("#neft-cancel-transaction").removeClass("d-none");
  $("#neft-cancel-transaction").attr("data-userid", response.DATA.userId);
  $("#neft-cancel-transaction").attr(
    "data-transactionid",
    response.PENDING_TRANS[0].transcation_id
  );
  $("#neft-message-modal").modal({ backdrop: "static" });
  $("#personaldetialmodal").modal("hide");
  guestuserid = response.DATA.userId;
  $("#address_id").val(response.DATA.addressId);
}

$("#neft-cancel-transaction").click(function(e) {
  let uid = $(this).data("userid");
  let transid = $(this).data("transactionid");

  let formData = { user_id: uid, transaction_id: transid };
  formData = JSON.stringify(formData);
  $.ajax({
    type: "POST",
    headers: {
      "content-type": "application/json"
    },
    data: formData,
    url:
      "http://donations.sivanandaonline.org/shivananda/Payment/removePendingTrans",
    success: function(result) {
      var response = JSON.parse(result);
      if (response.STATUS) {
        neftCanceled = true;
        $("#neft-message-modal").modal("hide");
        $("#neft-cancel-transaction").addClass("d-none");
      } else {
        $("#neft-cancel-transaction").after(
          '<p class="text-danger error">Something went wrong. Please try again</p>'
        );
      }
    }
  });
});
