const express = require('express');
const process = require('process');
const ethereumBlockMiningTimeCalculatorProvider = require('./provider/ethereumBlockMiningTimeCalculatorProvider.js');
const web3Provider = require('./provider/web3ProviderFromEnvironmentVariables.js');
const utils = require('./utils.js');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/mining-time/average/last-minutes/:minutes', (req, res) => {
    const calculator = ethereumBlockMiningTimeCalculatorProvider.get();
    const calculatePromise = calculator.getCalculateAverageMiningTimeForSecondsPromise(
        60 * req.params.minutes,
    );

    res.type('json');

    calculatePromise.then((average) => {
        res.send(JSON.stringify({ success: true, average }));
    }, (err) => {
        res.send(JSON.stringify({ success: false, message: err ? err.message : '' }));
    });
});

app.get('/mining-time/average/last-blocks/:blocks', (req, res) => {
    const calculator = ethereumBlockMiningTimeCalculatorProvider.get();
    const calculatePromise = calculator.getCalculateAverageMiningTimeForBlocksPromise(
        req.params.blocks,
    );

    res.type('json');

    calculatePromise.then((average) => {
        res.send(JSON.stringify({ success: true, average }));
    }, (err) => {
        res.send(JSON.stringify({ success: false, message: err ? err.message : '' }));
    });
});

app.listen(process.env.APPLICATION_PORT, () => {
    /* eslint-disable no-console */
    console.log('The server is ready.');

    // when development mode, please wait until all test
    // transactions are inserted into the blockchain
    if (process.env.APPLICATION_MODE === 'development') {
        const web3 = web3Provider.get();

        web3.eth.getBlockNumber((blockNumber) => {
            if (blockNumber === 0) {
                web3.eth.getAccounts((err, accounts) => {
                    let promise = Promise.resolve();

                    for (let i = 0; i < 10; i += 1) {
                        const chosenAccounts = utils.getRandomAccounts(accounts);

                        promise = promise.then(() =>
                            utils.getTransferPromise(chosenAccounts.from, chosenAccounts.to, 2000));
                    }

                    promise.then(() => {
                        console.log('Test transactions are save to the blockchain.');
                    });
                });
            }
        });
    }
    /* eslint-enable no-console */
});
