import React, { useEffect, useState } from 'react';

const Popup: React.VFC = () => {
    const [greeting, setGreeting] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        chrome.storage.local.get(['greeting', 'title'], (result) => {
            setGreeting(result.greeting);
            setTitle(result.title);
        });
    }, []);

    const getTitle = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabId  =tabs[0].id;
            if(!tabId) {
                setTitle('NotTitle');
                return;
            }

            chrome.tabs.sendMessage(tabId, { type: 'getTitle' }, (response) => {
                chrome.storage.local.set({ title: response.title });
                setTitle(response.title);
            });
        });
    }

    return (
        <div style={{ width: '200px' }}>
            <div>
                {`${greeting} ｢${title}｣`}
            </div>

            <button onClick={getTitle}>タイトルを取得</button>
        </div>
    );
}

export default Popup;