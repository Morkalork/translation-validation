const test = require('tape');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const setup = (readDirStub = sinon.stub(), statSyncStub = sinon.stub()) => {
  return proxyquire('./getFilesRecursively', {
    'fs': {
      readdirSync: readDirStub,
      statSync: statSyncStub
    }
  });
};

test('getFilesRecursively throws if dirs is null or invalid', (assert) => {
  const getFilesRecursively = setup();
  const expectedErrorMessage = /null or undefined/;
  assert.throws(() => getFilesRecursively(), expectedErrorMessage, 'dirs is undefined');
  assert.throws(() => getFilesRecursively(null), expectedErrorMessage, 'dirs is null');
  assert.end();
});

test('getFilesRecursively returns empty file list if skipRegex invalidates dir', (assert) => {
  const getFilesRecursively = setup();
  const dirs = 'foo';
  const skipRegex = /foo/;
  result = getFilesRecursively(dirs, skipRegex);
  assert.equal(result.length, 0, 'No files found');
  assert.end();
});

test('getFilesRecursively can find two files in different levels of nesting', (assert) => {
  // Stubs
  const validDir1 = 'dir1/';
  const validDir2 = 'dir2/';
  const validFile1 = 'file1';
  const validFile2 = 'file2';
  const file1FullPath = validDir1 + validFile1;
  const file2FullPath = validDir1 + validDir2 + validFile2;
  const dir1Files = [validDir2, validFile1];
  const dir2Files = [validFile2];
  const readDirStub = sinon.stub();
  const statSyncStub = sinon.stub();
  readDirStub.withArgs(validDir1).returns(dir1Files);
  readDirStub.withArgs(validDir1 + validDir2).returns(dir2Files);
  statSyncStub.withArgs(file1FullPath).returns({isDirectory: () => false});
  statSyncStub.withArgs(file2FullPath).returns({isDirectory: () => false});
  statSyncStub.withArgs(validDir1 + validDir2).returns({isDirectory: () => true});
  statSyncStub.withArgs(validDir2).returns({isDirectory: () => true});

  const getFilesRecursively = setup(readDirStub, statSyncStub);
  result = getFilesRecursively(validDir1);
  assert.equal(result.length, 2, '2 files were found');
  assert.equal(result[0], file2FullPath, 'file2 was found');
  assert.equal(result[1], file1FullPath, 'file1 was found');
  assert.end();
});