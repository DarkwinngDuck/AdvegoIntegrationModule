module.exports = checkIsArray => ({ error, errors, error_msg: errorMsg }) => {
  const applicationError =
    error ||
    errorMsg ||
    (errors &&
      checkIsArray(errors)
        .map(e => e.error_msg)
        .join('\r\n'));
  return applicationError ? new Error(applicationError) : null;
};
