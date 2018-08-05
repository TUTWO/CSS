import React from 'react';
import ControlTabs from './tab.js';
import DataTransmission from './dataTransmission.js';
import leftPanelItems from './leftPanelItems.js';

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
            float: 'left',
            border: ''
        };
        let spanStyle = {
            font: '30px',
            margin: '0 0 20px 0',
            padding: '20px 0 0 0'
        };
        let divStyle = {
            height: '50px',
            width: '100%'
        };
        let mapMessage = { "commandName": "initializeMap", "mapId": "map", "initializeConfigs": { "sourceProjection": "EPSG:4326", "mapProjection": "EPSG:4326", "layerSwitcher": [{ "name": "Base Maps", "type": "radio", "layers": [{ "name": "Hybrid", "relatedLayers": ["Satellite", "RoadMap"], "checked": true }, { "name": "Satellite", "relatedLayers": ["Satellite"] }, { "name": "Grid Pad", "relatedLayers": ["GridPad"] }, { "name": "Roads", "relatedLayers": ["RoadLayer"] }] }], "loadedLayers": ["Satellite", "RoadLayer", "RoadMap", "Plats", "GridPad", "Gps Track", "Gps LineLayer", "Pins", "EditOverlay", "SymbolAndLabel"], "editLayer": "EditOverlay", "editSymbolLabelLayer": "SymbolAndLabel", "selectionExclude": [], "allowedLayers": ["Satellite", "RoadLayer", "GridPad", "Aerial"], "backgroundColor": "#d3d3d3", "allowedControls": ["PanZoomBar", "MousePosition"], "groupingConfig": { "EnableGrouping": false, "MaximumShape": 20, "MaximumTiedown": 2 }, "drawStyle": { "fillColor": "#FFFFFF", "fillOpacity": 0.5, "strokeColor": "#0099FF", "strokeDashstyle": "solid", "strokeOpacity": 0.5, "strokeWidth": 1, "pointRadius": 6, "strokeLinecap": "square" }, "labelPlacementSetting": { "ajustForceDisplayItemOption": { "flip": true, "slide": true }, "ajustForceDisplayItemToPervertOverlap": true, "identicalShapeLengthProximityThresholdInFeet": 3, "identicalShapeLengthProximityThresholdInPixel": 7, "identicalShapeLengthProximityType": "Pixel", "identifyLabelAdjustPolylineLabel": true, "identifyLabelIgnoreValue": true, "shrinkXPixelForLabelToCaculateOverLap": 0 } } };

        return (
            <div>
                <div id='tab' style={tabStyle}>
                    <ControlTabs />
                </div>
                <div id='map' style={mapStyle}>
                    {DataTransmission.send(mapMessage)}
                </div>
                <div id='leftPanelDiv' style={leftStyle}>
                    <div id='leftHead' style={divStyle}>
                        <span style={spanStyle}>Legend Items:</span>
                    </div>
                    <div id='leftPanelDiv1'>
                        {window.addEventListener('message', leftPanelItems)}
                    </div>
                </div>
            </div>
        );
    };
}

export default Initializelayout;