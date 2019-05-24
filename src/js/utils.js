/** @format */

// const exports = (module.exports = {});

exports.getRandomInt = (minInclusive, maxExclusive) => {
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
/* 
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
