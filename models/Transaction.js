class Transaction {
    #provider;
    #properties;

    constructor (provider, properties = {
        accessList: undefined,
        blockHash: undefined,
        blockNumber: undefined,
        chainId: undefined,
        confirmations: undefined,
        creates: undefined,
        data: undefined,
        from: undefined,
        gasLimit: undefined,
        gasPrice: undefined,
        hash: undefined,
        maxFeePerGas: undefined,
        maxPriorityFeePerGas: undefined,
        nonce: undefined,
        r: undefined,
        s: undefined,
        to: undefined,
        transactionIndex: undefined,
        type: undefined,
        v: undefined,
        value: undefined,
        wait: undefined,
    }) {
        this.#provider = provider;
        this.#properties = properties;
    }

    get accessList() { return this.#properties.accessList; }
    get blockHash() { return this.#properties.blockHash; }
    get blockNumber() { return this.#properties.blockNumber; }
    get chainId() { return this.#properties.chainId; }
    get confirmations() { return this.#properties.confirmations; }
    get creates() { return this.#properties.creates; }
    get data() { return this.#properties.data; }
    get from() { return this.#properties.from; }
    get gasLimit() { return this.#properties.gasLimit; }
    get gasPrice() { return this.#properties.gasPrice; }
    get hash() { return this.#properties.hash; }
    get maxFeePerGas() { return this.#properties.maxFeePerGas; }
    get maxPriorityFeePerGas() { return this.#properties.maxPriorityFeePerGas; }
    get nonce() { return this.#properties.nonce; }
    get r() { return this.#properties.r; }
    get s() { return this.#properties.s; }
    get to() { return this.#properties.to; }
    get transactionIndex() { return this.#properties.transactionIndex; }
    get type() { return this.#properties.type; }
    get v() { return this.#properties.v; }
    get value() { return this.#properties.value; }
    get wait() { return this.#properties.wait; }

    keys = () => {
        return Object.keys(this.#properties);
    }

    async setTransaction(transactionHash) {
        const _transaction = await this.#provider.getTransaction(transactionHash);
        this.#properties = _transaction;
    }

}

module.exports = Transaction;