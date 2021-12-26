import React, { useEffect, useState } from 'react';

const Popup: React.VFC = () => {
    const [greeting, setGreeting] = useState('');
    useEffect(() => {
        chrome.storage.local.get(['greeting'], (result) => {
            setGreeting(result.greeting);
        });
    }, []);

    return (
        <div style={{ width: '200px' }}>
            {greeting} Chrome Extensions
        </div>
    );
}

export default Popup;