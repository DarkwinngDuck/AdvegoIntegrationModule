module.exports = function ErrorCheckerFactory(handler) {
  return response => {
    const error = handler(response);
    if (error) {
      throw error;
    }
  };
};
