const express = require('express');
const app = express();
const ethereumBlockMiningTimeCalculatorProvider = require('./provider/ethereumBlockMiningTimeCalculatorProvider.js');

const web3Provider = require('./provider/web3ProviderFromEnvironmentVariables.js');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/mining-time/average/last-minutes/:minutes', function(req, res) {
    const calculator = ethereumBlockMiningTimeCalculatorProvider.get();

    res.type('json');

    calculator.getCalculateAverageMiningTimeForSecondsPromise(60*req.params.minutes).then(function(average) {
        res.send(JSON.stringify({success: true, average: average}));
    }, function(err) {
        res.send(JSON.stringify({success: false, message: err ? err.message :  ""}));
    });

});

app.get('/mining-time/average/last-blocks/:blocks', function(req, res) {
    const calculator = ethereumBlockMiningTimeCalculatorProvider.get();

    res.type('json');

    calculator.getCalculateAverageMiningTimeForBlocksPromise(req.params.blocks).then(function(average) {
        res.send(JSON.stringify({success: true, average: average}));

    }, function(err) {
        res.send(JSON.stringify({success: false, message: err ? err.message : ""}));
    });
});

app.get('/add', function(req, res) {
    const web3 = web3Provider.get();

    function getTransferPromise(from, to) {
        return new Promise(function(resolve, reject) {

            setTimeout(() => {
                web3.eth.sendTransaction({from: from, to: to, value: 10000}, function(err) {
                    if(err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                })

            }, 2000);

        });
    }

    function getRandomAccounts(accounts) {
        const from = accounts[Math.floor(accounts.length*Math.random())];
        let to = from;

        while(from === to) {
            to = accounts[Math.floor(accounts.length*Math.random())];
        }

        return {from: from, to: to};
    }

    web3.eth.getAccounts(function(err, accounts) {
        let promise = Promise.resolve();

        for(let i = 0; i < 10; i++) {
            let chosenAccounts = getRandomAccounts(accounts);

            promise = promise.then(function() {
                return getTransferPromise(chosenAccounts.from, chosenAccounts.to);
            });
        }

        promise.then(function() {
            res.send('done');
        });
    });
});

app.listen(3456, function() {
    console.log("The server is ready. ");

    const calculator = ethereumBlockMiningTimeCalculatorProvider.get();

    calculator.getCalculateAverageMiningTimeForBlocksPromise(10).then(() => {
        console.log('scucess')
    });
});