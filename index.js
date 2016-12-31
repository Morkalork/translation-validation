const checkFiles = require('./src/checkFiles');

const [, , file, dirArgs, filesToSkip] = process.argv;

// Get the data correct
const json = require(`./${file}`);
const dirs = dirArgs.split(',');
const skipRegex = new RegExp(filesToSkip, 'gi');

// LAUNCH!
checkFiles(json, dirs, skipRegex);