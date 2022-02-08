const UP_HAND_EMOJI = String.fromCodePoint('0x1F446');
const DN_HAND_EMOJI = String.fromCodePoint('0x1F447');

const removeAllDivChildren = (div) => {
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }
}

const setCollapsibleTransactions = (title) => {
    const containerDiv = document.getElementById('container-data');
    const _collapse = document.createElement('BUTTON');
    const _divAll = document.createElement('DIV');
    const _collapse_className = 'collapsible';
    const _divAll_className = 'contents-div-all-transaction';

    _collapse.textContent = `${DN_HAND_EMOJI} ${title} ${DN_HAND_EMOJI}`;

    _collapse.className = _collapse_className;
    _divAll.className = _divAll_className;
    containerDiv.appendChild(_collapse);
    containerDiv.appendChild(_divAll);

    _collapse.addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;

        if (content.style.display === "block") {
            content.style.display = "none";
            _collapse.textContent = `${DN_HAND_EMOJI} ${title} ${DN_HAND_EMOJI}`;
        } else {
            content.style.display = "block";
            _collapse.textContent = `${UP_HAND_EMOJI} ${title} ${UP_HAND_EMOJI}`;
        }
    });

    return _divAll;
}

const setCollapsibleBytecode = (title, tag) => {
    const _containerDiv = document.getElementById('container-contents-bytecode');
    const _collapse = document.createElement('BUTTON');
    const _divAll = document.createElement('DIV');
    const _collapse_className = 'collapsible';
    const _divAll_className = `contents-div-all-${tag}`;

    _collapse.textContent = `${DN_HAND_EMOJI} ${title} ${DN_HAND_EMOJI}`;
    _collapse.style.margin = '4px';

    _divAll_className.background = '#777';

    _collapse.className = _collapse_className;
    _divAll.className = _divAll_className;

    _containerDiv.appendChild(_collapse);
    _containerDiv.appendChild(_divAll);

    _collapse.addEventListener("click", function () {
        this.classList.toggle("active");
        let _content = this.nextElementSibling;

        if (_content.style.display === "block") {
            _content.style.display = "none";
            _collapse.textContent = `${DN_HAND_EMOJI} ${title} ${DN_HAND_EMOJI}`;
        } else {
            _content.style.display = "block";
            _collapse.textContent = `${UP_HAND_EMOJI} ${title} ${UP_HAND_EMOJI}`;
        }
    });

    return _divAll;
}

module.exports = {
    removeAllDivChildren,
    setCollapsibleTransactions,
    setCollapsibleBytecode
};