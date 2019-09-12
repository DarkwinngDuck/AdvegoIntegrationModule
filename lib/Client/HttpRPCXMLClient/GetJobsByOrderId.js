/* eslint-disable camelcase */
const util = require('util');

const getJobsByOrderId = (xmlrpc, errorChecker) => async (options) => {
  const {
    host, port, path, token, ...body
  } = options;
  const xmlClient = xmlrpc.createSecureClient({
    host,
    port,
    path,
    token,
  });
  const client = util.promisify(xmlClient.methodCall);
  const response = await client('advego.getJobsAll', [body]);
  errorChecker(response);
  return response;
};

module.exports = getJobsByOrderId;
