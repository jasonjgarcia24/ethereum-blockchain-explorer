const pageTitle = document.getElementById('container-title');
const containerDiv = document.getElementById('container-data');

const showAccount = (account, wallet) => {
    pageTitle.textContent = '';
    showTitle(account);

    const keys = ['address', 'balance', 'code', 'network', 'transactions', 'value'];

    keys.forEach(key => {
        switch (key) {
            case 'address':
            case 'network':
                showAccountData(key, account[key]);
                break;
            case 'balance':
            case 'code':
            case 'value':
                showAsyncAccountData(key, account[key]);
                break;
            case 'transactions':
                showAccountTransactionData(key, account[key], wallet)
                break;
        }
    })
}

const showTitle = async (account) => {
    const isContract = await account.isContract();
    pageTitle.textContent = isContract ? 'Contract Explorer' : 'Externally Owned Account Explorer';
}

const showAccountData = (key, value) => {  
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
    _value.value = value;
    _value.setAttribute('readonly', true);

    _label.className = _label_className;
    _label.for = _id;
    _label.appendChild(_text);

    _div.appendChild(_value);
    _div.insertBefore(_label, _value);

    containerDiv.appendChild(_div);
}

const showAsyncAccountData = async (key, value) => {  
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
    _value.value = await value;
    _value.setAttribute('readonly', true);

    _label.className = _label_className;
    _label.for = _id;
    _label.appendChild(_text);

    _div.appendChild(_value);
    _div.insertBefore(_label, _value);

    containerDiv.appendChild(_div);
}

const showAccountTransactionData = async (key, value, wallet) => {
    const _transactions = await value;

    _transactions.forEach((tx, i) => {
        let _onClick = () => { redirectURL(tx.hash, wallet) };

        let _div = document.createElement('DIV');
        let _value = document.createElement('A');
        let _label = document.createElement('LABEL');

        let _value_text = document.createTextNode(tx.hash);
        let _label_text = document.createTextNode(`${key} (${i}): `);

        let _div_className = `contents contents-div contents-div-${key}`;
        let _value_className = `contents contents-block contents-block-value contents-block-${key}-value`;
        let _label_className = `contents contents-block contents-block-label contents-block-${key}-label`;
        let _id = `contents-block-${key}-value`;

        _div.className = _div_className;

        _value.className = _value_className;
        _value.id = _id;
        _value.value = tx.hash;
        _value.href = '#';
        _value.onclick = _onClick;
        _value.setAttribute('readonly', true);
        _value.appendChild(_value_text);

        _label.className = _label_className;
        _label.for = _id;
        _label.appendChild(_label_text);

        _div.appendChild(_value);
        _div.insertBefore(_label, _value);

        containerDiv.appendChild(_div);
    });
}

const redirectURL = async (transactionHash, wallet) => {
    const { showTransaction } = require('./transaction');
    const Transaction = require('../../models/Transaction');
    const { removeAllDivChildren } = require('../../utils/htmlElementUtils');

    // window.location = `?tx=${transactionHash}`;
    removeAllDivChildren(containerDiv);

    const aTransaction = new Transaction(wallet.provider);
    await aTransaction.setTransaction(transactionHash);
    
    showTransaction(aTransaction, wallet)
}

module.exports = { showAccount };