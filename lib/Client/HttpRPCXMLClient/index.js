const xmlrpc = require('xmlrpc');
const errorHandler = require('../../Errors');
const Client = require('./Client');
const AddOrder = require('./AddOrder');

module.exports = Client(xmlrpc, AddOrder(xmlrpc, errorHandler));
