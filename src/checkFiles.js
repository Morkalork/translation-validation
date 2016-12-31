const fs = require('fs');
const getFilesRecursively = require('./getFilesRecursively');
const getJsonKeys = require('./getJsonKeys');
const colors = require('colors');

const checkFiles = (json, dirs, skipRegex) => {
  if (json === null || json === undefined) {
    throw new Error("JSON is null");
  }

  if (Object.keys(json).length <= 0) {
    throw new Error("JSON is empty");
  }

  const sourceFiles = getAllFiles(dirs, skipRegex);
  const foundKeys = [];
  const keys = getJsonKeys(json);

  if (keys.length <= 0) {
    throw new Error('No keys were found in the translation file');
  }

  console.log('Processing...');
  sourceFiles.forEach((sourceFile) => {
    let output = `Reading file '${sourceFile}'`;
    let status = ' successfully checked '.green.black.bold;
    try {
      const data = fs.readFileSync(sourceFile, 'utf8');
      keys.forEach((key) => {
        const regex = new RegExp(key, 'gi');
        if (regex.test(data)) {
          foundKeys.push(key);
        }
      });
    } catch (err) {
      status = ' ERROR '.red.bold;
    }

    console.log(`${output}: ${status}`);
  });
  console.log('Processing complete!');

  const notFoundKeys = keys.filter((key) => foundKeys.indexOf(key) === -1);

  console.log('');
  console.log('');
  console.log('RESULT:');
  console.log('-----------------');
  foundKeys.forEach((key) => {
    console.log(` ${'✓'.green.bold} '${key}'`);
  });
  notFoundKeys.forEach((key) => {
    console.log(` ${'x'.red.bold} '${key}'`);
  });
};

const getAllFiles = (dirs, skipRegex) => {
  const files = [];
  dirs.forEach((dir) => {
    const filesFound = getFilesRecursively(dir, skipRegex);
    files.push(...filesFound);
  });

  return files;
};

module.exports = checkFiles;