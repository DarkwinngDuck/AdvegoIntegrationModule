const limiter = require('./FifoRateLimiter');

module.exports = ({ rate = 1, delay = 1, callback }) => limiter(rate, delay, callback);
