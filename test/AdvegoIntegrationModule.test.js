const AdvegoIntegrationModule = require('../lib/Api/AdvegoIntegrationModule');
const SimpleConfigurationsManager = require('../lib/ConfigurationsManager/SimpleConfigurationsManager');

let clientReturnValue;

const MokedConfigurationFactory = ({ host }) => ({
  host,
  queues: {
    getJobsAll: (options, callback) => {
      if (clientReturnValue) {
        callback(null, clientReturnValue);
      } else {
        callback(true);
      }
    },
  },
});

const errorsHandler = jest.fn().mockImplementation(() => null);

const manager = new SimpleConfigurationsManager(MokedConfigurationFactory);

describe('[AdvegoIntegrationModule]', () => {
  let aim;

  beforeEach(() => {
    aim = new AdvegoIntegrationModule(manager, errorsHandler);
    aim.reset();
    clientReturnValue = undefined;
  });

  test('Should create instance', () => {
    expect(aim).toBeDefined();
  });

  test('Should call manager.listNamedConfigurations on listConfigurations', () => {
    const spy = jest.spyOn(manager, 'listNamedConfigurations');
    aim.listConfigurations();
    expect(spy).toHaveBeenCalled();
  });

  test('Should call manager.setDefaultConfigurationName on setDefaultConfigurationName', () => {
    const spy = jest.spyOn(manager, 'setDefaultConfigurationName');
    aim.setDefaultConfigurationName('test');
    expect(spy).toHaveBeenCalledWith('test');
  });

  test('Should call manager.setNamedConfiguration for every configuration on setConfigurations', () => {
    const spy = jest.spyOn(manager, 'setNamedConfiguration');
    aim.setConfigurations([
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
    clientReturnValue = 1;
    const spy = jest.spyOn(manager, 'getNamedConfiguration');
    aim.updateConfiguration(config);
    aim.callMethod('getJobsAll', 'super')
      .then(() => {
        expect(spy).toHaveBeenCalledWith('super');
      });
  });

  test('Should resolve Promise with response if all OK on callMethod', (done) => {
    const config = {
      name: 'super',
      host: 'localhost',
      port: 4000,
      path: '/xml',
    };
    aim.updateConfiguration(config);
    clientReturnValue = { jobs: [] };
    aim.callMethod('getJobsAll', 'super')
      .then((response) => {
        expect(response).toEqual(clientReturnValue);
        done();
      });
  });

  test('Should reject Promise with error if response has error property on callMethod', (done) => {
    const config = {
      name: 'super',
      host: 'localhost',
      port: 4000,
      path: '/xml',
    };
    aim.updateConfiguration(config);
    clientReturnValue = { error: 1 };
    errorsHandler.mockImplementation(() => new Error('test'));
    aim.callMethod('getJobsAll', 'super')
      .catch((response) => {
        expect(response instanceof Error).toEqual(true);
        done();
      });
  });

  test('Should reject Promise with response if response has errors property on callMethod', (done) => {
    const config = {
      name: 'super',
      host: 'localhost',
      port: 4000,
      path: '/xml',
    };
    aim.updateConfiguration(config);
    clientReturnValue = { errors: [{ error_msg: 'test' }] };
    aim.callMethod('getJobsAll', 'super')
      .catch((response) => {
        expect(response instanceof Error).toEqual(true);
        done();
      });
  });
});
