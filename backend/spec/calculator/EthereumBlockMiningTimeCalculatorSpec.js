const EthereumBlockMiningTimeCalculator = require('../../app/calculator/EthereumBlockMiningTimeCalculator');

function getFakeWeb3(data) {

    return {
        eth: {
            getBlock: function(blockNumber, fn) {
                if(blockNumber > data.length) {
                    fn(new Error("The block number is too high"));
                } else {
                    fn(undefined, data[blockNumber-1]);
                }
            },

            getBlockNumber: function(fn) {
                fn(undefined, data.length);
            }
        }
    };

}

function getRejectingFakeWeb3(data) {

    return {
        eth: {
            getBlock: function(blockNumber, fn) {
                // throw exception on second block
                if(blockNumber == data.length-2) {
                    fn(new Error());
                } else {
                    fn(undefined, data[blockNumber]);
                }
            },

            getBlockNumber: function(fn) {
                fn(undefined, data.length);
            }
        }
    }

}

describe('EthereumBlockMiningTimeCalculator', function() {

    const data = [
        {timestamp: 0}, // to here the average is 75
        {timestamp: 100},
        {timestamp: 200},
        {timestamp: 300}, // to here the average is 50
        {timestamp: 350},
        {timestamp: 400},
        {timestamp: 450}
    ];
    const web3 = getFakeWeb3(data);
    const rejectingWeb3 = getRejectingFakeWeb3(data);
    const emptyWeb3 = getFakeWeb3([]);
    const oneEntryWeb3 = getFakeWeb3([{timestamp: 1000}]);

    it('getCalculateAverageMiningTimeForSecondsPromise returns correct average time', function() {
        const calculator = new EthereumBlockMiningTimeCalculator(web3);

        return calculator.getCalculateAverageMiningTimeForSecondsPromise(100).then(function(avg) {
            expect(avg).toBe(50);

            return calculator.getCalculateAverageMiningTimeForSecondsPromise(450);
        }).then(function(avg) {
            expect(avg).toBe(75);

        });

    });

    it('getCalculateAverageMiningTimeForSecondsPromise returns reject when the time difference is not enough', function() {
        const calculator = new EthereumBlockMiningTimeCalculator(web3);

        return calculator.getCalculateAverageMiningTimeForSecondsPromise(1).then(function() {
            return Promise.reject(new Error("The promise should be rejected"));
        }, function() {
            return Promise.resolve();
        });

    });

    it('getCalculateAverageMiningTimeForSecondsPromise returns reject when web3 fails', function() {
        const calculator = new EthereumBlockMiningTimeCalculator(rejectingWeb3);

        return calculator.getCalculateAverageMiningTimeForSecondsPromise(450).then(function(avg) {
            return Promise.reject(new Error("Promise should be rejected"));
        }, function() {
            return Promise.resolve();
        });
    });

    it('getCalculateAverageMiningTimeForSecondsPromise reject when blockchain is empty', function() {
        const calculator = new EthereumBlockMiningTimeCalculator(emptyWeb3);

        return calculator.getCalculateAverageMiningTimeForSecondsPromise(450).then(function() {
            return Promise.reject(new Error("The promise should be rejected"));
        }, function() {
            return Promise.resolve();
        });
    });

    it('getCalculateAverageMiningTimeForSecondsPromise reject when blockchain has only one entry', function() {
        const calculator = new EthereumBlockMiningTimeCalculator(oneEntryWeb3);

        return calculator.getCalculateAverageMiningTimeForSecondsPromise(450).then(function() {
            return Promise.reject(new Error("The promise should be rejected"));
        }, function() {
            return Promise.resolve();
        });
    });

    it('getCalculateAverageMiningTimeForBlocksPromise returns correct average time', function() {
        const calculator = new EthereumBlockMiningTimeCalculator(web3);

        return calculator.getCalculateAverageMiningTimeForBlocksPromise(3).then(function(avg) {
            expect(avg).toBe(50);

            return calculator.getCalculateAverageMiningTimeForBlocksPromise(7);

        }).then(function(avg) {
            expect(avg).toBe(75);
        })
    });

    it('getCalculateAverageMiningTimeForBlocksPromise returns correct average time even when overflowed', function() {
        const calculator = new EthereumBlockMiningTimeCalculator(web3);

        return calculator.getCalculateAverageMiningTimeForBlocksPromise(100).then(function(avg) {
            expect(avg).toBe(75);
        });
    });

    it('getCalculateAverageMiningTimeForBlocksPromise returns reject when the time difference is not enough', function() {
        const calculator = new EthereumBlockMiningTimeCalculator(web3);

        return calculator.getCalculateAverageMiningTimeForBlocksPromise(1).then(function() {

            return Promise.reject(new Error("The promise should be rejected"));
        }, function() {
            return Promise.resolve();
        });
    });

    it('getCalculateAverageMiningTimeForBlocksPromise returns reject when web3 fails', function() {
        const calculator = new EthereumBlockMiningTimeCalculator(rejectingWeb3);

        return calculator.getCalculateAverageMiningTimeForBlocksPromise(7).then(function() {
            return Promise.reject(new Error("The promise should be rejected"));
        }, function() {
            return Promise.resolve();
        });
    });

    it('getCalculateAverageMiningTimeForBlocksPromise reject when blockchain is empty', function() {
        const calculator = new EthereumBlockMiningTimeCalculator(emptyWeb3);

        return calculator.getCalculateAverageMiningTimeForBlocksPromise(7).then(function() {
            return Promise.reject(new Error("The promise should be rejected"));
        }, function() {
            return Promise.resolve();
        });
    });

    it('getCalculateAverageMiningTimeForBlocksPromise reject when blockchain has only one entry', function() {
        const calculator = new EthereumBlockMiningTimeCalculator(oneEntryWeb3);

        return calculator.getCalculateAverageMiningTimeForBlocksPromise(7).then(function() {
            return Promise.reject(new Error("The promise should be rejected"));
        }, function() {
            return Promise.resolve();
        });
    });


});