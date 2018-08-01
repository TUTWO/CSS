import React from 'react';
import ReactDOM from 'react-dom';

function SendMessages(props) {
    postMessage({ topic: 'request', data: props.data }, "*");
    setTimeout(() => {
        postMessage({ topic: "request", data: { commandName: 'setUserControlOffsets', offsetWidth: 0, offsetHeight: 0 } }, "*");
    }, 1000);
    return <div id='map'></div>
}

export default SendMessages;
