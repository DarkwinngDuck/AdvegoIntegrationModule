const xmlrpc = require('xmlrpc');

const callMethod = (methodName, options, callback) => {
  const {
    host,
    port,
    path,
    token,
  } = options;
  const client = xmlrpc.createSecureClient({
    host, port, path, token,
  });
  client.methodCall(methodName, [options], callback);
};

const getJobsAll = (options, callback) => callMethod('advego.getJobsAll', options, callback);

const jobsGetState = (options, callback) => callMethod('advego.jobsGetState', options, callback);

module.exports = {
  getJobsAll,
  jobsGetState,
};
