// private methods
function getGetCurrentBlockPromise() {
    const self = this;

    return new Promise((resolve, reject) => {
        self.web3.eth.getBlockNumber((err, blockNumber) => {
            if (err) {
                reject(err);
            } else {
                resolve(blockNumber);
            }
        });
    });
}

// TODO: cache results
function getGetBlockPromise(blockNumber) {
    const self = this;

    return new Promise((resolve, reject) => {
        self.web3.eth.getBlock(blockNumber, (err, details) => {
            if (err) {
                reject(err);
            } else {
                resolve(details);
            }
        });
    });
}

function getPartOfCountingAverageChainPromise(data) {
    const self = this;

    return getGetBlockPromise.call(this, data.blockNumber).then((blockDetails) => {
        if (data.blockNumber === 0 || data.initialTime - data.seconds > blockDetails.timestamp) {
            return Promise.resolve(data);
        }

        data.timestamps.push(blockDetails.timestamp);
        return getPartOfCountingAverageChainPromise.call(self, data.copyWithOneBlockLower());
    });
}

function calculateTimeDifferences(timestamps) {
    const diffs = [];

    for (let i = 1; i < timestamps.length; i += 1) {
        diffs.push(timestamps[i - 1] - timestamps[i]);
    }

    return diffs;
}

function calculateAverageForTimestamps(timestamps) {
    const diffs = calculateTimeDifferences(timestamps);

    const sum = diffs.reduce((total, diff) => (total + diff), 0);

    return sum / diffs.length;
}

class AverageChainData {
    constructor(initialTime, seconds, timestamps, blockNumber) {
        this.initialTime = initialTime;
        this.seconds = seconds;
        this.timestamps = timestamps;
        this.blockNumber = blockNumber;
    }

    copyWithOneBlockLower() {
        return new AverageChainData(
            this.initialTime,
            this.seconds,
            this.timestamps,
            this.blockNumber - 1,
        );
    }
}

class EthereumBlockMiningTimeCalculator {
    constructor(web3) {
        this.web3 = web3;
    }

    // calculates the average mining time from blocks which were
    // mined in n seconds from the last block
    getCalculateAverageMiningTimeForSecondsPromise(seconds) {
        const self = this;

        return new Promise((resolve, reject) => {
            let initialTime = -1;
            let currentBlockNumber = -1;
            const timestamps = [];

            getGetCurrentBlockPromise.call(self).then((blockNumber) => {
                currentBlockNumber = blockNumber;

                if (currentBlockNumber === 0) {
                    return Promise.reject(
                        new Error('Blockchain is empty'),
                    );
                } else if (currentBlockNumber === 1) {
                    // you cannot count mining time from one block
                    return Promise.reject(
                        new Error('Blockchain has only one block'),
                    );
                }

                return getGetBlockPromise.call(self, currentBlockNumber);
            }).then((details) => {
                initialTime = details.timestamp;
                timestamps.push(initialTime);

                return getPartOfCountingAverageChainPromise.call(
                    self,
                    new AverageChainData(initialTime, seconds, timestamps, currentBlockNumber - 1),
                );
            }).then((details) => {
                if (details.timestamps.length > 1) {
                    resolve(calculateAverageForTimestamps(details.timestamps));
                } else {
                    reject(new Error('The number of timestamps is not enough'));
                }
            }, (err) => {
                reject(err);
            });
        });
    }

    // calculates the average mining time from last n blocks
    getCalculateAverageMiningTimeForBlocksPromise(numberOfBlocks) {
        const self = this;

        return new Promise((resolve, reject) => {
            const timestamps = [];

            getGetCurrentBlockPromise.call(self).then((blockNumber) => {
                const startBlockNumber = blockNumber;
                let promise = startBlockNumber >= 2 ? getGetBlockPromise.call(self, startBlockNumber) : Promise.reject(new Error('Blockchain does not have enough blocks'));

                // break when you achieve requested number of block or you want
                // to go more into the past than 1st block...
                for (let i = 0; i < numberOfBlocks && i < startBlockNumber; i += 1) {
                    promise = promise.then((blockDetails) => {
                        timestamps.push(blockDetails.timestamp);

                        // if this is the last block we need - do not take
                        // another one from blockchain
                        if (numberOfBlocks - 1 === i) {
                            return Promise.resolve();
                        }

                        return getGetBlockPromise.call(self, startBlockNumber - i - 1);
                    });
                }

                promise.then(() => {
                    if (timestamps.length > 1) {
                        resolve(calculateAverageForTimestamps(timestamps));
                    } else {
                        reject(new Error('The number of timestamps is not enough'));
                    }
                }, (err) => {
                    reject(err);
                });
            }, (err) => {
                reject(err);
            });
        });
    }
}

module.exports = EthereumBlockMiningTimeCalculator;
