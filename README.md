
# AdvegoIntegrationModule

Advego public API integration module

## Usage

* create module instance

*  ``` const aim = require('@seo-booster/advego-integration-module') ```

* available methods

*  ``` setConfigurations - pass in list of named configurations ```

*  ``` setDefaultConfigurationName - set fallback name if requested configuration not found ```

*  ``` updateConfiguration - update named configuration ```

*  ``` listConfigurations - list named configurations names ```

*  ``` callMethod - call method in named configuration context ```

*  ``` since v.1.1.0 it is possible to call method with dot notation e.x. aim.getAllJobs() ```

## v1.1.0 breaking changes
Changed callMethod contract

```aim.callMethod(method, configurationName, [options])```

or

```aim[method](configurationName, [options])```

## v1.1.4 breaking changes
init renamed to setConfigurations (breaking change)

added setDefaultConfigurationName

if requested configuration not found it will be substituted with default configuration

fixed error that prevent to call client method directly if there was no throttling settings defined

## Configuration object parameters

token - API token,

host - API host,

port - API port,

path - API suffix path,

rpcOptions - RPC methods options,