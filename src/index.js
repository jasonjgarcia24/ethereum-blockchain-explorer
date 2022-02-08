require('dotenv').config({ path: '../.env' })

const Ganache = require('ganache-core');
const Web3Wallet = require('../utils/Web3Wallet');
const Account = require('../models/Account');
const Block = require('../models/Block');
const Transaction = require('../models/Transaction');
const { utils } = require('ethers');

const { setNetwork, getNetworkCookie } = require('./forms/network');
const { showBlock } = require('./forms/block');
const { showTransaction } = require('./forms/transaction');
const { showAccount } = require('./forms/account');

const RPC_PROVIDER = 'ALCHEMY';
const NETWORK = (getNetworkCookie() || 'rinkeby').toUpperCase();


const main = async () => {
    setNetwork(NETWORK);

    const _location = window.location;
    const [_, _network, _key, _value] = _location.pathname.split('/');

    let web3Wallet;

    switch (_key) {
        case 'tx':
            web3Wallet = new Web3Wallet({
                rpcProvider: RPC_PROVIDER,
                network: NETWORK,
                numberOfWallets: 1
            })

            const aTransaction = new Transaction(web3Wallet.provider);
            await aTransaction.setTransaction(_value)

            showTransaction(aTransaction, web3Wallet)
            break;
        case 'account':
            web3Wallet = new Web3Wallet({
                rpcProvider: RPC_PROVIDER,
                network: NETWORK,
                numberOfWallets: 1
            })

            const aAccount = new Account(web3Wallet.provider, NETWORK, _value)

            showAccount(aAccount, web3Wallet)
            break;
        case 'block':
        default:
            console.log(_value)
            web3Wallet = new Web3Wallet({
                rpcProvider: RPC_PROVIDER,
                network: NETWORK,
                numberOfWallets: 1
            })

            const aBlock = new Block(web3Wallet.provider);
            await aBlock.setBlock(utils.hexlify(parseInt(_value)))

            showBlock(aBlock, web3Wallet)
            break;
    }
}

main()
    .then(console.log('FIN!!'))
    .catch(error => {
        console.error(error);
    });