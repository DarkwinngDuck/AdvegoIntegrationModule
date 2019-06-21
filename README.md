
# AdvegoIntegrationModule

Advego public API integration module

## Usage

* create module instance

*  ``` const aim = require('@seo-booster/advego-integration-module') ```

* available methods

*  ``` init - pass in list of named configurations ```

*  ``` updateConfiguration - update named configuration ```

*  ``` listConfigurations - list named configurations names ```

*  ``` callMethod - call method in named configuration context ```

*  ``` since v.1.1.0 it is possible to call method with dot notation e.x. aim.getAllJobs() ```

## v1.1.0 breaking changes
Changed callMethod contract

```aim.callMethod(method, configurationName, [options])```

or

```aim[method](configurationName, [options])```

## Configuration object parameters

token - API token,

host - API host,

port - API port,

path - API suffix path,

rpcOptions - RPC methods options,