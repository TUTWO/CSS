import React from 'react';
import ControlTabs from './tab.js';
import SendMessages from './sendMesages.js';
import AddItems from './addItems.js';

class Initializelayout extends React.Component {
    render() {
        let tabStyle = {
            width: '100%',
            height: '120px',
            margin: '0 0 10px 0'
        };
        let mapStyle = {
            width: '80%',
            height: '800px',
            background: '#DDDDDD',
            float: 'right'
        };
        let leftStyle = {
            width: '20%',
            height: '800px',
            float: 'left'
        };
        let spanStyle = {
            font: '30px',
            margin:'0 0 20px 0',
            padding:'20px 0 0 0'
        };
        let imgStyle = {
            width: '26px',
            height: '26px',
            float: 'right',
            border: '1px solid rgb(70,184,218)',
            margin: '10px 0 0 0',
            display:'none'
        }
        let mapMessage = { "commandName": "initializeMap", "mapId": "map", "initializeConfigs": { "sourceProjection": "EPSG:4326", "mapProjection": "EPSG:4326", "layerSwitcher": [{ "name": "Base Maps", "type": "radio", "layers": [{ "name": "Hybrid", "relatedLayers": ["Satellite", "RoadMap"], "checked": true }, { "name": "Satellite", "relatedLayers": ["Satellite"] }, { "name": "Grid Pad", "relatedLayers": ["GridPad"] }, { "name": "Roads", "relatedLayers": ["RoadLayer"] }] }], "loadedLayers": ["Satellite", "RoadLayer", "RoadMap", "Plats", "GridPad", "Gps Track", "Gps LineLayer", "Pins", "EditOverlay", "SymbolAndLabel"], "editLayer": "EditOverlay", "editSymbolLabelLayer": "SymbolAndLabel", "selectionExclude": [], "allowedLayers": ["Satellite", "RoadLayer", "GridPad", "Aerial"], "backgroundColor": "#d3d3d3", "allowedControls": ["PanZoomBar", "MousePosition"], "groupingConfig": { "EnableGrouping": false, "MaximumShape": 20, "MaximumTiedown": 2 }, "drawStyle": { "fillColor": "#FFFFFF", "fillOpacity": 0.5, "strokeColor": "#0099FF", "strokeDashstyle": "solid", "strokeOpacity": 0.5, "strokeWidth": 1, "pointRadius": 6, "strokeLinecap": "square" }, "labelPlacementSetting": { "ajustForceDisplayItemOption": { "flip": true, "slide": true }, "ajustForceDisplayItemToPervertOverlap": true, "identicalShapeLengthProximityThresholdInFeet": 3, "identicalShapeLengthProximityThresholdInPixel": 7, "identicalShapeLengthProximityType": "Pixel", "identifyLabelAdjustPolylineLabel": true, "identifyLabelIgnoreValue": true, "shrinkXPixelForLabelToCaculateOverLap": 0 } } };
        return (
            <div>
                <div id='tab' style={tabStyle}>
                    <ControlTabs />
                </div>
                <div id='map' style={mapStyle}>
                    {SendMessages.send(mapMessage)}
                </div>
                <div id='leftPanelDiv' style={leftStyle}>
                    <span style={spanStyle}>Legend Items:</span>
                    <img id="deleteAll" style={imgStyle} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBgcIAhXUNwrhAAAAgklEQVQ4y6WUyQ3AIAwER3mlPvqglq2INmgn+UQICDhaxbywZ8XhA04ylUIiskShkjkhcz1LW1yNyVDbZidRR1Qo3XYl0RAvkAbHLNEUTSuntrjigKKz38EQX0k+8FiyzZA8fC2Z8INfZl7JfLT5rWbizNIwi88ub7uB7Ba1h4A5Zm48IyvwiWCRJwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNi0wN1QwODowMjoyMSswMjowMLOyTbsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDYtMDdUMDg6MDI6MjErMDI6MDDC7/UHAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="></img>
                    <div id='leftPanelDiv1'>
                        {window.addEventListener('message', AddItems)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Initializelayout;