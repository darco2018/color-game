/** @format */
import "../css/index.css";
/* 
document.querySelector("body").innerHTML = "JS is working";

// j is lowercase: jQuery
if (jQuery) {
  $("body").append("<p>Jquery is loaded - from CDN</p>");
} else {
  alert("Jquery is NOT loaded");
}
 */

$(document).ready(function main() {
  const colorGame = (() => {
    const squares = document.querySelectorAll(".square");

    const addListeners = () => {
      squares.forEach(elem => {
        elem.addEventListener("click", () => {
          console.log("hi");
        });
      });
    };

    const init = () => {
      addListeners();
    };

    return { init };
  })();

  colorGame.init();
});
