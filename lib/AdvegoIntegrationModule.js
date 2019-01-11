class AdvegoIntegrationModule {
  constructor(manager) {
    this.manager = manager;
  }

  init(configurations) {
    configurations.forEach((configuration) => {
      this.manager.setNamedConfiguration(configuration);
    });
  }

  updateConfiguration(configuration) {
    this.manager.setNamedConfiguration(configuration);
  }

  listConfigurations() {
    return this.manager.listNamedConfigurations();
  }

  callMethod({ configurationName, method, options = {} }) {
    return new Promise((resolve, reject) => {
      const namedConfiguration = this.manager.getNamedConfiguration(configurationName);
      const {
        queues, host, port, path, token,
      } = namedConfiguration;
      queues[method]({
        host,
        port,
        path,
        token,
        ...options,
      }, (error, response) => {
        if (error) reject(error);
        if (response.error) reject(response.error);
        if (response.has_errors) reject(response);
        resolve(response);
      });
    });
  }

  reset() {
    this.manager.resetConfigurations();
  }
}

module.exports = AdvegoIntegrationModule;
