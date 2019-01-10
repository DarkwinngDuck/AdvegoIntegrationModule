const limiter = require('function-rate-limit');

module.exports = ({ rate = 1, delay = 1, callback }) => limiter(rate, delay, callback);
