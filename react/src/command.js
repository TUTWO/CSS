import React from 'react';
import LeftPanel from './leftPanel.js';

class Command {
    handler;

    constructor() {
        this.handler = {
            // 'drawTypes': function (e) {
            // if (e.data.data.featureId) {
            //     itemsInfo.push(e.data.data);
            //     commander.send({
            //         commandName: 'addLabelToShape',
            //         labelStyle: {
            //             label: e.data.data.featureType + "label",
            //             fontSize: "14px",
            //             fontFamily: "Arial",
            //             fontWeight: "Bold",
            //             fontStyle: "normal",
            //             fontColor: "rgb(0,255,0)",
            //             labelOutlineColor: "rgb(255,255,255)",
            //             labelOutlineWidth: 2
            //         },
            //         featureIds: [e.data.data.featureId]
            //     });
            // }
            // },
            // 'initializeMap': function (e) {
            //     commander.send({ commandName: 'setUserControlOffsets', offsetWidth: 0, offsetHeight: 0 });
            // },
            'confirmDeleteFeatures': function (e) {
                if (confirm('Are you sure to delete those items?')) {
                    let idIndex = [];
                    commander.send({ commandName: 'deleteShapes', featureIds: e.data.data.featureIds });
                    for (let item of itemsInfo) {
                        for (let id of e.data.data.featureIds) {
                            if (item.featureId == id) {
                                idIndex.push(item);
                            }
                        }
                    }
                    for (let idItem of idIndex) {
                        let itemIndex = itemsInfo.indexOf(idItem);
                        itemsInfo.splice(itemIndex, 1);
                    }
                }
            }
        };

    }
    send(data) {
        postMessage({ topic: 'request', data }, "*");
    }

}

let commander = new Command();
global.itemsInfo = new Array();

function addItems(e) {
    if (e.data.data) {
        let name = e.data.data.commandName;
        let drawTypes = ["drawSymbol", "drawLine", "drawPolyline", "drawPolygon", "drawRectangle", "drawSquare", "drawPencil", "measure", "drawLabel", "drawArrow", "drawCallout"];
        if (drawTypes.indexOf(name) > -1) {
            name = 'drawTypes';
        }
        if (name === 'initializeMap'){
            commander.handler['initializeMap'] = (e) => {
                commander.send({ commandName: 'setUserControlOffsets', offsetWidth: 0, offsetHeight: 0 });
            }
        }
        commander.handler[name] && commander.handler[name](e);
        <LeftPanel item={e.data.data}/>
    }
}

// export default commander;

export { commander, addItems };
