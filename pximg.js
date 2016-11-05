var api_key = '';
var returnData = '';
chrome.storage.sync.get({
    api_key: ''
}, function (items) {
    api_key = items.api_key;
});

chrome.contextMenus.create(
    {
        "title": "Upload Image to PXIMG",
        "contexts": ["image"],
        "onclick": sendData
    }
);

function sendData(info) {
    // Set URL
    var url = "https://pximg.xyz/api/v2/images/url/";
    var iURL = info.srcUrl;
    console.info(api_key);

    // Setup POST variables
    var formData = new FormData();
    formData.append('api_key', api_key);
    formData.append('url', iURL);

    // Begin XHR POST request
    var x = new XMLHttpRequest();
    x.open('POST', url);
    x.responseType = 'json';
    x.onload = function () {
        pximg(x.response);
    };
    x.send(formData);
}

function pximg(response) {
    console.log(response);
    if (response.Status) {
        returnData = response.Response.url;
        console.info(returnData);
        chrome.notifications.create(
            "PXIMG",
            {
                type: "basic",
                title: "PXIMG",
                iconUrl: "icon_128x128.png",
                message: "Your image has been uploaded.\nClick to Copy."
            }
        );
        ctc(returnData);
    }
    else {
        alert(response.Response);
    }
}
function ctc(text) {
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
}