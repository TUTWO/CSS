import React from 'react';
import ReactDOM from 'react-dom';
import DataTransmission from './dataTransmission.js'

let itemsInfo = new Array();

function AddItems(e) {
    if (e.data.data) {
        let name = e.data.data.commandName;
        let drawTypes = ["drawSymbol", "drawLine", "drawPolyline", "drawPolygon", "drawRectangle", "drawSquare", "drawPencil", "measure", "drawLabel", "drawArrow", "drawCallout"];
        if (drawTypes.indexOf(name) > -1) {
            name = 'drawTypes';
        }
        handler[name] && handler[name](e);
    }
}

let imgStyle = {
    width: '26px',
    height: '26px',
    float: 'right',
    border: '1px solid rgb(70,184,218)',
    margin: '10px 0 0 0'
};
let divStyle = {
    height: '50px',
    width: '100%',
    border: '1px solid gray'
};
let spanStyle = {
    margin: '15px 0 0 0'
};
let imgStyles = {
    width: '26px',
    height: '26px',
    float: 'right',
    border: '1px solid rgb(70,184,218)',
    margin: '10px 0 0 0'
};

let handler = {
    'drawTypes': function (e) {
        if (e.data.data.featureId) {
            if (document.getElementById('deleteAll')) {
                document.getElementById('deleteAll').style.display = 'block';
            }
            itemsInfo.push(e.data.data);
            DataTransmission.send({
                commandName: 'addLabelToShape',
                labelStyle: {
                    label: e.data.data.featureType + "label",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    fontWeight: "Bold",
                    fontStyle: "normal",
                    fontColor: "rgb(0,255,0)",
                    labelOutlineColor: "rgb(255,255,255)",
                    labelOutlineWidth: 2
                },
                featureIds: [e.data.data.featureId]
            });
            itemsRender(e);

            let imgElement = (
                <div>
                    <span>Legend Items:</span>
                    <img id="deleteAll" onClick={deleteAllItems} style={imgStyles} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBgcIAhXUNwrhAAAAgklEQVQ4y6WUyQ3AIAwER3mlPvqglq2INmgn+UQICDhaxbywZ8XhA04ylUIiskShkjkhcz1LW1yNyVDbZidRR1Qo3XYl0RAvkAbHLNEUTSuntrjigKKz38EQX0k+8FiyzZA8fC2Z8INfZl7JfLT5rWbizNIwi88ub7uB7Ba1h4A5Zm48IyvwiWCRJwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNi0wN1QwODowMjoyMSswMjowMLOyTbsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDYtMDdUMDg6MDI6MjErMDI6MDDC7/UHAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="></img>
                </div>
            );
            ReactDOM.render(imgElement, document.getElementById('leftHead'));
        }
    },
    'initializeMap': function (e) {
        DataTransmission.send({ commandName: 'setUserControlOffsets', offsetWidth: 0, offsetHeight: 0 });
    },
    'confirmDeleteFeatures': function (e) {
        if (confirm('Are you sure to delete those items?')) {
            let idIndex = [];
            DataTransmission.send({ commandName: 'deleteShapes', featureIds: e.data.data.featureIds });
            itemsInfo.forEach((item => {
                e.data.data.featureIds.forEach((id => {
                    if (item.featureId === id) {
                        idIndex.push(item);
                    }
                }));
            }));
            idIndex.forEach((idItem => {
                let itemIndex = itemsInfo.indexOf(idItem);
                itemsInfo.splice(itemIndex, 1);
            }));
            itemsRender(e);
            if (document.getElementById('leftPanelDiv1').childElementCount === 0) {
                document.getElementById('deleteAll').style.display = 'none';
            }
        }
    }
}

function itemsRender(e) {
    let element = [];
    let i = 0;
    itemsInfo.forEach((item => {
        let feature = item.featureId.split('-').pop();
        element[i] = (
            <div id={item.featureId} style={divStyle} key={feature}>
                <input type='checkbox' style={spanStyle} defaultChecked onClick={hideItems} />
                <span style={spanStyle} onMouseEnter={enlargeItems} onMouseLeave={shrinkItems}>{item.featureType}:{feature}</span>
                <img className="delete" onClick={deleteItems.bind(e, item)} style={imgStyle} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBgcFGi7v/+jPAAAA7ElEQVQ4y+3ToU4DURCF4Y+mJSBINhjIhvAAVaxBYHAVfYMiICFIDHgUGodG1FDJS/AAGBJALEkFBLFt0kAhgYKATXc3XQIazqiZOf/MvWLIa8PIeybebOYN1QLQkDjO5Lua2pOAqroK5g2cZfpbAisYufQ6Loe6uYdMiq5wvKFlScuzcs041XKUAnOo+U61L1fm020/0hQILLtw6KTEte3Aqhv9dEMfJG5NCz14soh7sxbceZGg++mqFGbVxRro6GBdLMobKn6pf+CvAMWbvhKJsQPORa4nA0OPmoKSsWuGBsXinl7pPffsp7YPfidSD8s2u0MAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMDdUMDU6MjY6NDYrMDI6MDCm0QN3AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTA3VDA1OjI2OjQ2KzAyOjAw14y7ywAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="></img>
                <img className="zoomTo" onClick={zoomToItems} style={imgStyle} src="data:image/png;base64,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"></img>
            </div>
        );
        i++;
    }));
    ReactDOM.render(element, document.getElementById('leftPanelDiv1'));
}

function hideItems(e) {
    let commandName = e.target.checked ? 'showFeature' : 'hideFeature';
    DataTransmission.send({ commandName, featureIds: [e.target.parentElement.id] });
}

function enlargeItems(e) {
    DataTransmission.send({ commandName: 'highlightFeature', featureId: e.target.parentElement.id, color: '#00FFFF' });
}

function shrinkItems(e) {
    DataTransmission.send({ commandName: 'highlightFeature', featureId: e.target.parentElement.id, color: undefined });
}

function deleteItems(item, e) {
    if (confirm('Are you sure to delete this item?')) {
        DataTransmission.send({ commandName: 'deleteShapes', featureIds: [e.target.parentElement.id] });
        let itemIndex = itemsInfo.indexOf(item);
        itemsInfo.splice(itemIndex, 1);
        let itemsNum = e.target.parentElement.parentElement.childElementCount;
        if (itemsNum === 1) {
            document.getElementById('deleteAll').style.display = 'none';
        }
        itemsRender();
    }
}

function zoomToItems(e) {
    DataTransmission.send({ commandName: 'centerOnShape', featureId: e.target.parentElement.id });
}

function deleteAllItems() {
    if (confirm('Are you sure to delete All items ?')) {
        itemsInfo.forEach((item) => {
            DataTransmission.send({ commandName: 'deleteShapes', featureIds: [item.featureId] });
        });
        itemsInfo = [];
        let element = (<div></div>);
        ReactDOM.render(element, document.getElementById('leftPanelDiv1'));
        document.getElementById('deleteAll').style.display = 'none';
    }
}

export default AddItems; 