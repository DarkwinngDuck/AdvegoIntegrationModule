const manager = require('./ConfigurationsManager');
const IntegrationModule = require('./AdvegoIntegrationModule');

module.exports = new IntegrationModule(manager);
