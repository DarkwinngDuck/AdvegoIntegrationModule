class AdvegoIntegrationModule {
  constructor(manager, errorsHandler) {
    this.manager = manager;
    this.errorsHandler = errorsHandler;
  }

  setConfigurations(configurations) {
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

  callMethod(method, configurationName, options = {}) {
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
        const appError = this.errorsHandler(response);
        if (appError) reject(appError);
        resolve(response);
      });
    });
  }

  reset() {
    this.manager.resetConfigurations();
  }
}

module.exports = AdvegoIntegrationModule;
