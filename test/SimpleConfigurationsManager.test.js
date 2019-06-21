const SimpleConfigurationsManager = require('../lib/ConfigurationsManager/SimpleConfigurationsManager');

const MokedConfigurationFactory = ({ host }) => ({
  host,
});

describe('[SimpleConfigurationsManager]', () => {
  let scm;

  beforeEach(() => {
    scm = new SimpleConfigurationsManager(MokedConfigurationFactory);
  });

  test('Should create instance', () => {
    expect(scm).toBeDefined();
  });

  test('Should create named configuration with passed in name', () => {
    const config = {
      name: 'test',
    };
    scm.setNamedConfiguration(config);
    const [first] = scm.listNamedConfigurations();
    expect(first).toEqual('test');
  });

  test('Should create named configuration with default name if name was not passed in', () => {
    const config = {};
    scm.setNamedConfiguration(config);
    const [first] = scm.listNamedConfigurations();
    expect(first).toEqual('default');
  });

  test('Should return named configuration by passed in name if one exists', () => {
    const config = {
      name: 'test',
      host: 'qwerty',
    };
    scm.setNamedConfiguration(config);
    const test = scm.getNamedConfiguration('test');
    expect(test.host).toEqual('qwerty');
  });

  test('Should throw NamedConfigurationNotFound if passed in configuration does not exists', () => {
    expect(() => {
      scm.getNamedConfiguration('test');
    }).toThrowError('NamedConfigurationNotFound');
  });
});
