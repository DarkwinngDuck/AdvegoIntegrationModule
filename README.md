# AdvegoIntegrationModule
Advego public API integration module

## Usage
* create module instance
* ``` const aim = require('@seo-booster/advego-integration-module') ```
* available methods
* ``` init - pass in list of named configurations ```
* ``` updateConfiguration - update named configuration ```
* ``` listConfigurations - list named configurations names ```
* ``` callMethod - call method in named configuration context ```
* ``` it is possible to call method with dot notation e.x. aim.getAllJobs() ```
## Configuration object parameters
    token - API token,
    host - API host,
    port - API port,
    path - API suffix path,
    rpcOptions - RPC methods options,