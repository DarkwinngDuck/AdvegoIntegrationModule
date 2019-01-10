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
    const namedConfiguration = this.manager.getNamedConfiguration(configurationName);
    const {
      queues, host, port, path, token,
    } = namedConfiguration;
    return queues[method]({
      host,
      port,
      path,
      token,
      ...options,
    });
  }

  reset() {
    this.manager.resetConfigurations();
  }
}

module.exports = AdvegoIntegrationModule;
