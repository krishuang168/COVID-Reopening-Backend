const fs = require("fs");
const colors = require("colors"); // For colorful console.log

function readContent(filePath) {
  /* Check file existence, async way */
  fs.access(filePath, fs.F_OK, (err) => {
    if (err) {
      console.error(err);
      return err;
    }
    //file exists
  });

  try {
    const fileContent = Buffer.from(fs.readFileSync(filePath), "base64");

    if (fileContent) {
      console.log((fileContent + "").cyan);
      return fileContent;
    }
  } catch {
    const err = new Error(`Data Not Found`);
    return err;
  }
}

module.exports = readContent;
