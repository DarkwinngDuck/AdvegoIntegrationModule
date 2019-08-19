

const configureCallback = (limiter, client, method, { throttling }) => limiter({
  rate: 1,
  delay: throttling,
  callback: client[method].run,
});

const CreateProxy = limiter => (client, rpcOptions) => {
  const queues = Object
    .entries(rpcOptions)
    .reduce((acc, entry) => {
      const [method, value] = entry;
      acc[method] = configureCallback(limiter, client, method, value);
      return acc;
    }, {});
  return new Proxy(queues, {
    get(target, name) {
      return Object.prototype.hasOwnProperty.call(target, name)
        ? target[name]
        : client[name].run;
    },
  });
};

module.exports = getLimiter => CreateProxy(getLimiter);
