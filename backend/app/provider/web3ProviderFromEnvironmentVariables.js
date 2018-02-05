const Web3Provider = require('./class/Web3Provider');
const process = require('process');

module.exports = new Web3Provider(process.env.ETHEREUM_NODE_HOSTNAME,
    process.env.ETHEREUM_NODE_PORT);
