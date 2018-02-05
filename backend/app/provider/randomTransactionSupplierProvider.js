const web3Provider = require('./web3ProviderFromEnvironmentVariables.js');
const RandomTransactionSupplierProvider = require('./class/RandomTransactionSupplierProvider.js');

module.exports = new RandomTransactionSupplierProvider(web3Provider);
