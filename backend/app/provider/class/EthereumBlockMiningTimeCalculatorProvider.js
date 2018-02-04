const EthereumBlockMiningTimeCalculator = require('../../calculator/EthereumBlockMiningTimeCalculator.js');
const web3Provider = require('./Web3Provider.js');

class EthereumBlockMiningTimeCalculatorProvider {

    constructor(web3Provider) {
        this.web3Provider = web3Provider;
    }

    get() {
        if(this.instance === undefined) {
            this.instance = new EthereumBlockMiningTimeCalculator(this.web3Provider.get());
        }

        return this.instance;
    }

}

module.exports = EthereumBlockMiningTimeCalculatorProvider;