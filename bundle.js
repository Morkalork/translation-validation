'use strict';

var fs$1 = require('fs');

/**
 * Gets all files from a directory recursively
 * @param dir The dir you want to search for files in
 * @param skipRegex A regex used to skip certain files
 * @param fileList  A list of files which will eventually be returned
 * @returns {Array} A list of files found in the directory
 */
var getFilesRecursively = function getFilesRecursively(dir, skipRegex) {
  var fileList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (dir === null || dir === undefined) {
    throw new Error('dirs is null or undefined');
  }

  if (skipRegex && skipRegex.test(dir)) {
    return fileList;
  }

  var files = fs$1.readdirSync(dir);
  files.forEach(function (file) {
    var fileName = dir + file;
    if (fs$1.statSync(fileName).isDirectory()) {
      var slash = fileName[fileName.length - 1] === '/' ? '' : '/';
      fileList = getFilesRecursively(fileName + slash, skipRegex, fileList);
    } else {
      fileList.push(fileName);
    }
  });

  return fileList;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









































var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * Extracts all keys from an object as json properties, i.e. root.branch.branch etc
 * Example:
 * {
 *  "key1": {
 *    "subKey1": "Hello",
 *    "subKey2": "World"
 *  },
 *  "key2": {
 *    "subKey1": {
 *      "nestingGalore": 15
 *    }
 *  }
 * }
 *
 * Will give you:
 * [
 *  "key1.subKey1",
 *  "key1.subKey2",
 *  "key2.subKey1.nestingGalore"
 * }
 *
 * @param json  An object you want to extract json keys from
 * @param nodeName  The parent node name, or empty if root
 * @returns {Array} An array of strings representing the keys of the json object
 */
var getJsonKeys = function getJsonKeys(json) {
  var nodeName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (json === null || json === undefined) {
    throw new Error("JSON is null");
  }

  if (Object.keys(json).length <= 0) {
    throw new Error("JSON is empty");
  }

  var result = [];
  var tmpName = void 0;
  var tempArray = [];
  for (var prop in json) {
    var val = json[prop];
    tmpName = nodeName !== '' ? nodeName + "." + prop : prop;
    if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === 'object') {
      tempArray = getJsonKeys(val, tmpName);
      tempArray.forEach(function (tmpVal) {
        result.push(tmpVal);
      });
    } else {
      result.push(tmpName);
    }
  }

  return result;
};

var fs = require('fs');
var colors = require('colors');

var checkFiles = (function (json, dirs, skipRegex) {
  console.log(json);
  if (json === null || json === undefined) {
    throw new Error("JSON is null");
  }

  if (Object.keys(json).length <= 0) {
    throw new Error("JSON is empty");
  }

  var sourceFiles = getAllFiles(dirs, skipRegex);
  var foundKeys = [];
  console.log(getJsonKeys);
  var keys = getJsonKeys(json);

  console.log(keys);
  if (keys.length <= 0) {
    throw new Error('No keys were found in the translation file');
  }

  console.log('Processing...');
  sourceFiles.forEach(function (sourceFile) {
    var output = 'Reading file \'' + sourceFile + '\'';
    var status = ' successfully checked '.green.black.bold;
    try {
      (function () {
        var data = fs.readFileSync(sourceFile, 'utf8');
        keys.forEach(function (key) {
          var regex = new RegExp(key, 'gi');
          if (regex.test(data)) {
            foundKeys.push(key);
          }
        });
      })();
    } catch (err) {
      status = ' ERROR '.red.bold;
    }

    console.log(output + ': ' + status);
  });
  console.log('Processing complete!');

  var notFoundKeys = keys.filter(function (key) {
    return foundKeys.indexOf(key) === -1;
  });

  console.log('');
  console.log('');
  console.log('RESULT:');
  console.log('-----------------');
  foundKeys.forEach(function (key) {
    console.log(' ' + '✓'.green.bold + ' \'' + key + '\'');
  });
  notFoundKeys.forEach(function (key) {
    console.log(' ' + 'x'.red.bold + ' \'' + key + '\'');
  });
});

var getAllFiles = function getAllFiles(dirs, skipRegex) {
  var files = [];
  dirs.forEach(function (dir) {
    var filesFound = getFilesRecursively(dir, skipRegex);
    files.push.apply(files, toConsumableArray(filesFound));
  });

  return files;
};

module.exports = {
  init: function init(_ref) {
    var _ref2 = slicedToArray(_ref, 5),
        file = _ref2[2],
        dirArgs = _ref2[3],
        filesToSkip = _ref2[4];

    console.log('Init!');
    if (!file) {
      console.log("Error:".bgRed.bold);
      console.log("You did not pass in a translation file to check");
      return;
    }

    if (!dirArgs) {
      console.log("Error".bgRed.bold);
      console.log("You did not pass in a source directory to check for occurences in!");
      return;
    }

    // Get the data correct
    var json = require('./' + file);
    var dirs = dirArgs.split(',');
    var skipRegex = filesToSkip ? new RegExp(filesToSkip, 'gi') : null;

    // LAUNCH!
    try {
      checkFiles(json, dirs, skipRegex);
    } catch (err) {
      console.log('ERROR: ', err);
    }
  }
};
