class SimpleConfigurationsManager {
  constructor(ConfigurationFactory) {
    this.factory = ConfigurationFactory;
    this.namedConfigurations = {};
  }

  setNamedConfiguration({ name = 'default', ...options }) {
    this.namedConfigurations[name] = this.factory(options);
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
