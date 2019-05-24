/** @format */

// const exports = (module.exports = {});

exports.getRandomInt = (minInclusive, maxExclusive) => {
  if (!(typeof minInclusive === "number"))
    throw Error("invalid argument: minInclusive must be a number");
  if (!(typeof maxExclusive === "number"))
    throw Error("invalid argument: maxExclusive must be a number");

  const minInt = Math.ceil(minInclusive);
  const maxInt = Math.floor(maxExclusive);
  return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
};

exports.getRandomRgbColor = () => {
  const rgbLowerBound = 0;
  const rgbUpperBound = 256;
  const red = exports.getRandomInt(rgbLowerBound, rgbUpperBound);
  const green = exports.getRandomInt(rgbLowerBound, rgbUpperBound);
  const blue = exports.getRandomInt(rgbLowerBound, rgbUpperBound);
  const color = `rgb(${red}, ${green}, ${blue})`;
  return color;
};

/**
 * @param {HTMLElement} elem
 * @param {string} attribute
 */
exports.addDataAttribute = (elem, attribute, val) => {
  if (!(typeof attribute === "string"))
    throw Error("invalid argument: attribute must be a String");
  const element = elem;
  element.dataset[attribute] = val;
};

/* WAY 2

const getRandomInt = sentence => {
  some code...
};
module.exports = getRandomInt;    << function assigned
    and then:
const toLowerCase = require('./toLowerCase.js');
toLowerCase('Hello World!');   << module.exports is a function, so no need to call it on an object

 */

/* WAY 3

module.exports = {
    getRandomInt: (minInclusive, maxExclusive) => {
      const minInt = Math.ceil(minInclusive);
      const maxInt = Math.floor(maxExclusive);
      return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
    },
  
    getRandomRgbColor: () => {
      const rgbLowerBound = 0;
      const rgbUpperBound = 256;
      const red = exports.getRandomInt(rgbLowerBound, rgbUpperBound);
      const green = exports.getRandomInt(rgbLowerBound, rgbUpperBound);
      const blue = exports.getRandomInt(rgbLowerBound, rgbUpperBound);
      const color = `rgb(${red}, ${green}, ${blue})`;
      return color;
    },
  };
   */
