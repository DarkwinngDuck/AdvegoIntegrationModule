const AdvegoIntegrationModule = require('../lib/AdvegoIntegrationModule');
const SimpleConfigurationsManager = require('../lib/ConfigurationsManager/SimpleConfigurationsManager');

class MokedConfigurationConstructor {
  constructor({ host }) {
    this.host = host;
    this.queues = {
      getJobsAll: () => 'test',
    };
  }
}
const manager = new SimpleConfigurationsManager(MokedConfigurationConstructor);

describe('[AdvegoIntegrationModule]', () => {
  let aim;

  beforeEach(() => {
    aim = new AdvegoIntegrationModule(manager);
    aim.reset();
  });

  test('Should create instance', () => {
    expect(aim).toBeDefined();
  });

  test('Should call manager.listNamedConfigurations on listConfigurations', () => {
    const spy = jest.spyOn(manager, 'listNamedConfigurations');
    aim.listConfigurations();
    expect(spy).toHaveBeenCalled();
  });

  test('Should call manager.setNamedConfiguration for every configuration on init', () => {
    const spy = jest.spyOn(manager, 'setNamedConfiguration');
    aim.init([
      {
        name: 'ru',
        host: 'localhost',
      },
      {
        name: 'super',
        host: 'localhost',
      },
    ]);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('Should call manager.setNamedConfiguration with passed in configuration on updateConfiguration', () => {
    const config = {
      name: 'super',
      host: 'localhost',
      port: 4000,
      path: '/xml',
    };
    const spy = jest.spyOn(manager, 'setNamedConfiguration');
    aim.updateConfiguration(config);
    expect(spy).toHaveBeenCalledWith(config);
  });

  test('Should call manager.getNamedConfiguration with passed in configuration name on callMethod', () => {
    const config = {
      name: 'super',
      host: 'localhost',
      port: 4000,
      path: '/xml',
    };
    const spy = jest.spyOn(manager, 'getNamedConfiguration');
    aim.updateConfiguration(config);
    aim.callMethod({
      configurationName: 'super',
      method: 'getJobsAll',
    });
    expect(spy).toHaveBeenCalledWith('super');
  });
});
