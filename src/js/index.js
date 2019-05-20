/** @format */
import "../css/index.css";

$(document).ready(function main() {
  const colorGame = (() => {
    const ROUNDS_LIMIT = 5;
    let currentRound = 0;
    const rgbLowerBound = 0;
    const rgbUpperBound = 256;
    const GAME_STATUS = {
      over: 0,
      on: 1,
    };
    let currentGameStatus = GAME_STATUS.on;
    const ROUND_STATUS = {
      over: 0,
      on: 1,
    };
    let currentRoundStatus = ROUND_STATUS.on;
    const LEVEL = {
      easy: 3,
      hard: 6,
    };
    let currentLevel = LEVEL.hard;

    const noOfColorSquares = 6;
    let noOfVisibleSquares = 6;
    const totalScore = LEVEL.hard * noOfVisibleSquares;
    const bodyClr = "#15151b";
    const borderClr = "#f8f9fa";
    let winningColor;
    let winningId = -1;
    const displayElem = ".rgb-text";
    const squares = document.querySelectorAll(".square");
    const resetElem = document.querySelector(".new-colors");
    const jumbotron = document.querySelector(".jumbotron");
    const levelElems = document.querySelectorAll(".level");
    const scoreInfoElem = document.querySelector(".info-score");
    const roundInfoElem = document.querySelector(".info-round");

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
      for (let i = 0; i < noOfColorSquares; i++) {
        if (i < noOfVisibleSquares) {
          setBgrColor(winningColor, squares[i]);
        }
      }
    };

    const hide = elem => {
      const e = elem;
      e.style.backgroundColor = bodyClr;
      e.style.borderColor = bodyClr;
    };

    const isFinalRound = () => {
      return currentRound >= ROUNDS_LIMIT;
    };

    const processClickedSquare = sqr => {
      if (currentRoundStatus === ROUND_STATUS.over) return;

      if (isWinner(Number(sqr.dataset.id))) {
        setSameColorOnSquares();
        setBgrColor(winningColor, jumbotron);
        resetElem.textContent = "Play again?";
        currentRoundStatus = ROUND_STATUS.over;
        /* if (isFinalRound()) {
          currentGameStatus = GAME_STATUS.over;
        } */
      } else {
        hide(sqr);
      }

      roundInfoElem.textContent = currentRound;
    };

    const setData = (elem, property, val) => {
      const element = elem;
      element.dataset[property] = val;
    };

    const setBgrColorsAndDataOnSquares = () => {
      for (let i = 0; i < noOfColorSquares; i++) {
        if (i < noOfVisibleSquares) {
          setBgrColor(getRandomRgbColor(), squares[i]);
          setData(squares[i], "id", i);
        } else {
          hide(squares[i]);
        }
      }
    };

    const setWinningColorAndWinningId = () => {
      winningColor = getRandomRgbColor();
      winningId = getRandomInt(0, noOfVisibleSquares);
    };

    const addListenersToSquares = () => {
      squares.forEach(elem => {
        elem.addEventListener("click", function fn() {
          processClickedSquare(this);
        });
      });
    };

    const updateRoundsCount = () => {
      if (isFinalRound()) {
        currentRound = 1;
        currentGameStatus = GAME_STATUS.over;
      } else {
        currentRound++;
      }
    };

    const reset = () => {
      updateRoundsCount();
      roundInfoElem.textContent = currentRound; // display
      currentRoundStatus = ROUND_STATUS.on;
      noOfVisibleSquares = currentLevel;
      jumbotron.style.backgroundColor = "";
      resetElem.textContent = "NEW COLORS";
      setBgrColorsAndDataOnSquares();
      setWinningColorAndWinningId();
      setBgrColor(winningColor, squares[winningId]);
      showOnPage(winningColor, displayElem);
      console.log(`${winningColor}, winning id: ${winningId}}`);
    };

    const toggleLevel = () => {
      return currentLevel === LEVEL.hard ? LEVEL.easy : LEVEL.hard;
    };

    const processLevelBtns = function fn() {
      if (!this.classList.contains("selected")) {
        levelElems.forEach(elem => {
          elem.classList.toggle("selected");
        });
        currentLevel = toggleLevel();
        currentRound = ROUNDS_LIMIT;
        reset();
      }
    };

    const addOtherlisteners = () => {
      resetElem.addEventListener("click", reset);

      levelElems.forEach(elem => {
        elem.addEventListener("click", processLevelBtns);
      });
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
