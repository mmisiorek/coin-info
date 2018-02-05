// private methods
const getTransferPromise = (web3, from, to, time) => new Promise((resolve, reject) => {
    setTimeout(() => {
        web3.eth.sendTransaction({ from, to, value: 10000 }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }, time);
});

const getRandomAccounts = (accounts) => {
    const from = accounts[Math.floor(accounts.length * Math.random())];
    let to = from;

    while (from === to) {
        to = accounts[Math.floor(accounts.length * Math.random())];
    }

    return { from, to };
};

class RandomTransactionSupplier {
    constructor(web3) {
        this.web3 = web3;
    }

    getSupplyWithRandomTransactionsPromise(timeout, howManyBlocks) {
        const self = this;

        return new Promise((resolve, reject) => {
            self.web3.eth.getBlockNumber((err, blockNumber) => {
                if (err) {
                    const blockNumberErr = new Error();
                    blockNumberErr.gettingBlockNumberFailed = true;
                    reject(blockNumberErr);
                }

                if (blockNumber === 0) {
                    self.web3.eth.getAccounts((err2, accounts) => {
                        if (err2) {
                            reject(err2);
                            return;
                        }

                        let promise = Promise.resolve();

                        for (let i = 0; i < howManyBlocks; i += 1) {
                            const chosenAccounts = getRandomAccounts(accounts);

                            promise = promise.then(() => getTransferPromise(
                                self.web3,
                                chosenAccounts.from,
                                chosenAccounts.to,
                                timeout,
                            ));
                        }

                        promise.then(() => {
                            resolve({ transactionsAdded: true });
                        }, (err3) => {
                            reject(err3);
                        });
                    });
                } else {
                    resolve({ transactionsAdded: false });
                }
            });
        });
    }

    getTryToSupplyEmptyBlockchainPromise(retryTime, supplyTime) {
        const self = this;

        return new Promise((resolve, reject) => {
            const iterator = 20;
            let promise = Promise.resolve();
            let alreadyCalledResolve = false;

            for (let i = 0; i < iterator; i += 1) {
                promise = promise.then(() => new Promise((resolve2, reject2) => {
                    setTimeout(() => {
                        self.getSupplyWithRandomTransactionsPromise(supplyTime, 50).then((obj) => {
                            resolve2(obj);
                        }, (err2) => {
                            reject2(err2);
                        });
                    }, retryTime);
                })).then((obj) => {
                    if (!alreadyCalledResolve) {
                        resolve(obj);
                        alreadyCalledResolve = true;
                    }
                    return Promise.reject();
                }, (obj) => {
                    if (!obj.gettingBlockNumberFailed) {
                        reject(obj);
                    }
                });
            }

            promise.then(() => {
                reject(new Error('The blockchain seems to be unavailable'));
            }, () => {
            });
        });
    }
}

module.exports = RandomTransactionSupplier;
