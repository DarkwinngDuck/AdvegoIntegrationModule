function hasApplicationError({ error, errors, error_msg: errorMsg }) {
  const applicationError = error
            || errorMsg
            || (errors && errors.map(e => e.error_msg).join('\r\n'));
  return applicationError ? new Error(applicationError) : null;
}

module.exports = hasApplicationError;
