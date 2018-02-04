const express = require('express');
const app = express();
const ethereumBlockMiningTimeCalculatorProvider = require('./provider/ethereumBlockMiningTimeCalculatorProvider.js');
const web3Provider = require('./provider/web3ProviderFromEnvironmentVariables.js');
const utils = require('./utils.js');

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

app.get('/add-transactions', function(req, res) {
    const web3 = web3Provider.get();

    web3.eth.getAccounts(function(err, accounts) {
        let promise = Promise.resolve();

        for(let i = 0; i < 10; i++) {
            let chosenAccounts = utils.getRandomAccounts(accounts);

            promise = promise.then(function() {
                return utils.getTransferPromise(chosenAccounts.from, chosenAccounts.to, 2000);
            });
        }

        promise.then(function() {
            res.send('done');
        });
    });
});

app.listen(3456, function() {
    console.log("The server is ready. ");
});