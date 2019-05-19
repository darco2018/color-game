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
    const rgbLowerBound = 0;
    const rgbUpperBound = 256;
    const squares = document.querySelectorAll(".square");
    const displayElem = ".rgb-text";
    let currentColor = "rgb(0, 0, 0)";

    const getRandomInt = (minInclusive, maxExclusive) => {
      const minInt = Math.ceil(minInclusive);
      const maxInt = Math.floor(maxExclusive);
      return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
    };

    const getRandomColor = () => {
      const red = getRandomInt(rgbLowerBound, rgbUpperBound);
      const green = getRandomInt(rgbLowerBound, rgbUpperBound);
      const blue = getRandomInt(rgbLowerBound, rgbUpperBound);
      const color = `rgb(${red}, ${green}, ${blue})`;
      return color;
    };

    const showOnPage = (color, selector) => {
      document.querySelector(selector).textContent = color;
    };

    const addListenersTo = arr => {
      arr.forEach(elem => {
        elem.addEventListener("click", () => {
          console.log("hi");
        });
      });
    };
    const addColorTo = arr => {
      arr.forEach(e => {
        e.style.backgroundColor = getRandomColor();
      });
    };

    const init = () => {
      addListenersTo(squares);
      addColorTo(squares);
      currentColor = getRandomColor();
      showOnPage(currentColor, displayElem);
      console.log();
    };

    return { init };
  })();

  colorGame.init();
});
