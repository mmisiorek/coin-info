const EthereumBlockMiningTimeCalculatorProvider = require('./class/EthereumBlockMiningTimeCalculatorProvider.js');
const web3Provider = require('./web3ProviderFromEnvironmentVariables.js');

module.exports = new EthereumBlockMiningTimeCalculatorProvider(web3Provider);
