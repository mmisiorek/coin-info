// private methods
function getGetCurrentBlockPromise() {
    const self = this;

    return new Promise(function(resolve, reject) {
        console.log('block number ');
        self.web3.eth.getBlockNumber(function(err, blockNumber) {
            console.log('end block number');
            if(err) {
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

    return new Promise(function(resolve, reject) {
        console.log('start', blockNumber);
        self.web3.eth.getBlock(blockNumber, function(err, details) {
            console.log('end', blockNumber);
            if(err) {
                reject(err);
            } else {
                resolve(details);
            }
        });
    });
}

function getPartOfCountingAverageChainPromise(data) {
    const self = this;

    return getGetBlockPromise.call(this, data.blockNumber).then(function(blockDetails) {
        if(data.blockNumber === 0 || data.initialTime-data.seconds > blockDetails.timestamp) {
            return Promise.resolve(data);
        } else {
            data.timestamps.push(blockDetails.timestamp);
            return getPartOfCountingAverageChainPromise.call(self, data.copyWithOneBlockLower());
        }
    });
}

function calculateTimeDifferences(timestamps) {
    const diffs = [];

    for(let i = 1; i < timestamps.length; i++) {
        diffs.push(timestamps[i-1]-timestamps[i]);
    }

    return diffs;
}

function calculateAverageForTimestamps(timestamps) {
    const diffs = calculateTimeDifferences(timestamps);

    let sum = 0;
    for(let diff of diffs) {
        sum += diff;
    }

    return sum/diffs.length;
}

class AverageChainData {

    constructor(initialTime, seconds, timestamps, blockNumber) {
        this.initialTime = initialTime;
        this.seconds = seconds;
        this.timestamps = timestamps;
        this.blockNumber = blockNumber;
    }

    copyWithOneBlockLower() {
        return new AverageChainData(this.initialTime, this.seconds, this.timestamps, this.blockNumber-1);
    }

}

class EthereumBlockMiningTimeCalculator {

    constructor(web3) {
        this.web3 = web3;
    }

    getCalculateAverageMiningTimeForSecondsPromise(seconds) {
        const self = this;

        return new Promise(function(resolve, reject) {
            let initialTime = -1;
            let currentBlockNumber = -1;
            const timestamps = [];

            getGetCurrentBlockPromise.call(self).then(function(blockNumber) {
                currentBlockNumber = blockNumber;

                if(currentBlockNumber === 0) {
                    return Promise.reject(new Error("Blockchain is empty"));
                } else if(currentBlockNumber === 1) { // you cannot count mining time from one block
                    return Promise.reject(new Error("Blockchain has only one block"));
                }

                return getGetBlockPromise.call(self, currentBlockNumber);
            }).then(function(details) {
                initialTime = details.timestamp;
                timestamps.push(initialTime);

                return getPartOfCountingAverageChainPromise.call(self, new AverageChainData(initialTime, seconds, timestamps, currentBlockNumber-1));
            }).then(function(details) {
                if(details.timestamps.length > 1) {
                    resolve(calculateAverageForTimestamps(details.timestamps));
                } else {
                    reject(new Error("The number of timestamps is not enough"));
                }
            }, function(err) {
                reject(err);
            });

        });
    }

    getCalculateAverageMiningTimeForBlocksPromise(numberOfBlocks) {
        const self = this;

        return new Promise(function(resolve, reject) {
            const timestamps = [];

            getGetCurrentBlockPromise.call(self).then(function(blockNumber) {
                let startBlockNumber = blockNumber;
                let promise = startBlockNumber >= 2 ? getGetBlockPromise.call(self, startBlockNumber) : Promise.reject(new Error("Blockchain does not have enough blocks"));

                // break when you achieve requested number of block or you want to go more into the past than 1st block...
                for(let i = 0; i < numberOfBlocks && i < startBlockNumber; i++) {
                    promise = promise.then(function(blockDetails) {
                        timestamps.push(blockDetails.timestamp);

                        // if this is the last block we need - do not take another one from blockchain
                        if(numberOfBlocks-1 === i) {
                            return Promise.resolve();
                        } else {
                            return getGetBlockPromise.call(self, startBlockNumber-i-1);
                        }
                    });
                }

                promise.then(function() {
                    if(timestamps.length > 1) {
                        resolve(calculateAverageForTimestamps(timestamps));
                    } else {
                        reject(new Error("The number of timestamps is not enough"));
                    }

                }, function(err) {
                    reject(err);
                });
            });
        });
    }

}

module.exports = EthereumBlockMiningTimeCalculator;