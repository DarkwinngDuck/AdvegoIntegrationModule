const manager = require('../ConfigurationsManager');
const AdvegoIntegrationModule = require('./AdvegoIntegrationModule');
const apiQueryHandler = require('./ApiQueryHandler');

const aim = new AdvegoIntegrationModule(manager);
const api = new Proxy(aim, apiQueryHandler);

module.exports = api;
