const GetJobsByOrderId = require('../lib/Client/HttpRPCXMLClient/GetJobsByOrderId');

describe('[GetJobsByOrderId]', () => {
  let getJobsByOrderId;
  const clientResponse = {};
  const client = {
    methodCall: (method, options, cb) => {
      if (clientResponse.success) {
        return cb(null, clientResponse.payload);
      }
      return cb(clientResponse.payload);
    },
  };
  const xmlrpc = {
    createSecureClient: () => ({ methodCall: client.methodCall }),
  };
  const errorChecker = jest.fn();

  beforeEach(() => {
    Object.assign(clientResponse, { success: true, payload: { id: 1 } });
    getJobsByOrderId = GetJobsByOrderId(xmlrpc, errorChecker);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof getJobsByOrderId).toStrictEqual('function');
  });

  it('should call xmlrpc.createSecureClient', async () => {
    const options = {
      host: 1,
      port: 1,
      path: 1,
    };
    const spy = jest.spyOn(xmlrpc, 'createSecureClient');
    await getJobsByOrderId(options);
    expect(spy).toHaveBeenCalledWith(options);
  });

  it('should call client.methodCall with advego.getJobsAll and order options', async () => {
    const options = { id: 1 };
    const spy = jest.spyOn(client, 'methodCall');
    await getJobsByOrderId(options);
    expect(spy.mock.calls[0][0]).toStrictEqual('advego.getJobsAll');
    expect(spy.mock.calls[0][1]).toStrictEqual([{ id: 1, with_html: true }]);
  });

  it('should call errorChecker', async () => {
    const options = { id: 1 };
    await getJobsByOrderId(options);
    expect(errorChecker).toHaveBeenCalledWith({ id: 1 });
  });

  it('should return jobs property of successfull response', async () => {
    Object.assign(clientResponse.payload, { jobs: [] });
    const output = await getJobsByOrderId({});
    expect(output).toStrictEqual([]);
  });
});
