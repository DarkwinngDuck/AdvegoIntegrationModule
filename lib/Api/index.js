const manager = require('../ConfigurationsManager');
const AdvegoIntegrationModule = require('./AdvegoIntegrationModule');
const apiQueryHandler = require('./ApiQueryHandler');
const { errorsHandler } = require('../Errors');

const aim = new AdvegoIntegrationModule(manager, errorsHandler);
const api = new Proxy(aim, apiQueryHandler);

module.exports = api;
