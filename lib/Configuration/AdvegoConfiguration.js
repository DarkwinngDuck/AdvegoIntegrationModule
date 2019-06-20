const getLimiter = require('../RateLimiter');
const client = require('../Client');

const defaultRPCOptions = {
  addOrder: {
    throttling: 60500,
  },
  returnJob: {
    throttling: 60500,
  },
  getJobsAll: {
    throttling: 30500,
  },
};

const configureCallback = (clientInstance, clientMethodName, { throttling }) => getLimiter({
  rate: 1,
  delay: throttling,
  callback: clientInstance[clientMethodName].run,
});

class Configuration {
  constructor({
    token,
    host,
    port,
    path,
    rpcOptions = {},
  }, clientInstance = client) {
    this.token = token;
    this.host = host;
    this.port = port;
    this.path = path;
    this.queues = Object
      .entries({ ...defaultRPCOptions, ...rpcOptions })
      .reduce((acc, entry) => {
        const [method, value] = entry;
        acc[method] = configureCallback(clientInstance, method, value);
        return acc;
      }, {});
  }
}

module.exports = Configuration;
