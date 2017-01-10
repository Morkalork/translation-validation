const fs = require('fs');
const colors = require('colors');

import getFilesRecursively from './getFilesRecursively';
import getJsonKeys from './getJsonKeys';

export default (json, dirs, skipRegex) => {
  console.log(json);
  if (json === null || json === undefined) {
    throw new Error("JSON is null");
  }

  if (Object.keys(json).length <= 0) {
    throw new Error("JSON is empty");
  }

  const sourceFiles = getAllFiles(dirs, skipRegex);
  const foundKeys = [];
  console.log(getJsonKeys);
  const keys = getJsonKeys(json);

console.log(keys);
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