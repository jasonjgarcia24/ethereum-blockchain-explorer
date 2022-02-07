class Transaction {
    #provider;
    #properties;
    #receipt;

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
        this.#receipt;
    }

    get accessList() { return this.getterFormat(this.#properties.accessList); }
    get blockHash() { return this.getterFormat(this.#properties.blockHash); }
    get blockNumber() { return this.getterFormat(this.#properties.blockNumber); }
    get chainId() { return this.getterFormat(this.#properties.chainId); }
    get confirmations() { return this.getterFormat(this.#properties.confirmations); }
    get creates() { return this.getterFormat(this.#properties.creates ? this.#properties.creates.toLowerCase() : this.#properties.creates); }
    get data() { return this.getterFormat(this.#properties.data); }
    get from() { return this.getterFormat(this.#properties.from); }
    get gasLimit() { return this.getterFormat(this.#properties.gasLimit); }
    get gasPrice() { return this.getterFormat(this.#properties.gasPrice); }
    get hash() { return this.getterFormat(this.#properties.hash); }
    get maxFeePerGas() { return this.getterFormat(this.#properties.maxFeePerGas); }
    get maxPriorityFeePerGas() { return this.getterFormat(this.#properties.maxPriorityFeePerGas); }
    get nonce() { return this.getterFormat(this.#properties.nonce); }
    get r() { return this.getterFormat(this.#properties.r); }
    get s() { return this.getterFormat(this.#properties.s); }
    get to() { return this.getterFormat(this.#properties.to); }
    get transactionIndex() { return this.getterFormat(this.#properties.transactionIndex); }
    get type() { return this.getterFormat(this.#properties.type); }
    get v() { return this.getterFormat(this.#properties.v); }
    get value() { return this.getterFormat(this.#properties.value); }
    get wait() { return this.getterFormat(this.#properties.wait); }
    get status() { return this.getterFormat(this.#receipt.status); }

    keys = () => {
        let _keys = Object.keys(this.#properties);
        _keys.splice(1, 0, 'status');

        return _keys;
    }

    async setTransaction(transactionHash) {
        const _transaction = await this.#provider.getTransaction(transactionHash);
        this.#properties = _transaction;

        const _receipt = await this.#provider.getTransactionReceipt(transactionHash);
        this.#receipt = _receipt;
    }

    getterFormat = (val) => {
        return (val !== null && val !== undefined) ? val : '---';
    }

}

module.exports = Transaction;