class Block {
    #provider;
    #properties;

    constructor (provider, properties = {
        baseFeePerGas: undefined,
        difficulty: undefined,
        extraData: undefined,
        gasLimit: undefined,
        gasUsed: undefined,
        hash: undefined,
        miner: undefined,
        nonce: undefined,
        number: undefined,
        parentHash: undefined,
        timestamp: undefined,
        transactions: undefined,
        _difficulty: undefined,
    }) {
        this.#provider = provider;
        this.#properties = properties;
    }

    get baseFeePerGas() { return this.#properties.baseFeePerGas; }
    get difficulty() { return this.#properties.difficulty; }
    get extraData() { return this.#properties.extraData; }
    get gasLimit() { return this.#properties.gasLimit; }
    get gasUsed() { return this.#properties.gasUsed; }
    get hash() { return this.#properties.hash; }
    get miner() { return this.#properties.miner; }
    get nonce() { return this.#properties.nonce; }
    get number() { return this.#properties.number; }
    get parentHash() { return this.#properties.parentHash; }
    get timestamp() { return this.#properties.timestamp; }
    get transactions() { return this.#properties.transactions; }
    get _difficulty() { return this.#properties._difficulty; }

    keys = () => {
        return Object.keys(this.#properties);
    }

    async setBlock(blockNum) {
        const _block = await this.#provider.getBlock(blockNum);
        this.#properties = _block;
    }
}

module.exports = Block;