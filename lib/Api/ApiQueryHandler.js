module.exports = {
  get: (target, name) => (
    Object.prototype.hasOwnProperty.call(target, name)
      ? target[name]
      : target.callMethod.bind(target, name)
  ),
};
