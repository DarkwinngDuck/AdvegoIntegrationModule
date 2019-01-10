const xmlrpc = require('xmlrpc');

const callMethod = (methodName, options) => {
  const {
    host,
    port,
    path,
    token,
  } = options;
  const client = xmlrpc.createSecureClient({
    host, port, path, token,
  });
  return new Promise((resolve, reject) => {
    client.methodCall(methodName, [options], (error, value) => {
      if (error) reject(error);
      if (value.error) reject(value.error);
      if (value.has_errors) reject(value);
      resolve(value);
    });
  });
};

const getJobsAll = options => callMethod('advego.getJobsAll', options);

const jobsGetState = options => callMethod('advego.jobsGetState', options);

module.exports = {
  getJobsAll,
  jobsGetState,
};
