const networkLinks = document.getElementsByClassName('link-network');
const networkButton = document.getElementById('dropdown-button');

const setNetwork = (new_network) => {
    [...networkLinks].map(network => {
        network.onclick = switchNetworkCallback
    });

    networkButton.onclick = buttonCallback;

    mapURL(new_network.toLowerCase());
}

function setNetworkCookie(network) {
    document.cookie = `network=${network};path=/`
}

function getNetworkCookie() {
    return document.cookie.split(';')[0].split('network=')[1];
}

const mapURL = (new_network) => {
    const _selectedNetwork = document.getElementsByClassName(`link-network-${new_network}`)[0];
    const _location = window.location;
    const [_, _current_network, ..._params] = _location.pathname.split('/');
    const _new_path = `${window.location.origin}/${new_network}/${_params.join('/')}`

    if (new_network !== _current_network) {
        setNetworkCookie(new_network);
        history.pushState('', '', _new_path);
    }

    networkButton.textContent = _selectedNetwork.textContent;

    return;
}

/* Dropdown menu callback */
const switchNetworkCallback = (objEvent) => {
    mapURL(objEvent.target.name)
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function buttonCallback() {
    document.getElementById("dropdown-network").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropdown-button')) {
        var dropdowns = document.getElementsByClassName("dropdown-network");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

module.exports = { setNetwork, getNetworkCookie };