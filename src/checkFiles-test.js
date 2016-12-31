const test = require('tape');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const setup = (readFileSyncStub = sinon.stub(),
               getFilesRecursivelyStub = sinon.stub(),
               getJsonKeyStub = sinon.stub()) => {
  return proxyquire('./checkFiles', {
    'fs': {
      readFileSync: readFileSyncStub
    },
    './getFilesRecursively': getFilesRecursivelyStub,
    './getJsonKeys': getJsonKeyStub
  });
};

test('checkFiles should throw on missing json', (assert) => {
  const checkFiles = setup();
  const expectedErrorMessage = 'null or undefined';
  assert.throws(() => checkFiles(), expectedErrorMessage, 'json is undefined');
  assert.throws(() => checkFiles(null), expectedErrorMessage, 'json is null');
  assert.end();
});

test('checkFiles should throw if json contains no properties', (assert) => {
  const checkFiles = setup();
  const expectedErrorMessage = /JSON is empty/;
  assert.throws(() => checkFiles({}), expectedErrorMessage, 'json has no properties');
  assert.end();
});

test('checkFiles should throw if no keys are found', (assert) => {
  const getJsonKeysStub = sinon.stub();
  getJsonKeysStub.withArgs(sinon.match.any).returns([]);
  const checkFiles = setup(sinon.stub(), sinon.stub(), getJsonKeysStub);
  const expectedErrorMessage = /keys/;
  assert.throws(() => checkFiles({foo: 1}, []), expectedErrorMessage, 'No keys found');
  assert.end();
});