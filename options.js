/** global: chrome */
function save_options() {
    var api_key = document.getElementById('api_key').value;
    chrome.storage.sync.set({
        api_key: api_key
    }, function () {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 1500);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        api_key: ''
    }, function (items) {
        document.getElementById('api_key').value = items.api_key;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);