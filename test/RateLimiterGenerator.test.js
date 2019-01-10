const limiter = require('../lib/RateLimiter/RateLimiterGenerator');

describe('RateLimiterGenerator', () => {
  it('should return wrapped function passed in', () => {
    const test = limiter({
      rate: 1,
      delay: 3,
      callback: () => 1,
    });
    expect(test).toBeDefined();
  });

  it('should call wrapped function no more then rate per period', (done) => {
    const fn = {
      cb: () => 1,
    };
    const spy = jest.spyOn(fn, 'cb');
    const test = limiter({
      rate: 1,
      delay: 3000,
      callback: fn.cb,
    });
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 2999);
    test();
    test();
  });

  it('should call wrapped function expected times per period', (done) => {
    const fn = {
      cb: () => 1,
    };
    const spy = jest.spyOn(fn, 'cb');
    const test = limiter({
      rate: 1,
      delay: 1000,
      callback: fn.cb,
    });
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(4);
      done();
    }, 4005);
    let runs = 4;
    while (runs > 0) {
      test();
      runs -= 1;
    }
  });
});
