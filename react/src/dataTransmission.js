class DataTransmission {
    static send(data) {
        postMessage({ topic: 'request', data }, "*");
    };
}

export default DataTransmission ;
