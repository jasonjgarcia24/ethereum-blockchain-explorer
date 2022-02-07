const { utils } = require('ethers');

const pageTitle = document.getElementById('container-title');
const containerDiv = document.getElementById('container-data');
const containerStatusDiv = document.getElementById('container-all-status');

const PASS_EMOJI = String.fromCodePoint('0x1F60E');
const FAIL_EMOJI = String.fromCodePoint('0x1F63F');

const showTransaction = (transaction, wallet) => {
    pageTitle.textContent = 'Transaction Explorer';
    let _onClick;
    let _value;
    console.log(transaction)

    transaction.keys().forEach(key => {
        console.log(key)
        switch (key) {
            case 'blockHash':
            case 'blockNumber':
                _onClick = () => { redirectBlockURL(transaction.blockNumber, wallet) };
                showLinkedTransactionData(`${key}`, transaction[key], _onClick)
                break;
            case 'from':
            case 'to':
                _onClick = () => { redirectAccountURL(transaction[key], wallet) };
                showLinkedTransactionData(`${key}`, transaction[key], _onClick);
                break;
            case 'status':
                console.log(containerStatusDiv)
                if (transaction[key]) {
                    _value = PASS_EMOJI;
                    containerStatusDiv.style.background = '#1a3';
                }
                else {
                    _value = FAIL_EMOJI;
                    containerStatusDiv.style.background = '#f25';
                }
                _value = transaction[key] ? PASS_EMOJI : FAIL_EMOJI;

                
                showTransactionData(key, _value)
                break;
            // case 'maxPriorityFeePerGas':
            // case 'maxFeePerGas':
            // case 'gasPrice':
            // case 'gasLimit':
            //     _value = utils.formatUnits(transaction.value, 'gwei')
            //     showTransactionData(key, `${_value} Gwei`)
            //     break;
            // case 'value':
            //     _value = utils.formatEther(transaction.value)
            //     showTransactionData(key, `${_value} ETH`)
            case 'wait':
                break;
            default:
                showTransactionData(key, transaction[key])
                break;
        }
    })
}

const showTransactionData = (key, value) => {
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

const showLinkedTransactionData = (key, value, onClick) => {        
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
    containerStatusDiv.style.background = 'none';

    const { showBlock } = require('./block');
    const Block = require('../../models/Block');
    const { removeAllDivChildren } = require('../../utils/htmlElementUtils');

    // window.location = `?tx=${transactionHash}`;
    removeAllDivChildren(containerDiv);

    const aBlock = new Block(wallet.provider);
    await aBlock.setBlock(blockNum);
    
    showBlock(aBlock, wallet)
}

const redirectAccountURL = async (account, wallet) => {
    containerStatusDiv.style.background = 'none';

    const { showAccount } = require('./account');
    const Account = require('../../models/Account');
    const { removeAllDivChildren } = require('../../utils/htmlElementUtils');

    // window.location = `?tx=${transactionHash}`;
    removeAllDivChildren(containerDiv);

    const aAccount = new Account(wallet.provider, wallet.network, account);    
    showAccount(aAccount, wallet)
}

module.exports = { showTransaction };