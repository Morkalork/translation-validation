const test = require('tape');
const getJsonKeys = require('./getJsonKeys');

test('getJsonKeys should throw if json is not passed as a parameter', (assert) => {
  const expectedErrorMessage = /JSON is null/;
  assert.throws(() => getJsonKeys(), expectedErrorMessage, 'json is undefined');
  assert.throws(() => getJsonKeys(null), expectedErrorMessage, 'json is null');
  assert.end();
});

test('getJsonKeys should throw if json contains no properties', (assert) => {
  const expectedErrorMessage = /JSON is empty/;
  assert.throws(() => getJsonKeys({}), expectedErrorMessage, 'json has no properties');
  assert.end();
});

test('getJsonKeys should be able to parse a basic json structure', (assert) => {
  const json = {
    foo: {
      bar: {
        biz: 1
      }
    },
    banana: "is a fruit"
  };

  const result = getJsonKeys(json);
  assert.equals(result.length, 2, '2 entries are found');
  assert.equals(result[0], 'foo.bar.biz');
  assert.equals(result[1], 'banana');
  assert.end();
});