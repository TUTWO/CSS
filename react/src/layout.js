import React from 'react';
import ControlTabs from './tab.js';
import commander from './command.js';
import LeftPanel from './leftPanel.js';
import { Button } from 'react-bootstrap';
import $ from 'jquery';

global.saveInfos = [];
global.saveLabels = [];
class Initializelayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shapes: [],
            labels: []
        }
        this.saveFeatures = this.saveFeatures.bind(this);
        this.recoverFeatures = this.recoverFeatures.bind(this);
    }

    componentDidMount() {
        let mapMessage = { "commandName": "initializeMap", "mapId": "map", "initializeConfigs": { "sourceProjection": "EPSG:4326", "mapProjection": "EPSG:4326", "layerSwitcher": [{ "name": "Base Maps", "type": "radio", "layers": [{ "name": "Hybrid", "relatedLayers": ["Satellite", "RoadMap"], "checked": true }, { "name": "Satellite", "relatedLayers": ["Satellite"] }, { "name": "Grid Pad", "relatedLayers": ["GridPad"] }, { "name": "Roads", "relatedLayers": ["RoadLayer"] }] }], "loadedLayers": ["Satellite", "RoadLayer", "RoadMap", "Plats", "GridPad", "Gps Track", "Gps LineLayer", "Pins", "EditOverlay", "SymbolAndLabel"], "editLayer": "EditOverlay", "editSymbolLabelLayer": "SymbolAndLabel", "selectionExclude": [], "allowedLayers": ["Satellite", "RoadLayer", "GridPad", "Aerial"], "backgroundColor": "#d3d3d3", "allowedControls": ["PanZoomBar", "MousePosition"], "groupingConfig": { "EnableGrouping": false, "MaximumShape": 20, "MaximumTiedown": 2 }, "drawStyle": { "fillColor": "#FFFFFF", "fillOpacity": 0.5, "strokeColor": "#0099FF", "strokeDashstyle": "solid", "strokeOpacity": 0.5, "strokeWidth": 1, "pointRadius": 6, "strokeLinecap": "square" }, "labelPlacementSetting": { "ajustForceDisplayItemOption": { "flip": true, "slide": true }, "ajustForceDisplayItemToPervertOverlap": true, "identicalShapeLengthProximityThresholdInFeet": 3, "identicalShapeLengthProximityThresholdInPixel": 7, "identicalShapeLengthProximityType": "Pixel", "identifyLabelAdjustPolylineLabel": true, "identifyLabelIgnoreValue": true, "shrinkXPixelForLabelToCaculateOverLap": 0 } } };
        commander.send(mapMessage);
    }

    saveFeatures() {
        let url = location.search; //获取url中"?"符后的字串
        let theRequest;
        if (url.indexOf("?") != -1) {
            let str = url.substr(1);
            theRequest = str.split("=")[1];
        }
        $.post('/saveToJson', {
            user: JSON.stringify(
                {
                    user: theRequest,
                    infos: global.saveInfos,
                    labels: global.saveLabels
                }
            )
        }, function (data) {
            alert(data);
        })
    }
    recoverFeatures() {
        let url = location.search; //获取url中"?"符后的字串
        let theRequest;
        let shapes = [];
        let labels = [];
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            theRequest = str.split("=")[1];
        }
        $.post('/readFromJson', {
            user: theRequest
        }, function (data) {
            // alert(JSON.stringify(data));
            labels = data['labels'];
            shapes = data['infos'];
        })
        this.setState({
            shapes: shapes,
            labels: labels
        })
    }
    render() {
        let tabStyle = {
            width: '100%',
            height: '120px',
            margin: '0 0 10px 0'
        }
        let mapStyle = {
            width: '80%',
            height: '800px',
            background: '#DDDDDD',
            float: 'right'
        }
        let leftStyle = {
            width: '20%',
            height: '800px',
            float: 'left',
            border: ''
        }
        let saveButton = {
            float: 'right',
            position: 'fixed',
            right: '70px',
            top: '60px'
        }
        return (
            <div>
                <div id='tab' style={tabStyle}>
                    <ControlTabs />
                    <div style={saveButton}>
                        <Button bsStyle='warning' onClick={this.saveFeatures} >Save</Button>
                        <Button bsStyle='warning' onClick={this.recoverFeatures} >Recover</Button>
                    </div>
                </div>
                <div id='map' style={mapStyle}>
                </div>
                <div id='leftPanelDiv' style={leftStyle}>
                    <LeftPanel shapes={this.state.shapes} labels={this.state.labels} />
                </div>
            </div>
        );
    };
}

export { Initializelayout, saveInfos };