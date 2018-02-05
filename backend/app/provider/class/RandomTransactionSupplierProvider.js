const RandomTransactionSupplier = require('../../supplier/RandomTransactionSupplier.js');

class RandomTransactionSupplierProvider {
    constructor(web3Provider) {
        this.web3Provider = web3Provider;
    }

    get() {
        if (this.instance === undefined) {
            this.instance = new RandomTransactionSupplier(this.web3Provider.get());
        }

        return this.instance;
    }
}

module.exports = RandomTransactionSupplierProvider;
