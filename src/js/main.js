document.getElementById("two").innerHTML = "JS is working";

//j is lowercase: jQuery
if (jQuery) {
    $("#two").append("<br>Jquery is loaded - from CDN");
} else {
    alert("Jquery is NOT loaded");
}
