module.exports = {
  get: (target, name) => (
    (name in target)
      ? target[name]
      : target.callMethod.bind(target, name)
  ),
};
