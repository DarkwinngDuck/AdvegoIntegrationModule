const QueuedClientFactory = require('../lib/Configuration/QueuedClientFactory');

const limitedFn = jest.fn();
const limiter = jest.fn().mockReturnValue(limitedFn);
const client = {
  foo: {
    run: () => {},
  },
  bar: {
    run: () => {},
  },
};

describe('QueuedClientFactory', () => {
  let factory;

  beforeEach(() => {
    factory = QueuedClientFactory(limiter);
  });

  it('should be a function rateLimitedFunction', () => {
    expect(typeof QueuedClientFactory).toEqual('function');
  });

  it('should be a function rateLimitedFunction', () => {
    expect(typeof factory).toEqual('function');
  });

  it('should call limiter to wrap methods passed in rpcOptions', () => {
    factory(client, {
      foo: {
        throttling: 1,
      },
    });
    expect(limiter).toHaveBeenCalledWith({ callback: client.foo.run, delay: 1, rate: 1 });
  });

  it('should return limited function if it present', () => {
    const proxy = factory(client, {
      foo: {
        throttling: 1,
      },
    });
    proxy.foo();
    expect(limitedFn).toHaveBeenCalled();
  });

  it('should return client method if limited function is not present', () => {
    const spy = jest.spyOn(client.bar, 'run');
    const proxy = factory(client, {
      foo: {
        throttling: 1,
      },
    });
    proxy.bar();
    expect(spy).toHaveBeenCalled();
  });
});
