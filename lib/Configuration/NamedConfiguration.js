const getLimiter = require('../RateLimiter');

const defaultRPCOptions = {
  addOrder: {
    throttling: 60000,
  },
  returnJob: {
    throttling: 60000,
  },
  getJobsAll: {
    throttling: 30000,
  },
};

const configureCallback = () => {
  /**
   * getratelimiter
   * get client
   * combine
   */
}

class NamedConfiguration {
  constructor({
    name,
    token,
    url,
    rpcOptions = {},
  }) {
    this.name = name;
    this.token = token;
    this.url = url;
    this.rpcOptions = { ...defaultRPCOptions, ...rpcOptions };
  }
}

module.exports = NamedConfiguration;
