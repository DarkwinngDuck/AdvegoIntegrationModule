const ApiQueryHandler = require('../lib/Api/ApiQueryHandler');

describe('[ApiQueryHandler]', () => {
  test('Should return callMethod from proxied object on get of unknown property and pass property name as first argument', () => {
    const proxied = {
      callMethod() {},
    };
    const spy = jest.spyOn(proxied, 'callMethod');
    const proxy = new Proxy(proxied, ApiQueryHandler);
    proxy.test();
    expect(spy).toHaveBeenCalledWith('test');
  });

  test('Should return original method from proxied object on get of known property', () => {
    const proxy = new Proxy({
      test() { return 'test'; },
    }, ApiQueryHandler);

    const res = proxy.test();
    expect(res).toEqual('test');
  });

  test('Should allow to call callMethod from proxied object directly', () => {
    const proxy = new Proxy({
      callMethod() { return 'test'; },
    }, ApiQueryHandler);

    const res = proxy.test();
    expect(res).toEqual('test');
  });
});
