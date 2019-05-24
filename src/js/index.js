/** @format */
import "../css/main.scss";

document.addEventListener("DOMContentLoaded", () => {
  const colorGame = (() => {
    const displayElem = document.querySelector(".rgb-values");
    const squares = document.querySelectorAll(".square");
    const resetElem = document.querySelector(".btn-reset");
    const jumbotron = document.querySelector(".jumbotron");
    const levelElems = document.querySelectorAll(".btn-level");
    const scoreInfoElem = document.querySelector(".info-score");
    const roundInfoElem = document.querySelector(".info-round");
    const helpBtn = document.querySelector(".btn-help");
    const rgbimgElem = document.querySelector(".rgbimg-wrapper");
    const borderClr = "#f8f9fa";
    let winningColor = "";
    const ROUNDS_LIMIT = 5;
    let currentRound = 0;
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
    let totalScore = LEVEL.hard * ROUNDS_LIMIT;
    let currentScore = LEVEL.hard * ROUNDS_LIMIT;
    let winningId = -1;

    const getRandomInt = (minInclusive, maxExclusive) => {
      const minInt = Math.ceil(minInclusive);
      const maxInt = Math.floor(maxExclusive);
      return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
    };

    const getRandomRgbColor = () => {
      const rgbLowerBound = 0;
      const rgbUpperBound = 256;
      const red = getRandomInt(rgbLowerBound, rgbUpperBound);
      const green = getRandomInt(rgbLowerBound, rgbUpperBound);
      const blue = getRandomInt(rgbLowerBound, rgbUpperBound);
      const color = `rgb(${red}, ${green}, ${blue})`;
      return color;
    };

    const isWinner = candidate => {
      return winningId === candidate;
    };

    const hide = elem => {
      const e = elem;
      e.classList.add("transparent");
    };

    const unhide = elem => {
      const e = elem;
      e.classList.remove("transparent");
    };

    const styleBgrAndBorder = (color, elem) => {
      const e = elem;
      e.style.backgroundColor = color;
      e.style.borderColor = borderClr;
    };

    const styleSquaresWithWinningClr = () => {
      for (let i = 0; i < noOfColorSquares; i++) {
        if (i < noOfVisibleSquares) {
          const sqr = squares[i];
          styleBgrAndBorder(winningColor, sqr);
          unhide(sqr);
        }
      }
    };

    const isFinalRound = () => {
      return currentRound >= ROUNDS_LIMIT;
    };

    const updateRoundsCount = () => {
      if (isFinalRound()) {
        currentGameStatus = GAME_STATUS.over;
        currentRound = 1;
        currentScore = totalScore;
      } else {
        currentRound++;
      }
    };

    const processRoundEnd = () => {
      currentRoundStatus = ROUND_STATUS.over;
      const gameOver = isFinalRound();
      if (gameOver) {
        scoreInfoElem.classList.toggle("highlight");
      }
      resetElem.textContent = gameOver ? "new game" : "next round";
      resetElem.classList.add("highlight");
      styleSquaresWithWinningClr();
      styleBgrAndBorder(winningColor, jumbotron);
    };

    const processClickedSquare = sqr => {
      if (currentRoundStatus === ROUND_STATUS.over) return;

      if (isWinner(Number(sqr.dataset.id))) {
        processRoundEnd();
      } else {
        hide(sqr);
        currentScore -= 1;
      }
      scoreInfoElem.textContent = `${currentScore} / ${totalScore}`;
      roundInfoElem.textContent = currentRound;
    };

    const setId = (elem, property, val) => {
      const element = elem;
      element.dataset[property] = val;
    };

    const setBgrColorAndIdOnSquares = () => {
      for (let i = 0; i < noOfColorSquares; i++) {
        if (i < noOfVisibleSquares) {
          styleBgrAndBorder(getRandomRgbColor(), squares[i]);
          setId(squares[i], "id", i);
        } else {
          hide(squares[i]);
        }
      }
    };

    const calculateWinningId = () => {
      winningId = getRandomInt(0, noOfVisibleSquares);
    };

    const calculateWinningColor = () => {
      winningColor = getRandomRgbColor();
    };

    const addListenersToSquares = () => {
      squares.forEach(elem => {
        elem.addEventListener("click", function fn() {
          processClickedSquare(this);
        });
      });
    };

    const updateDisplay = () => {
      jumbotron.style.backgroundColor = "";
      resetElem.textContent = isFinalRound() ? "new game" : "new colors";
      resetElem.classList.remove("highlight");
      scoreInfoElem.textContent = `${currentScore} / ${totalScore}`;
      scoreInfoElem.classList.remove("highlight");
      roundInfoElem.textContent = currentRound;

      setBgrColorAndIdOnSquares();
      styleBgrAndBorder(winningColor, squares[winningId]);
      displayElem.textContent = winningColor;
      // console.log(`${winningColor}, winning id: ${winningId}}`);
    };

    const reset = () => {
      updateRoundsCount();
      currentRoundStatus = ROUND_STATUS.on;
      currentGameStatus = GAME_STATUS.on;
      noOfVisibleSquares = currentLevel;
      calculateWinningId();
      calculateWinningColor();

      updateDisplay();
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
        totalScore = currentLevel * ROUNDS_LIMIT;
        currentScore = totalScore;
        currentRound = ROUNDS_LIMIT;
        reset();
      }
    };

    const addOtherlisteners = () => {
      resetElem.addEventListener("click", () => {
        if (resetElem.textContent === "new colors") {
          currentScore -= 2;
        }
        reset();
      });

      levelElems.forEach(elem => {
        elem.addEventListener("click", processLevelBtns);
      });

      helpBtn.addEventListener("click", () => {
        console.log(this);
        helpBtn.textContent =
          helpBtn.textContent === "hide help" ? "help" : "hide help";
        rgbimgElem.classList.toggle("hidden");
      });
    };

    const init = () => {
      scoreInfoElem.textContent = `${currentScore} / ${totalScore}`;
      reset();
      addListenersToSquares();
      addOtherlisteners();
    };

    return { init };
  })();

  colorGame.init();
});
