class SimpleConfigurationsManager {
  constructor(ConfigurationConstructor) {
    this.constructor = ConfigurationConstructor;
    this.namedConfigurations = {};
  }

  setNamedConfiguration(configuration) {
    const { name = 'default', ...options } = configuration;
    this.namedConfigurations[name] = new this.constructor(options);
  }

  getNamedConfiguration(configurationName) {
    if (Object.prototype.hasOwnProperty.call(this.namedConfigurations, configurationName)) {
      return this.namedConfigurations[configurationName];
    }
    throw new Error('NamedConfigurationNotFound');
  }

  listNamedConfigurations() {
    return Object.keys(this.namedConfigurations);
  }

  resetConfigurations() {
    this.namedConfigurations = {};
  }
}

module.exports = SimpleConfigurationsManager;
