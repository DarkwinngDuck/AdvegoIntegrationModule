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

const target = {};
const handler = {
  get(target, name) {
    return {
      run(options, callback) {
        return callMethod(`advego.${name}`, options, callback);
      },
    };
  },
};

const clientAPI = new Proxy(target, handler);

module.exports = clientAPI;
