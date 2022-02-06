const containerDiv = document.getElementById('container-div');

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

    _label.className = _label_className;
    _label.for = _id;
    _label.appendChild(_text);

    _div.appendChild(_value);
    _div.insertBefore(_label, _value);

    containerDiv.appendChild(_div);
}

const showLinkedTransactionData = (key, value, href) => {    
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
    _value.href = href;
    _value.target = '_blank';
    _value.appendChild(_value_text);

    _label.className = _label_className;
    _label.for = _id;
    _label.appendChild(_label_text);

    _div.appendChild(_value);
    _div.insertBefore(_label, _value);

    containerDiv.appendChild(_div);
}

module.exports = { showTransactionData, showLinkedTransactionData };