const xmlrpc = require('xmlrpc');

const xmlrpcTarget = {
  callMethod(
    methodName,
    {
      host, port, path, ...rest
    },
    callback,
  ) {
    const client = xmlrpc.createSecureClient({
      host, port, path,
    });
    client.methodCall(methodName, [rest], callback);
  },
};
const handler = {
  get(target, name) {
    return {
      run(options, callback) {
        return target.callMethod(`advego.${name}`, options, callback);
      },
    };
  },
};

const clientAPI = new Proxy(xmlrpcTarget, handler);

module.exports = clientAPI;
