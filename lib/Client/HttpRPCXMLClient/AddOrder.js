/* eslint-disable camelcase */
const util = require('util');

const ErrorCheckerFactory = handler => (response) => {
  const error = handler(response);
  if (error) {
    throw error;
  }
};

const addOrder = (xmlrpc, errorHandler) => {
  const checkForErrors = ErrorCheckerFactory(errorHandler);
  return async (options) => {
    const {
      themes, host, port, path, token, ...body
    } = options;
    const xmlClient = xmlrpc.createSecureClient({
      host, port, path, token,
    });
    const client = util.promisify(xmlClient.methodCall);
    const addOrderResponse = await client('advego.addOrder', [body]);
    checkForErrors(addOrderResponse);
    const { id_order } = addOrderResponse;
    if (body.themes_active) {
      const editOrderThemesResponse = await client('advego.editOrderThemes', [{ themes, id_order }]);
      checkForErrors(editOrderThemesResponse);
    }
    const startOrderResponse = await client('advego.startOrder', [{ ID: id_order }]);
    checkForErrors(startOrderResponse);
    return id_order;
  };
};

module.exports = addOrder;
