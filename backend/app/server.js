const express = require('express');
const process = require('process');
const ethereumBlockMiningTimeCalculatorProvider = require('./provider/ethereumBlockMiningTimeCalculatorProvider.js');
const randomTransactionSupplierProvider = require('./provider/randomTransactionSupplierProvider.js');

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
        const supplier = randomTransactionSupplierProvider.get();

        supplier.getTryToSupplyEmptyBlockchainPromise(5000, 2000).then((obj) => {
            if (obj && obj.transactionsAdded) {
                console.log('The transactions have been added.');
            } else {
                console.log('There was no need to add transactions.');
            }
        }, (err) => {
            console.log('There was an error when tried to add transactions ', err);
        });
    }
    /* eslint-enable no-console */
});
