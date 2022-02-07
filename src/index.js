require('dotenv').config({ path: '../.env' })

const Ganache = require('ganache-core');
const Web3Wallet = require('../utils/Web3Wallet');
const Account = require('../models/Account');
const Block = require('../models/Block');
const Transaction = require('../models/Transaction');
const { utils, Wallet, ethers:
    {
        providers: {
            JsonRpcProvider,
            Web3Provider,
            AlchemyProvider
        }
    }
} = require('ethers');

const { showBlock } = require('./forms/block');
const { showTransaction } = require('./forms/transaction');

const RPC_PROVIDER = 'ALCHEMY';
const NETWORK = 'RINKEBY';
const BLOCK_NUM = utils.hexlify(10118786);


const main = async () => {
    const url = process.env[`${RPC_PROVIDER}_${NETWORK}_URL`];
    const web3Wallet = new Web3Wallet({
        rpcProvider: RPC_PROVIDER,
        network: NETWORK,
        numberOfWallets: 1
    })

    const aBlock = new Block(web3Wallet.provider);
    await aBlock.setBlock(BLOCK_NUM)

    showBlock(aBlock, web3Wallet)
    
    const aAccount = new Account(web3Wallet.provider, NETWORK, '0x29cd3f0bf3cd2859b24df7fe372f341ae3bb93c6')
}

main()
  .then(console.log('FIN!!'))
  .catch(error => {
    console.error(error);
});