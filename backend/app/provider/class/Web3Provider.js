const Web3 = require('web3');
const process = require('process');

class Web3Provider {

    constructor(hostname, port) {
        this.hostname = hostname;
        this.port = port;
    }

    get() {
        if(this.instance === undefined) {
            this.instance = new Web3(new Web3.providers.HttpProvider("http://"+this.hostname+":"+this.port));
        }

        return this.instance;
    }

}

module.exports = Web3Provider;