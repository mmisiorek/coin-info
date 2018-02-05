const getFakeWeb3 = (data, shouldTransactionFail, shouldGettingBlockNumberFailed) => {
    const obj = ({
        eth: {
            getBlock: function (blockNumber, fn) {
                if (blockNumber > data.length) {
                    fn(new Error("The block number is too high"));
                } else {
                    fn(undefined, data[blockNumber - 1]);
                }
            },
            getBlockNumber: function (fn) {
                if(shouldGettingBlockNumberFailed) {
                    fn(new Error());
                } else {
                    fn(undefined, data.length);
                }
            },
            sendTransaction: function (obj, fn) {
                if (shouldTransactionFail) {
                    fn(new Error());
                } else {
                    fn();
                }
            },
            getAccounts: function(fn) {
                fn(undefined, ['0x8576947964654', '0x23646346']);
            },
        },
    });

    return obj;
};

const getRejectingFakeWeb3 = (data, shouldTransactionFail) => {
    const obj = {
        eth: {
            getBlock: function(blockNumber, fn) {
                // throw exception on second block
                if(blockNumber === data.length - 2) {
                    fn(new Error());
                } else {
                    fn(undefined, data[blockNumber]);
                }
            },
            getBlockNumber: function(fn) {
                fn(undefined, data.length);
            },
            sendTransaction: function (obj, fn) {
                if (shouldTransactionFail) {
                    fn(new Error());
                } else {
                    fn();
                }
            },
        },
    };

    return obj;
};

const getLongBootingFakeWeb3 = (data, numberOfInterations) => {
    let counter = 0;
    const obj = ({
        eth: {
            getBlock: function (blockNumber, fn) {
                if (blockNumber > data.length) {
                    fn(new Error("The block number is too high"));
                } else {
                    fn(undefined, data[blockNumber - 1]);
                }
            },
            getBlockNumber: function (fn) {
                if(counter < numberOfInterations) {
                    fn(new Error());
                    counter += 1;
                } else {
                    fn(undefined, data.length);
                }
            },
            sendTransaction: function (obj, fn) {
                fn();
            },
            getAccounts: function(fn) {
                fn(undefined, ['0x8576947964654', '0x23646346']);
            },
        },
    });

    return obj;
};


module.exports = {
    getFakeWeb3,
    getRejectingFakeWeb3,
    getLongBootingFakeWeb3
};
