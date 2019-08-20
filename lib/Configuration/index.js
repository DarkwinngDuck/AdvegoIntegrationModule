const client = require('../Client');
const getLimiter = require('../RateLimiter');
const QueuedClientFactory = require('./QueuedClientFactory');
const AdvegoConfiguration = require('./AdvegoConfiguration');


module.exports = AdvegoConfiguration(client, QueuedClientFactory(getLimiter));
