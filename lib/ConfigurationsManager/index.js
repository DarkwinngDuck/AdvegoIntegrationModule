const namedConfigurations = {};

const setNamedConfiguration = ({ name = 'default', options }) => {
  namedConfigurations[name] = options;
};

const getNamedConfigurations = () => namedConfigurations;

module.exports = {
  setNamedConfiguration,
  getNamedConfigurations,
};
