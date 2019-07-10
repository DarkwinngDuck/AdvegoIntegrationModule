const AddOrder = require('../lib/Client/HttpRPCXMLClient/AddOrder');

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

const errorHandler = jest.fn().mockImplementation(() => null);

describe.only('[AddOrder]', () => {
  let addOrder;

  beforeEach(() => {
    Object.assign(clientResponse, { success: true, payload: { id_order: 1 } });
    addOrder = AddOrder(xmlrpc, errorHandler);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be a function', () => {
    expect(typeof addOrder).toStrictEqual('function');
  });

  it('should call xmlrpc.createSecureClient', async (done) => {
    const options = {
      host: 1, port: 1, path: 1, token: 1,
    };
    const spy = jest.spyOn(xmlrpc, 'createSecureClient');
    await addOrder(options);
    expect(spy).toHaveBeenCalledWith(options);
    done();
  });

  it('should call client.methodCall with advego.addOrder and order options', async (done) => {
    const options = { title: 1 };
    const spy = jest.spyOn(client, 'methodCall');
    await addOrder(options);
    expect(spy.mock.calls[0][0]).toStrictEqual('advego.addOrder');
    expect(spy.mock.calls[0][1]).toStrictEqual([{ title: 1 }]);
    done();
  });

  it('should call client.methodCall with advego.editOrderThemes and order options', async (done) => {
    const options = { themes: [], themes_active: true };
    const spy = jest.spyOn(client, 'methodCall');
    await addOrder(options);
    expect(spy.mock.calls[1][0]).toStrictEqual('advego.editOrderThemes');
    expect(spy.mock.calls[1][1]).toStrictEqual([{ themes: [], id_order: 1 }]);
    done();
  });

  it('should call client.methodCall with advego.startOrder and ID options', async (done) => {
    const spy = jest.spyOn(client, 'methodCall');
    await addOrder({});
    expect(spy.mock.calls[1][0]).toStrictEqual('advego.startOrder');
    expect(spy.mock.calls[1][1]).toStrictEqual([{ ID: 1 }]);
    done();
  });

  it('should throw error if advego.addOrder failed', (done) => {
    const addOrderError = new Error('addOrderError');
    errorHandler.mockImplementation(() => addOrderError);
    addOrder({}).catch((error) => {
      expect(error).toEqual(addOrderError);
      done();
    });
  });

  it('should throw error if advego.editOrderThemes failed', (done) => {
    const options = { themes_active: true };
    const editOrderThemesError = new Error('editOrderThemesError');
    errorHandler
      .mockImplementationOnce(() => null)
      .mockImplementationOnce(() => editOrderThemesError);
    addOrder(options).catch((error) => {
      expect(error).toEqual(editOrderThemesError);
      done();
    });
  });

  it('should throw error if advego.startOrder failed', (done) => {
    const startOrderError = new Error('startOrderError');
    errorHandler
      .mockImplementationOnce(() => null)
      .mockImplementationOnce(() => startOrderError);
    addOrder({}).catch((error) => {
      expect(error).toEqual(startOrderError);
      done();
    });
  });
});
