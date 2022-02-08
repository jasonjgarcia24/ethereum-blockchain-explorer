const { EVM } = require("evm");
const {
    setCollapsibleTransactions,
    setCollapsibleBytecode
} = require('../../utils/htmlElementUtils')


const pageTitle = document.getElementById('contents-title');
const bytecodeTopDiv = document.getElementById('container-all-bytecode');
const bytecodeDiv = document.getElementById('container-contents-bytecode');
const containerDiv = document.getElementById('container-data');

const showAccount = async (account, wallet) => {
    pageTitle.textContent = '';
    showTitle(account);
    await showBytecode(account);

    const [_raw, _decompiled, _opcodes] = await parseCode(account);
    const keys = ['address', 'balance', 'code', 'network', 'transactions', 'value'];

    keys.forEach(async (key) => {
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
                let tx = await account.transactions;
                let _txTitle = `Transactions (${tx.length})`;
                let _divAll = setCollapsibleTransactions(_txTitle)
                showAccountTransactionData(_divAll, key, account.transactions, wallet)
                break;
        }
    })

    // Bytecode Displays
    let _divRawBytecode = setCollapsibleBytecode('Raw Bytecode', 'bytecode-raw');
    let _divDecompiledBytecode = setCollapsibleBytecode('Decompiled Bytecode', 'bytecode-decompile');
    let _divOpcode = setCollapsibleBytecode('Opcode', 'bytecode-opcodes');

    showAccountCodeData(_divRawBytecode, 'bytecode-raw', _raw)
    showAccountCodeData(_divDecompiledBytecode, 'bytecode-decompile', _decompiled)
    showAccountCodeData(_divOpcode, 'bytecode-opcodes', _opcodes)
}

const showTitle = async (account) => {
    const isContract = await account.isContract();
    pageTitle.textContent = isContract ? 'Contract Explorer' : 'Account Explorer';
}

const showBytecode = async (account) => {
    const isContract = await account.isContract();
    bytecodeTopDiv.style.display = isContract ? "block" : "none";
}

const parseCode = async (account) => {
    const _code = await account.code;
    const _evm = new EVM(_code);

    const _raw = _code.replace(/.{100}/g, '$&' + "\n");
    const _decompiled = _evm.decompile();
    const _opcodes = _evm.getOpcodes().map(({ name }, i) => `(${i}) ${name}`).join('\n');

    return [_raw, _decompiled, _opcodes]
};

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

const showAccountCodeData = (parentDiv, key, value) => {
    let _div = document.createElement('DIV');
    let _value = document.createElement('PRE');

    let _div_className = `contents contents-div contents-div-${key}`;
    let _value_className = `contents contents-block contents-block-value contents-block-${key}-value`;
    let _id = `contents-block-${key}-value`;

    _div.className = _div_className;

    _value.className = _value_className;
    _value.id = _id;
    _value.textContent = value;
    _value.setAttribute('readonly', true);

    _div.appendChild(_value);

    parentDiv.appendChild(_div);
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

const showAccountTransactionData = async (parentDiv, key, value, wallet) => {
    const _transactions = await value;

    _transactions.forEach((tx, i) => {
        if (i > 500) return;

        let _onClick = () => { redirectTransactionURL(tx.hash, wallet) };

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
        _value.href = '';
        _value.onclick = _onClick;
        _value.setAttribute('readonly', true);
        _value.appendChild(_value_text);

        _label.className = _label_className;
        _label.for = _id;
        _label.appendChild(_label_text);

        _div.appendChild(_value);
        _div.insertBefore(_label, _value);

        parentDiv.appendChild(_div);
    });
}

const redirectTransactionURL = async (transactionHash, wallet) => {
    const { showTransaction } = require('./transaction');
    const Transaction = require('../../models/Transaction');
    const { removeAllDivChildren } = require('../../utils/htmlElementUtils');
    const _new_page = `${window.location.origin}/tx/${transactionHash}`;

    removeAllDivChildren(bytecodeDiv);
    bytecodeTopDiv.style.display = "none";

    history.pushState('', '', _new_page);
    removeAllDivChildren(containerDiv);

    const aTransaction = new Transaction(wallet.provider);
    await aTransaction.setTransaction(transactionHash);

    showTransaction(aTransaction, wallet)
}

module.exports = { showAccount };