/** @format */
import "../css/index.css";

$(document).ready(function main() {
  const colorGame = (() => {
    const rgbLowerBound = 0;
    const rgbUpperBound = 256;
    const noOfColorSquares = 6;
    const squares = document.querySelectorAll(".square");
    const resetElem = document.querySelector(".new-colors");
    const jumbotron = document.querySelector(".jumbotron");
    const displayElem = ".rgb-text";
    const jumbotronColor = "steelblue";
    const bodyClr = "#15151b";
    const borderClr = "#f8f9fa";
    let winningColor;
    let winningId;

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

    const isWinner = candidate => {
      return winningId === candidate;
    };
    const setBgrColor = (color, elem) => {
      const e = elem;
      e.style.backgroundColor = color;
      e.style.borderColor = borderClr;
    };

    const setSameColorOnSquares = () => {
      squares.forEach(e => {
        setBgrColor(winningColor, e);
      });
    };

    const hide = elem => {
      const e = elem;
      e.style.backgroundColor = bodyClr;
      e.style.borderColor = bodyClr;
    };

    const processClickedSquare = sqr => {
      const squareId = Number(sqr.dataset.id);
      if (isWinner(squareId)) {
        setSameColorOnSquares();
        setBgrColor(winningColor, jumbotron);
        resetElem.textContent = "Play again?";
      } else {
        hide(sqr);
      }
    };

    const setData = (elem, property, val) => {
      const element = elem;
      element.dataset[property] = val;
    };

    const setBgrColorsAndDataOnSquares = () => {
      squares.forEach((e, i) => {
        setBgrColor(getRandomRgbColor(), e);
        setData(e, "id", i);
      });
    };

    const setWinningColorAndWinningId = () => {
      winningColor = getRandomRgbColor();
      winningId = getRandomInt(0, noOfColorSquares);
    };

    const addListenersToSquares = () => {
      squares.forEach(elem => {
        elem.addEventListener("click", function fn() {
          processClickedSquare(this);
        });
      });
    };

    const reset = () => {
      jumbotron.style.backgroundColor = "";
      resetElem.textContent = "NEW COLORS";
      setBgrColorsAndDataOnSquares();
      setWinningColorAndWinningId();
      setBgrColor(winningColor, squares[winningId]);
      showOnPage(winningColor, displayElem);
      console.log(`${winningColor}, winning id: ${winningId}}`);
    };

    const addOtherlisteners = () => {
      resetElem.addEventListener("click", reset);
    };

    const init = () => {
      reset();
      addListenersToSquares();
      addOtherlisteners();
    };

    return { init };
  })();

  colorGame.init();
});
