import checkFiles from './src/checkFiles';
import colors from 'colors';
import error from './src/error';

module.exports = {
  init: ([, , file, dirArgs, filesToSkip]) => {
    console.log('');
    console.log('Transval running'.zebra.bold);
    console.log('-------------------------------'.zebra.bold);
    console.log('');

    if(!file) {
      error("You did not pass in a translation file to check");
      return;
    }

    if(!dirArgs) {
      error("You did not pass in a source directory to check for occurrences in!");
      return;
    }

    // Get the data correct
    let json = null;

    try {
      json = require(`./${file}`);
    } catch (e) {
      error(`Failed to load file '${file}' `, e);
      return;
    }

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