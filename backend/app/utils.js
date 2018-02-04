const getTransferPromise = function(from, to, time) {
    return new Promise(function(resolve, reject) {

        setTimeout(() => {
            web3.eth.sendTransaction({from: from, to: to, value: 10000}, function(err) {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            })

        }, time);

    });
};

const getRandomAccounts = function(accounts) {
    const from = accounts[Math.floor(accounts.length*Math.random())];
    let to = from;

    while(from === to) {
        to = accounts[Math.floor(accounts.length*Math.random())];
    }

    return {from: from, to: to};
};

module.exports = {
    getTransferPromise: getTransferPromise,
    getRandomAccounts: getRandomAccounts,
};
