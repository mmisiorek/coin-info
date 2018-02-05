const RandomTransactionSupplier = require('../../app/supplier/RandomTransactionSupplier.js');
const web3Helpers = require('../helpers/web3Helpers.js');

describe('RandomTransactionSupplier', () => {

    describe('getSupplyWithRandomTransactionsPromise', () => {
        it('should do nothing when blockchain has data', () => {
            const supplier = new RandomTransactionSupplier(web3Helpers.getFakeWeb3([{}]));
            return supplier.getSupplyWithRandomTransactionsPromise(1).then((obj) => {
                expect(obj.transactionsAdded).toBe(false);
            });
        });

        it('should add transactions when blockchain is empty', () => {
            const web3 = web3Helpers.getFakeWeb3([]);

            spyOn(web3.eth, 'sendTransaction').and.callFake(web3Helpers.getFakeWeb3([]).eth.sendTransaction);
            const supplier = new RandomTransactionSupplier(web3);

            return supplier.getSupplyWithRandomTransactionsPromise(1).then(() => {
                expect(web3.eth.sendTransaction).toHaveBeenCalled();
            });
        });

        it('should reject when making transaction fails', () => {
            const web3 = web3Helpers.getFakeWeb3([], true);
            const supplier = new RandomTransactionSupplier(web3);

            return supplier.getSupplyWithRandomTransactionsPromise(1).then(() => {
                return Promise.reject(new Error("The promise should be rejected"));
            }, () => {
                return Promise.resolve();
            });
        });

        it('should reject when getting current block number failed', () => {
            const web3 = web3Helpers.getFakeWeb3([], false, true);
            const supplier = new RandomTransactionSupplier(web3);

            return supplier.getSupplyWithRandomTransactionsPromise(1).then(() => {
                return Promise.reject();
            }, (err) => {
                expect(err.gettingBlockNumberFailed).toBe(true);

                return Promise.resolve();
            });
        });
    });

    describe('getTryToSupplyEmptyBlockchainPromise', () => {
        it('it works when blockchain is available', () => {
            const web3 = web3Helpers.getFakeWeb3([]);
            const supplier = new RandomTransactionSupplier(web3);

            return supplier.getTryToSupplyEmptyBlockchainPromise(1,1);
        });

        it('it reconnects when blockchain is not available on beginning', () => {
            const web3 = web3Helpers.getLongBootingFakeWeb3([], 4);
            const supplier = new RandomTransactionSupplier(web3);

            return supplier.getTryToSupplyEmptyBlockchainPromise(1,1);
        });

        it('should reject when blockchain seems to be unavailable', () => {
            const web3 = web3Helpers.getLongBootingFakeWeb3([], 100);
            const supplier = new RandomTransactionSupplier(web3);

            return supplier.getTryToSupplyEmptyBlockchainPromise(1,1).then(() => {
                return Promise.reject(new Error("The promise should be rejected"));
            }, () => {
                return Promise.resolve();
            });
        });
    });

});
