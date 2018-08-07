import React from 'react';
import LeftPanel from './leftPanel.js';
import ReactDOM from 'react-dom';

class Command {
    handler;
    constructor() {
        this.handler = {
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

    receive(e) {
        if (e.data.data) {
            let name = e.data.data.commandName;
            let drawTypes = ["drawSymbol", "drawLine", "drawPolyline", "drawPolygon", "drawRectangle", "drawSquare", "drawPencil", "measure", "drawLabel", "drawArrow", "drawCallout"];
            if (drawTypes.indexOf(name) > -1) {
                name = 'drawTypes';
            }
            if (name === 'initializeMap') {
                commander.handler['initializeMap'] = (e) => {
                    commander.send({ commandName: 'setUserControlOffsets', offsetWidth: 0, offsetHeight: 0 });
                }
            } else if (name === 'drawTypes') {
                if (e.data.data.featureId) {
                    // <LeftPanel item={e.data.data} />
                    ReactDOM.render(<LeftPanel item={e.data.data} />, document.getElementById('leftPanelDiv'));
                }
            }
            commander.handler[name] && commander.handler[name](e);
    
        }
        return
    }

}

let commander = new Command();

// function receive(e) {
//     if (e.data.data) {
//         let name = e.data.data.commandName;
//         let drawTypes = ["drawSymbol", "drawLine", "drawPolyline", "drawPolygon", "drawRectangle", "drawSquare", "drawPencil", "measure", "drawLabel", "drawArrow", "drawCallout"];
//         if (drawTypes.indexOf(name) > -1) {
//             name = 'drawTypes';
//         }
//         if (name === 'initializeMap') {
//             commander.handler['initializeMap'] = (e) => {
//                 commander.send({ commandName: 'setUserControlOffsets', offsetWidth: 0, offsetHeight: 0 });
//             }
//         } else if (name === 'drawTypes') {
//             if (e.data.data.featureId) {
//                 // <LeftPanel item={e.data.data} />
//                 // ReactDOM.render(<LeftPanel item={e.data.data} />, document.getElementById('leftPanelDiv'));
//                 LeftPanel.setItemsInfo(e.data.data);
//             }
//         }
//         commander.handler[name] && commander.handler[name](e);

//     }
//     return
// }

export { commander };
