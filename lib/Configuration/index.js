const defaultRPCOptions = {
  addOrder: {
    throttling: 60000,
  },
  returnJob: {
    throttling: 60000,
  },
  getJobsAll: {
    throttling: 30000,
  },
};

class NamedConfiguration {
  constructor({
    name,
    token,
    url,
    options = {},
  }) {
    this.name = name;
    this.token = token;
    this.url = url;
    this.options = { ...defaultRPCOptions, ...options };
  }
}

module.exports = NamedConfiguration;
