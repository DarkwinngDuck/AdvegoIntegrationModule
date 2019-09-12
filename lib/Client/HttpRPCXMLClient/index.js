const xmlrpc = require('xmlrpc');
const errorHandler = require('../../Errors');
const ErrorCheckerFactory = require('./ErrorCheckerFactory');
const Client = require('./Client');
const AddOrder = require('./AddOrder');
const GetJobsByOrderId = require('./GetJobsByOrderId');

module.exports = Client(
  xmlrpc,
  AddOrder(xmlrpc, ErrorCheckerFactory(errorHandler)),
  GetJobsByOrderId(xmlrpc, ErrorCheckerFactory(errorHandler)),
);
