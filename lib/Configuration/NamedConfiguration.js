const getLimiter = require('../RateLimiter');
const client = require('../Client');

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

const configureCallback = ({ throttling }) => getLimiter({
  rate: 1,
  delay: throttling,
  callback: client,
});

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
    this.queues = Object
      .entries({ ...defaultRPCOptions, ...rpcOptions })
      .reduce((acc, entry) => {
        const [method, value] = entry;
        acc[method] = configureCallback(value);
        return acc;
      }, {});
  }
}

module.exports = NamedConfiguration;
