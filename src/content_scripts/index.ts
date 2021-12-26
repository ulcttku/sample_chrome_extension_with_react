chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.type !== 'getTitle') return;

    sendResponse({
        title: document.querySelector('title').innerText,
    })
})