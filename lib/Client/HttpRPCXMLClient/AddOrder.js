/* eslint-disable camelcase */
const util = require('util');

const addOrder = (xmlrpc, errorChecker) => async (options) => {
  const {
    themes,
    host,
    port,
    path,
    token,
    ...body
  } = options;
  const xmlClient = xmlrpc.createSecureClient({
    host,
    port,
    path,
  });
  const client = util.promisify(xmlClient.methodCall.bind(xmlClient));
  const addOrderResponse = await client('advego.addOrder', [{ ...body, token }]);
  errorChecker(addOrderResponse);
  const {
    id_order,
  } = addOrderResponse;
  if (body.themes_active) {
    const editOrderThemesResponse = await client('advego.editOrderThemes', [{
      themes,
      id_order,
      token,
    }]);
    errorChecker(editOrderThemesResponse);
  }
  const startOrderResponse = await client('advego.startOrder', [{
    ID: id_order,
    token,
  }]);
  errorChecker(startOrderResponse);
  return {
    id_order,
  };
};

module.exports = addOrder;
