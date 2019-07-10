const errorHandler = require('../lib/Errors/ErrorHandler');

describe('[ErrorHandler]', () => {
  it('should be a function', () => {
    expect(typeof errorHandler).toStrictEqual('function');
  });

  it('should return error if response has error property', () => {
    const response = errorHandler({ error: 'test' });
    expect(response instanceof Error).toStrictEqual(true);
    expect(response.message).toStrictEqual('test');
  });

  it('should return error if response has error_msg property', () => {
    const response = errorHandler({ error_msg: 'test' });
    expect(response instanceof Error).toStrictEqual(true);
    expect(response.message).toStrictEqual('test');
  });

  it('should return error if response has errors property', () => {
    const response = errorHandler({ errors: [{ error_msg: 'test' }] });
    expect(response instanceof Error).toStrictEqual(true);
    expect(response.message).toStrictEqual('test');
  });
});
