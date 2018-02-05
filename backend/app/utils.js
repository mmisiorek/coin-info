const web3Provider = require('./provider/web3ProviderFromEnvironmentVariables');

const getTransferPromise = (from, to, time) => new Promise((resolve, reject) => {
    setTimeout(() => {
        web3Provider.get().eth.sendTransaction({ from, to, value: 10000 }, (err) => {
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

module.exports = {
    getTransferPromise,
    getRandomAccounts,
};
