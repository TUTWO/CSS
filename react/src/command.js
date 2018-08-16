class Command {
    handler;
    constructor() {
        this.handler = {
            'initializeMap': function (e) {
                commander.send({ commandName: 'setUserControlOffsets', offsetWidth: 0, offsetHeight: 0 });
            }
        };
    }

    send(data) {
        postMessage({ topic: 'request', data }, "*");
    }

    receive(e) {
        if (e.data.data) {
            let name = e.data.data.commandName;
            let drawTypes = ["drawSymbol", "drawLine", "drawPolyline", "drawPolygon", "drawRectangle", "drawSquare", "drawPencil", "measure", "drawLabel", "drawArrow", "drawCallout"];
            if (drawTypes.indexOf(name) > -1 && e.data.data.featureId) {
                name = 'drawTypes';
            }
            commander.handler[name] && commander.handler[name](e.data.data);
        }
        return
    }

}
let commander = new Command();
window.addEventListener('message', commander.receive);

export default commander;
