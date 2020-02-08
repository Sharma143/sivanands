const thankyouPage = () => {
  var transactionID = getCookie("transactionId");
  if (transactionID.length == 0) {
    window.location.href = "./";
  }
  var invoice_path = getCookie("invoice_path");
  var transID = getCookie("transID");
  $("#paymentTransID").text(transactionID);
  $("#invoice").attr("href", invoice_path);
  deleteAllCookies();
};
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
