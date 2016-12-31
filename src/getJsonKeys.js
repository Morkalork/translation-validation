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
const getJsonKeys = (json, nodeName = '') => {
  if (json === null || json === undefined) {
    throw new Error("JSON is null");
  }

  if (Object.keys(json).length <= 0) {
    throw new Error("JSON is empty");
  }

  const result = [];
  let tmpName;
  let tempArray = [];
  for (const prop in json) {
    const val = json[prop];
    tmpName = (nodeName !== '') ? `${nodeName}.${prop}` : prop;
    if (typeof val === 'object') {
      tempArray = getJsonKeys(val, tmpName);
      tempArray.forEach((tmpVal) => {
        result.push(tmpVal);
      });
    } else {
      result.push(tmpName);
    }
  }

  return result;
};

module.exports = getJsonKeys;