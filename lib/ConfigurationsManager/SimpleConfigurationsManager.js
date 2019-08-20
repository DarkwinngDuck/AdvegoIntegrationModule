class SimpleConfigurationsManager {
  constructor(ConfigurationFactory, defaultConfigurationName = 'default') {
    this.factory = ConfigurationFactory;
    this.configurations = new Map();
    this.defaultConfigurationName = defaultConfigurationName;
  }

  setDefaultConfigurationName(name) {
    this.defaultConfigurationName = name;
  }

  setNamedConfiguration({ name = this.defaultConfigurationName, ...options }) {
    this.configurations.set(name, this.factory(options));
  }

  getNamedConfiguration(name) {
    return this.configurations.has(name)
      ? this.configurations.get(name)
      : this.configurations.get(this.defaultConfigurationName);
  }

  listNamedConfigurations() {
    return Array.from(this.configurations.keys());
  }

  resetConfigurations() {
    this.configurations.clear();
  }
}

module.exports = SimpleConfigurationsManager;
