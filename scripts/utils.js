/** @format */
const fs = require("fs");

exports.replaceInFile = (pathToFile, oldVal, newVal) => {
  // readFileSync - synchr
  // asynchr:
  fs.readFile(pathToFile, function fn(err, data) {
    if (err) {
      console.log(err);
    }

    const text = data.toString();
    const newText = text.replace(oldVal, newVal);

    fs.writeFileSync(pathToFile, newText, error => {
      if (error) console.log(error);
    });
    console.log("Successfully Written to File.");
  });
};
