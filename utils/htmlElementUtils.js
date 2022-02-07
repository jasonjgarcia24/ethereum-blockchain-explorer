const removeAllDivChildren = (div) => {
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }
}

module.exports = { removeAllDivChildren };