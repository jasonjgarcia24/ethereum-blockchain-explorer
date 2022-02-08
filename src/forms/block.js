const { setCollapsibleTransactions } = require('../../utils/htmlElementUtils')

const pageTitle = document.getElementById('contents-title');
const containerDiv = document.getElementById('container-data');

const showBlock = (block, wallet) => {
    pageTitle.textContent = 'Block Explorer';

    block.keys().forEach(key => {
        switch (key) {
            case 'transactions':
                let _txTitle = `Transactions (${block.transactions.length})`;
                let _divAll = setCollapsibleTransactions(_txTitle);
                block.transactions.forEach((tx, i) => {
                    let _onClick = () => { redirectTransactionURL(tx, wallet) };
                    showLinkedBlockData(_divAll, `transaction (${i})`, tx, _onClick);
                })
                break;
            case 'parentHash':
                let _onClick = () => { redirectBlockURL(block.number - 1, wallet) };
                showLinkedBlockData(containerDiv, key, block.parentHash, _onClick);
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

const showLinkedBlockData = (parentDiv, key, value, onClick) => {
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
    _value.href = '';
    _value.onclick = onClick;
    _value.setAttribute('readonly', true);
    _value.appendChild(_value_text);

    _label.className = _label_className;
    _label.for = _id;
    _label.appendChild(_label_text);

    _div.appendChild(_value);
    _div.insertBefore(_label, _value);

    parentDiv.appendChild(_div);
}

const redirectBlockURL = async (blockNum, wallet) => {
    const Block = require('../../models/Block');
    const { removeAllDivChildren } = require('../../utils/htmlElementUtils');
    const _network = wallet.network.toLowerCase();
    const _new_path = `${window.location.origin}/${_network}/block/${blockNum}`;

    history.pushState('', '', _new_path);
    removeAllDivChildren(containerDiv);

    const aBlock = new Block(wallet.provider);
    await aBlock.setBlock(blockNum);

    showBlock(aBlock, wallet)
}

const redirectTransactionURL = async (transactionHash, wallet) => {
    const { showTransaction } = require('./transaction');
    const Transaction = require('../../models/Transaction');
    const { removeAllDivChildren } = require('../../utils/htmlElementUtils');
    const _network = wallet.network.toLowerCase();
    const _new_path = `${window.location.origin}/${_network}/tx/${transactionHash}`;

    history.pushState('', '', _new_path);
    removeAllDivChildren(containerDiv);

    const aTransaction = new Transaction(wallet.provider);
    await aTransaction.setTransaction(transactionHash);

    showTransaction(aTransaction, wallet)
}

module.exports = { showBlock };