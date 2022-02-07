require('dotenv').config({ path: '../.env' })

const Transaction = require('../models/Transaction');
const { utils, ethers } = require('ethers');

class Account {
    #provider;
    #network;
    #address;

    constructor (provider, network, address) {
        this.#provider = provider;
        this.#network = network;
        this.#address = address;
    }

    get address() { return this.#address; }
    get network() { return this.#network; }

    get code() {
        return (async () => {
            return await this.#provider.getCode(this.#address);
        })();
    }

    get transactions() {
        const _transactions = [];

        return (async () => {
            const etherscanProvider = new ethers.providers.EtherscanProvider(
                this.#network.toLowerCase(),
                process.env.ETHERSCAN_KEY
            );

            const _history = await etherscanProvider.getHistory(this.#address);

            _history.forEach(tx => {
                _transactions.push(
                    new Transaction(this.#provider, tx)
                )
            })

            return _transactions
        })();
    }

    get balance() {
        return (async () => {        
            const _balance = await this.#provider.getBalance(this.#address);
            return utils.formatEther(_balance);
        })();
    }

    get value() {
        return (async () => {
            const etherscanProvider = new ethers.providers.EtherscanProvider(
                this.#network.toLowerCase(),
                process.env.ETHERSCAN_KEY
            );

            return etherscanProvider.getEtherPrice();
        })();
    }

    set network(_network) { this.#network = _network; }

    async isContract() {
        const _transactions = await this.transactions;

        const _isContract = _transactions.filter(
            tx => tx.creates === this.#address.toLowerCase()
        ).length ? true : false;

        return _isContract;
    }
}

module.exports = Account;