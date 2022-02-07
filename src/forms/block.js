const pageTitle = document.getElementById('container-title');
const containerDiv = document.getElementById('container-data');

const showBlock = (block, wallet) => {
    pageTitle.textContent = 'Block Explorer';

    block.keys().forEach(key => {
        switch (key) {
            case 'transactions':
                block.transactions.forEach((tx, i) => {
                    let _onClick = () => { redirectTransactionURL(tx, wallet) };
                    showLinkedBlockData(`transaction (${i})`, tx, _onClick);
                })
                break;
            case 'parentHash':
                let _onClick = () => { redirectBlockURL(block.number - 1, wallet)};
                showLinkedBlockData(key, block.parentHash, _onClick);
                break;
            case 'timestamp':
                let _timestamp = new Date(parseInt(block[key]) * 1000);
                showBlockData(key, _timestamp.toLocaleString());
                break;
            default:
                showBlockData(key, block[key])
        }
    })
}

const showBlockData = (key, value) => {    
    let _div = document.createElement('DIV');
    let _value = document.createElement('INPUT');
    let _label = document.createElement('LABEL');
    let _text = document.createTextNode(`${key}: `);

    let _div_className = `contents contents-div contents-div-${key}`;
    let _value_className = `contents contents-block contents-block-value contents-block-${key}-value`;
    let _label_className = `contents contents-block contents-block-label contents-block-${key}-label`;
    let _id = `contents-block-${key}-value`;

    _div.className = _div_className;

    _value.className = _value_className;
    _value.id = _id;
    _value.value = value ? value : '---';
    _value.setAttribute('readonly', true);

    _label.className = _label_className;
    _label.for = _id;
    _label.appendChild(_text);

    _div.appendChild(_value);
    _div.insertBefore(_label, _value);

    containerDiv.appendChild(_div);
}

const showLinkedBlockData = (key, value, onClick) => {    
    let _div = document.createElement('DIV');
    let _value = document.createElement('A');
    let _label = document.createElement('LABEL');

    let _value_text = document.createTextNode(value);
    let _label_text = document.createTextNode(`${key}: `);

    let _div_className = `contents contents-div contents-div-${key}`;
    let _value_className = `contents contents-block contents-block-value contents-block-${key}-value`;
    let _label_className = `contents contents-block contents-block-label contents-block-${key}-label`;
    let _id = `contents-block-${key}-value`;

    _div.className = _div_className;

    _value.className = _value_className;
    _value.id = _id;
    _value.value = value;
    _value.href = '#';
    _value.onclick = onClick;
    _value.setAttribute('readonly', true);
    _value.appendChild(_value_text);

    _label.className = _label_className;
    _label.for = _id;
    _label.appendChild(_label_text);

    _div.appendChild(_value);
    _div.insertBefore(_label, _value);

    containerDiv.appendChild(_div);
}

const redirectBlockURL = async (blockNum, wallet) => {
    const Block = require('../../models/Block');
    const { removeAllDivChildren } = require('../../utils/htmlElementUtils');

    // window.location = `?tx=${transactionHash}`;
    removeAllDivChildren(containerDiv);

    const aBlock = new Block(wallet.provider);
    await aBlock.setBlock(blockNum);
    
    showBlock(aBlock, wallet)
}

const redirectTransactionURL = async (transactionHash, wallet) => {
    const { showTransaction } = require('./transaction');
    const Transaction = require('../../models/Transaction');
    const { removeAllDivChildren } = require('../../utils/htmlElementUtils');

    // window.location = `?tx=${transactionHash}`;
    removeAllDivChildren(containerDiv);

    const aTransaction = new Transaction(wallet.provider);
    await aTransaction.setTransaction(transactionHash);
    console.log(aTransaction)
    
    showTransaction(aTransaction, wallet)
}

module.exports = { showBlock };