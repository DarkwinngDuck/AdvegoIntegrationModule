
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

const ConfigurationFactory = (client, proxifier) => ({
  token,
  host,
  port,
  path,
  rpcOptions = {},
}) => Object.freeze({
  token,
  host,
  port,
  path,
  queues: proxifier(client, { ...defaultRPCOptions, ...rpcOptions }),
});

module.exports = ConfigurationFactory;
