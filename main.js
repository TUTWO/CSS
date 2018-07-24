
document.getElementById("tabdiv").addEventListener("click", function (evt) {
    openTab(evt.target.name);
});

function openTab(menu) {
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        if (tabcontent[i].style.display === "block") {
            tabcontent[i].style.display = "none";
            break;
        }
    }
    document.getElementById(menu).style.display = "block";
}

function sendMessages(data) {
    postMessage({ topic: "request", data }, "*");
}

sendMessages({ "commandName": "initializeMap", "mapId": "map", "initializeConfigs": { "sourceProjection": "EPSG:4326", "mapProjection": "EPSG:4326", "layerSwitcher": [{ "name": "Base Maps", "type": "radio", "layers": [{ "name": "Hybrid", "relatedLayers": ["Satellite", "RoadMap"], "checked": true }, { "name": "Satellite", "relatedLayers": ["Satellite"] }, { "name": "Grid Pad", "relatedLayers": ["GridPad"] }, { "name": "Roads", "relatedLayers": ["RoadLayer"] }] }], "loadedLayers": ["Satellite", "RoadLayer", "RoadMap", "Plats", "GridPad", "Gps Track", "Gps LineLayer", "Pins", "EditOverlay", "SymbolAndLabel"], "editLayer": "EditOverlay", "editSymbolLabelLayer": "SymbolAndLabel", "selectionExclude": [], "allowedLayers": ["Satellite", "RoadLayer", "GridPad", "Aerial"], "backgroundColor": "#d3d3d3", "allowedControls": ["PanZoomBar", "MousePosition"], "groupingConfig": { "EnableGrouping": false, "MaximumShape": 20, "MaximumTiedown": 2 }, "drawStyle": { "fillColor": "#FFFFFF", "fillOpacity": 0.5, "strokeColor": "#0099FF", "strokeDashstyle": "solid", "strokeOpacity": 0.5, "strokeWidth": 1, "pointRadius": 6, "strokeLinecap": "square" }, "labelPlacementSetting": { "ajustForceDisplayItemOption": { "flip": true, "slide": true }, "ajustForceDisplayItemToPervertOverlap": true, "identicalShapeLengthProximityThresholdInFeet": 3, "identicalShapeLengthProximityThresholdInPixel": 7, "identicalShapeLengthProximityType": "Pixel", "identifyLabelAdjustPolylineLabel": true, "identifyLabelIgnoreValue": true, "shrinkXPixelForLabelToCaculateOverLap": 0 } } } )
setTimeout(() => {
    sendMessages({ commandName: 'setUserControlOffsets', offsetWidth: 0, offsetHeight: 0 } );
}, 1000);