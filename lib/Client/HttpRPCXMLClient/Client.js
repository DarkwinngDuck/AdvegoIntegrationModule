const xmlrpcTarget = (xmlrpc, addOrder, getOrderJobsById) => ({
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
  addOrder: (options, callback) => {
    addOrder(options)
      .then(id => callback(null, id))
      .catch(error => callback(error));
  },
  getOrderJobsById: (options, callback) => {
    getOrderJobsById(options)
      .then(data => callback(null, data))
      .catch(error => callback(error));
  },
});
const handler = {
  get(target, name) {
    return {
      run(options, callback) {
        return (name in target)
          ? target[name](options, callback)
          : target.callMethod(`advego.${name}`, options, callback);
      },
    };
  },
};

module.exports = (xmlrpc, addOrder) => new Proxy(xmlrpcTarget(xmlrpc, addOrder), handler);
