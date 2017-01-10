import checkFiles from './src/checkFiles';

module.exports = {
  init: ([, , file, dirArgs, filesToSkip]) => {
    console.log('Init!');
    if(!file) {
      console.log("Error:".bgRed.bold);
      console.log("You did not pass in a translation file to check");
      return;
    }

    if(!dirArgs) {
      console.log("Error".bgRed.bold);
      console.log("You did not pass in a source directory to check for occurences in!");
      return;
    }

    // Get the data correct
    const json = require(`./${file}`);
    const dirs = dirArgs.split(',');
    const skipRegex = filesToSkip ? new RegExp(filesToSkip, 'gi') : null;

    // LAUNCH!
    try {
    checkFiles(json, dirs, skipRegex);
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
}