/** @format */
import "../css/index.css";

document.querySelector("body").innerHTML = "JS is working";

// j is lowercase: jQuery
if (jQuery) {
  $("body").append("<p>Jquery is loaded - from CDN</p>");
} else {
  alert("Jquery is NOT loaded");
}
