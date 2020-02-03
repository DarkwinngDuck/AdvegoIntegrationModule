/* eslint-disable camelcase */
const util = require('util');

const getJobsByOrderId = (xmlrpc, errorChecker) => async (options) => {
  const {
    host, port, path, ...body
  } = options;
  const xmlClient = xmlrpc.createSecureClient({
    host,
    port,
    path,
  });
  const client = util.promisify(xmlClient.methodCall.bind(xmlClient));
  const response = await client('advego.getJobsAll', [{ ...body, with_html: true }]);
  errorChecker(response);
  return response.jobs;
};

module.exports = getJobsByOrderId;
