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
    };

    const setSameColorOnSquares = () => {
      squares.forEach(e => {
        setBgrColor(winningColor, e);
      });
    };

    const hide = elem => {
      const e = elem;
      e.style.visibility = "hidden";
    };

    const processClickedSquare = sqr => {
      const squareId = Number(sqr.dataset.id);
      if (isWinner(squareId)) {
        setSameColorOnSquares();
      } else {
        hide(sqr);
      }
    };

    const addListenersToSquares = () => {
      squares.forEach(elem => {
        elem.addEventListener("click", function fn() {
          processClickedSquare(this);
        });
      });
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

    const init = () => {
      setBgrColorsAndDataOnSquares();
      setWinningColorAndWinningId();
      setBgrColor(winningColor, squares[winningId]);
      showOnPage(winningColor, displayElem);
      addListenersToSquares();
      console.log(`${winningColor}, winning id: ${winningId}}`);
    };

    return { init };
  })();

  colorGame.init();
});
