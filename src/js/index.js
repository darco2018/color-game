/** @format */
import "../css/index.css";

$(document).ready(function main() {
  const colorGame = (() => {
    const rgbLowerBound = 0;
    const rgbUpperBound = 256;
    const noOfColorSquares = 6;
    const squares = document.querySelectorAll(".square");
    const displayElem = ".rgb-text";
    let winningColor;
    let winningSquare;

    const getRandomInt = (minInclusive, maxExclusive) => {
      const minInt = Math.ceil(minInclusive);
      const maxInt = Math.floor(maxExclusive);
      return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
    };

    const getRandomRgbColor = () => {
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
    const setBgrColor = (color, elem) => {
      const e = elem;
      e.style.backgroundColor = color;
    };

    const setData = (elem, property, val) => {
      const element = elem;
      element.dataset[property] = val;
    };

    const addRandomBgrColorsAndOrder = arr => {
      arr.forEach((e, i) => {
        setBgrColor(getRandomRgbColor(), e);
        setData(e, "number", i);
      });
    };

    const setWinningColorAndWinningSquare = arr => {
      winningColor = getRandomRgbColor();
      winningSquare = arr[getRandomInt(0, noOfColorSquares)];
    };

    const init = () => {
      addRandomBgrColorsAndOrder(squares);
      setWinningColorAndWinningSquare(squares);
      setBgrColor(winningColor, winningSquare);
      showOnPage(winningColor, displayElem);
      addListenersTo(squares);
      console.log(
        `${winningColor}, winning sqr: ${winningSquare}, ${
          winningSquare.dataset.number
        }`
      );
    };

    return { init };
  })();

  colorGame.init();
});
