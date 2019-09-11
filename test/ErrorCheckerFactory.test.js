const ErrorCheckerFactory = require('../lib/Client/HttpRPCXMLClient/ErrorCheckerFactory');

describe('[ErrorCheckerFactory]', () => {
  const handler = jest.fn();

  let errorChecker;

  beforeEach(() => {
    errorChecker = ErrorCheckerFactory(handler);
  });

  it('should be a function', () => {
    expect(typeof errorChecker).toStrictEqual('function');
  });

  it('should call handler with expected arguments', () => {
    errorChecker({});
    expect(handler).toHaveBeenCalledWith({});
  });

  it('should throw', () => {
    handler.mockReturnValueOnce({});
    expect(() => {
      errorChecker({});
    }).toThrow();
  });
});
