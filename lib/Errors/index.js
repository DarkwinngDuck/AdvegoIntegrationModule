const checkIsArray = require('./check-array');
const ErrorHandler = require('./ErrorHandler');

module.exports = {
  checkIsArray,
  errorsHandler: ErrorHandler(checkIsArray),
};
