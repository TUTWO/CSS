class SendMessages {
    static send(data) {
        postMessage({ topic: 'request', data }, "*");
    }
}

export default SendMessages ;
