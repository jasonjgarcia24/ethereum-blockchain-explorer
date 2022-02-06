require('dotenv').config({ path: '../.env' })

// const React = require('react');
// const ReactDOM = require('react-dom');
// const { Link, Switch, BrowseRouter, Route } = require('react-router-dom');

const Ganache = require('ganache-core');
const Web3Wallet = require('../utils/Web3Wallet');
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

const { showBlockData, showLinkedBlockData } = require('./forms/block');
const { showTransactionData, showLinkedTransactionData } = require('./forms/transaction');

const RPC_PROVIDER = 'ALCHEMY';
const NETWORK = 'RINKEBY';
const BLOCK_NUM = utils.hexlify(10118786);


async function main() {
    const url = process.env[`${RPC_PROVIDER}_${NETWORK}_URL`];
    const web3Wallet = new Web3Wallet({
        rpcProvider: RPC_PROVIDER,
        network: NETWORK,
        numberOfWallets: 1
    })

    const [privateKey] = await web3Wallet.getPrivateKeys();
    const aBlock = new Block(web3Wallet.provider);
    const aTransaction = new Transaction(web3Wallet.provider);
    await aBlock.setBlock(BLOCK_NUM)
    await aTransaction.setTransaction(aBlock.transactions[0])
    console.log(aTransaction)

    console.log(aBlock)

    showBlock(aBlock)
    // showTransaction(aTransaction)
}

const showBlock = (block) => {
    block.keys().forEach(key => {
        if (key === 'transactions') {
            block.transactions.forEach((tx, i) => {
                let _href = `https://${NETWORK}.etherscan.io/tx/${tx}`
                // let _href = `?/tx/${tx}`
                showLinkedBlockData(`transaction (${i})`, tx, _href)
            })
        }
        else if (key === 'number') {
            let _href = `https://${NETWORK}.etherscan.io/block/${block.number}`;
            showLinkedBlockData('number', block.number, _href)
        }
        else {
            showBlockData(key, block[key])
        }
    })
}

const showTransaction = (transaction) => {
    transaction.keys().forEach(key => {
        if (key === 'hash') {
            let _href = `https://${NETWORK}.etherscan.io/tx/${transaction.hash}`
            showLinkedTransactionData(`hash`, transaction.hash, _href)
        }
        else if (key === 'blockHash' || key === 'blockNumber') {
            let _href = `https://${NETWORK}.etherscan.io/block/${transaction.blockNumber}`;
            showLinkedTransactionData(`${key}`, transaction[key], _href)
        }
        else if (key === 'from' || key === 'to') {
            let _href = `https://${NETWORK}.etherscan.io/address/${transaction[key]}`;
            showLinkedTransactionData(`${key}`, transaction[key], _href)
        }
        else if (key !== 'wait') {
            showTransactionData(key, transaction[key])
        }
    })
}

// function Nav() {    
//     return (
//         <div>
//             <Link to="/">Home</Link>
//             <Link to="/about">About</Link>
            
//             <Switch>
//                 <Route exact path="/" render={() => <h1>Home Page!</h1>} />
//                 <Route path="/about" render={() => <h1>About Page!</h1>} />
//             </Switch>
//         </div>
//     )
// }

// ReactDOM.render(
//     <BrowseRouter>
//         Nav()
//     </BrowseRouter>, 
//     document.getElementById("root")
// )

main()
  .then(console.log('FIN!!'))
  .catch(error => {
    console.error(error);
});