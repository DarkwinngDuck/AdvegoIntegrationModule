const { checkIsArray } = require('../lib/Errors');

describe('[check-array]', () => {
  it('should be a function', () => {
    expect(typeof checkIsArray).toStrictEqual('function');
  });

  it('should return passed in array', () => {
    expect(checkIsArray(['test'])).toStrictEqual(['test']);
  });

  it('should return new array with passed in argument if argument isnt array', () => {
    expect(checkIsArray('test')).toStrictEqual(['test']);
  });
});
