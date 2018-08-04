import React from 'react';
import { Tabs, Tab, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import Imgs from './img.js';
import SendMessages from './sendMesages.js';

class ControlTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawTypes: '',
            currentIndex: 0,
            drawIndex: -1,
            zoom: 15, point: '-77.02631, 38.89214',
            extent: '26.453037695312474,41.20112467348213,27.936191992187474,41.89179281406524',
            strokeColorVal: '#000000',
            fillColorVal: '#000000',
            strokeWidthVal: 1
        }
        this.sendZoomCenter = this.sendZoomCenter.bind(this);
        this.getZoom = this.getZoom.bind(this);
        this.getCenter = this.getCenter.bind(this);
        this.setExtent = this.setExtent.bind(this);
        this.getExtent = this.getExtent.bind(this);
        this.selectType = this.selectType.bind(this);
        this.drawType = this.drawType.bind(this);
        this.setStrockColor = this.setStrockColor.bind(this);
        this.setFillColor = this.setFillColor.bind(this);
        this.setStrockWidth = this.setStrockWidth.bind(this);
    }
    sendZoomCenter() {
        let [x, y] = this.state.point.split(',');
        SendMessages.send({
            commandName: 'setExtent',
            zoomLevel: this.state.zoom,
            centerPoint: {
                x: +x,
                y: +y
            }
        });
    }
    getZoom(e) {
        this.state.zoom = e.target.value;
    }
    getCenter(e) {
        this.state.point = e.target.value;
    }
    setExtent() {
        SendMessages.send({
            commandName: 'setExtent',
            extent: this.state.extent
        });
    }
    getExtent(e) {
        this.state.extent = e.target.value;
    }
    selectType(e) {
        let selectTypeIndex = ['select', 'lasso', 'selectAllFeatures'];
        let num = selectTypeIndex.indexOf(e.target.id);
        this.setState({ currentIndex: num });
        SendMessages.send({ commandName: selectTypeIndex[num] });
    }
    drawType(e) {
        let drawTypeIndex = ['drawLine', 'drawPolyline', 'drawPolygon', 'drawRectangle', 'drawSquare', 'drawPencil', 'measure', 'drawLabel', 'drawArrow', 'drawCallout'];
        let num = drawTypeIndex.indexOf(e.target.id);
        this.setState({ drawIndex: num });
        this.state.drawTypes = drawTypeIndex[num];
        SendMessages.send({
            commandName: drawTypeIndex[num],
            style: {
                fillColor: this.state.fillColorVal,
                fillOpacity: "0.5",
                strokeColor: this.state.strokeColorVal,
                strokeOpacity: "1",
                strokeWidth: this.state.strokeWidthVal
            }
        });
    }
    setStrockColor(e) {
        this.setState({ strokeColorVal: e.target.value });
        SendMessages.send({
            commandName: this.state.drawTypes,
            style: {
                fillColor: this.state.fillColorVal,
                fillOpacity: "0.5",
                strokeColor: this.state.strokeColorVal,
                strokeOpacity: "1",
                strokeWidth: this.state.strokeWidthVal
            }
        });
    }
    setFillColor(e) {
        this.setState({ fillColorVal: e.target.value });
        SendMessages.send({
            commandName: this.state.drawTypes,
            style: {
                fillColor: this.state.fillColorVal,
                fillOpacity: "0.5",
                strokeColor: this.state.strokeColorVal,
                strokeOpacity: "1",
                strokeWidth: this.state.strokeWidthVal
            }
        });
    }
    setStrockWidth(e) {
        this.setState({ strokeWidthVal: e.target.value });
        SendMessages.send({
            commandName: this.state.drawTypes,
            style: {
                fillColor: this.state.fillColorVal,
                fillOpacity: "0.5",
                strokeColor: this.state.strokeColorVal,
                strokeOpacity: "1",
                strokeWidth: this.state.strokeWidthVal
            }
        });
    }
    render() {
        let buttonStyle = {
            margin: '0 0 0 30px'
        };
        let divStyle = {
            margin: '20px 0 0 0'
        };
        let inputStyle = {
            margin: '0 0 0 30px',
            width: '350px'
        };
        let radioStyle = {
            margin: '0 0 0 10px'
        };
        let textareaStyle = {
            margin: '10px 0 0 30px'
        };
        return (
            <div>
                <Tabs defaultActiveKey={3} id='uncontrolled-tab-example'>
                    <Tab eventKey={1} title='Extent|Zoom'>
                        <div style={divStyle}>
                            <Button bsStyle='info' style={buttonStyle} >Zoom to all shapes</Button>
                            <select style={buttonStyle} defaultValue={15} onClick={this.getZoom}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                            </select>
                            <input style={buttonStyle} defaultValue='-77.02631, 38.89214' onClick={this.getCenter} />
                            <Button bsStyle='info' style={buttonStyle} onClick={this.sendZoomCenter}>Set zoom and center</Button>
                            <input style={inputStyle} defaultValue='26.453037695312474,41.20112467348213,27.936191992187474,41.89179281406524' onClick={this.getExtent} />
                            <Button bsStyle='info' style={buttonStyle} onClick={this.setExtent}>Set extent</Button>
                        </div>
                    </Tab>
                    <Tab eventKey={2} title='Draw Shape'>
                        <div style={divStyle}>
                            <DropdownButton bsStyle='info' title='Select' id='selectType' style={buttonStyle}>
                                <MenuItem eventKey="1" id='select' className={this.state.currentIndex == 0 ? 'active' : ''} onClick={this.selectType}>Select</MenuItem>
                                <MenuItem eventKey="2" id='lasso' className={this.state.currentIndex == 1 ? 'active' : ''} onClick={this.selectType}>Lasso</MenuItem>
                                <MenuItem eventKey="3" id='selectAllFeatures' className={this.state.currentIndex == 2 ? 'active' : ''} onClick={this.selectType}>Select All</MenuItem>
                            </DropdownButton>
                            <DropdownButton bsStyle='info' title='Draw' id='drawType' style={buttonStyle}>
                                <MenuItem eventKey="1" id='drawLine' className={this.state.drawIndex == 0 ? 'active' : ''} onClick={this.drawType}>Draw Line</MenuItem>
                                <MenuItem eventKey="2" id='drawPolyline' className={this.state.drawIndex == 1 ? 'active' : ''} onClick={this.drawType}>Draw Polyline</MenuItem>
                                <MenuItem eventKey="3" id='drawPolygon' className={this.state.drawIndex == 2 ? 'active' : ''} onClick={this.drawType}>Draw Polygon</MenuItem>
                                <MenuItem eventKey="4" id='drawRectangle' className={this.state.drawIndex == 3 ? 'active' : ''} onClick={this.drawType}>Draw Rectangle</MenuItem>
                                <MenuItem eventKey="5" id='drawSquare' className={this.state.drawIndex == 4 ? 'active' : ''} onClick={this.drawType}>Draw Square</MenuItem>
                                <MenuItem eventKey="6" id='drawPencil' className={this.state.drawIndex == 5 ? 'active' : ''} onClick={this.drawType}>Draw Pencil</MenuItem>
                                <MenuItem eventKey="7" id='measure' className={this.state.drawIndex == 6 ? 'active' : ''} onClick={this.drawType}>Measure</MenuItem>
                                <MenuItem eventKey="8" id='drawLabel' className={this.state.drawIndex == 7 ? 'active' : ''} onClick={this.drawType}>Draw Label</MenuItem>
                                <MenuItem eventKey="9" id='drawArrow' className={this.state.drawIndex == 8 ? 'active' : ''} onClick={this.drawType}>Draw Arrow</MenuItem>
                                <MenuItem eventKey="10" id='drawCallout' className={this.state.drawIndex == 9 ? 'active' : ''} onClick={this.drawType}>Draw Callout</MenuItem>
                            </DropdownButton>
                            <Button bsStyle='info' style={buttonStyle}>Slice</Button>
                            <span style={buttonStyle}>Stroke: </span>
                            <input type='color' id='strokeColor' onClick={this.setStrockColor} />
                            <span style={buttonStyle}>Fill: </span>
                            <input type='color' id='fillColor' onBlur={this.setFillColor} />
                            <span style={buttonStyle}>Stroke Width: </span>
                            <input type='number' min='1' max='10' defaultValue='1' id='strokeWidth' onBlur={this.setStrockWidth} />
                        </div>
                    </Tab>
                    <Tab eventKey={3} title='Draw Symbol'>
                        <div style={divStyle}>
                            <Imgs />
                        </div>
                    </Tab>
                    <Tab eventKey={4} title='Draw Pin'>
                        <div style={divStyle}>
                            <span style={buttonStyle}>Popup Content Type: </span>
                            <input style={radioStyle} type="radio" name="choose" />Image
                            <input style={radioStyle} type="radio" name="choose" />KeyValuePair
                            <input style={radioStyle} type="radio" name="choose" />Html
                            <input style={radioStyle} type="radio" name="choose" defaultChecked />None
                            <input type="text" style={buttonStyle} />
                            <Button bsStyle='info' style={buttonStyle}>Draw Pin Marker</Button>
                        </div>
                    </Tab>
                    <Tab eventKey={5} title='WKT Shapes'>
                        <div style={divStyle}>
                            <span style={buttonStyle} >Shape WKT: </span>
                            <input />
                            <span style={buttonStyle}>Label WKT: </span>
                            <input />
                            <span style={buttonStyle}>Label: </span>
                            <input />
                        </div>
                    </Tab>
                    <Tab eventKey={6} title='Controls Visibility'>
                        <div style={divStyle}>
                            <input type='checkbox' defaultChecked style={buttonStyle} />Layer Switcher
                            <input type='checkbox' defaultChecked style={buttonStyle} />Current Location
                            <input type='checkbox' defaultChecked style={buttonStyle} />Pan Zoom Bar
                        </div>
                    </Tab>
                    <Tab eventKey={7} title='GPS'>
                        <div style={divStyle}>
                            <Button bsStyle='info' style={buttonStyle} >Follow Me Start</Button>
                            <Button bsStyle='info' style={buttonStyle} >Get Gps Signal</Button>
                        </div>
                    </Tab>
                    <Tab eventKey={8} title='Others'>
                        <div>
                            <Button bsStyle='info' style={buttonStyle} >Change To Gary</Button>
                            <input style={buttonStyle} />
                            <Button bsStyle='info' style={buttonStyle} >Update Loading Logo</Button>
                            <input style={buttonStyle} type='number' step='0.1' min='0.1' max='1' defaultValue='1' />
                            <Button bsStyle='info' style={buttonStyle} >Set Transparent</Button>
                            <Button bsStyle='info' style={buttonStyle} >Reset Transparent</Button>
                            <textarea style={textareaStyle}></textarea>
                            <select style={buttonStyle}>
                                <option>panZoomBarStyle</option>
                                <option>snapping</option>
                                <option>pinGroupZoomLevel</option>
                            </select>
                            <Button bsStyle='info' style={buttonStyle} >Update Map Config</Button>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default ControlTabs;
