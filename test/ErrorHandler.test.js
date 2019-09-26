const { errorsHandler } = require('../lib/Errors');

describe('[errorsHandler]', () => {
  it('should be a function', () => {
    expect(typeof errorsHandler).toStrictEqual('function');
  });

  it('should return error if response has error property', () => {
    const response = errorsHandler({ error: 'test' });
    expect(response instanceof Error).toStrictEqual(true);
    expect(response.message).toStrictEqual('test');
  });

  it('should return error if response has error_msg property', () => {
    const response = errorsHandler({ error_msg: 'test' });
    expect(response instanceof Error).toStrictEqual(true);
    expect(response.message).toStrictEqual('test');
  });

  it('should return error if response has errors property', () => {
    const response = errorsHandler({ errors: [{ error_msg: 'test' }] });
    expect(response instanceof Error).toStrictEqual(true);
    expect(response.message).toStrictEqual('test');
  });
});
