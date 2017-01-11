import fs from 'fs';

/**
 * Gets all files from a directory recursively
 * @param dir The dir you want to search for files in
 * @param skipRegex A regex used to skip certain files
 * @param fileList  A list of files which will eventually be returned
 * @returns {Array} A list of files found in the directory
 */
const getFilesRecursively = (dir, skipRegex, fileList = []) => {
  if (dir === null || dir === undefined) {
    throw new Error('dirs is null or undefined');
  }

  if (skipRegex && skipRegex.test(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fileName = dir + file;
    if (fs.statSync(fileName).isDirectory()) {
      const slash = fileName[fileName.length - 1] === '/' ? '' : '/';
      fileList = getFilesRecursively(fileName + slash, skipRegex, fileList);
    } else {
      fileList.push(fileName);
    }
  });

  return fileList;
};

export default getFilesRecursively;