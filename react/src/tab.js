import React from 'react';
import { Tabs, Tab, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import SymbolImg from './symbolImg.js';
import DataTransmission from './dataTransmission.js';
import Controls from './controls.js'
import Others from './others.js'
import PinTab from './pinTab.js';
import ExtentZoom from './extentZoom.js';

class ControlTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawTypes: '',
            currentIndex: 0,
            drawIndex: -1,
            strokeColorVal: '#000000',
            fillColorVal: '#000000',
            strokeWidthVal: 1,
            isGray: false
        }
        this.selectType = this.selectType.bind(this);
        this.drawType = this.drawType.bind(this);
        this.setStrockColor = this.setStrockColor.bind(this);
        this.setFillColor = this.setFillColor.bind(this);
        this.setStrockWidth = this.setStrockWidth.bind(this);
        this.handelIsGray = this.handelIsGray.bind(this);
    };

    selectType(e) {
        let selectTypeIndex = ['select', 'lasso', 'selectAllFeatures'];
        let num = selectTypeIndex.indexOf(e.target.id);
        this.setState({ currentIndex: num });
        DataTransmission.send({ commandName: selectTypeIndex[num] });
    };

    drawType(e) {
        let drawTypeIndex = ['drawLine', 'drawPolyline', 'drawPolygon', 'drawRectangle', 'drawSquare', 'drawPencil', 'measure', 'drawLabel', 'drawArrow', 'drawCallout'];
        let num = drawTypeIndex.indexOf(e.target.id);
        this.setState({ drawIndex: num });
        this.state.drawTypes = drawTypeIndex[num];
        DataTransmission.send({
            commandName: drawTypeIndex[num],
            style: {
                fillColor: this.state.fillColorVal,
                fillOpacity: "0.5",
                strokeColor: this.state.strokeColorVal,
                strokeOpacity: "1",
                strokeWidth: this.state.strokeWidthVal
            }
        });

    };

    setStrockColor(e) {
        this.setState({ strokeColorVal: e.target.value });
        DataTransmission.send({
            commandName: this.state.drawTypes,
            style: {
                fillColor: this.state.fillColorVal,
                fillOpacity: "0.5",
                strokeColor: this.state.strokeColorVal,
                strokeOpacity: "1",
                strokeWidth: this.state.strokeWidthVal
            }
        });
    };

    setFillColor(e) {
        this.setState({ fillColorVal: e.target.value });
        DataTransmission.send({
            commandName: this.state.drawTypes,
            style: {
                fillColor: this.state.fillColorVal,
                fillOpacity: "0.5",
                strokeColor: this.state.strokeColorVal,
                strokeOpacity: "1",
                strokeWidth: this.state.strokeWidthVal
            }
        });
    };

    setStrockWidth(e) {
        this.setState({ strokeWidthVal: e.target.value });
        DataTransmission.send({
            commandName: this.state.drawTypes,
            style: {
                fillColor: this.state.fillColorVal,
                fillOpacity: "0.5",
                strokeColor: this.state.strokeColorVal,
                strokeOpacity: "1",
                strokeWidth: this.state.strokeWidthVal
            }
        });
    };

    handelIsGray() {
        this.setState({
            isGray: !this.state.isGray
        });
        DataTransmission.send({
            commandName: 'changeGrayScale',
            isGray: !this.state.isGray
        });
    };

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
        
        return (
            <div>
                <Tabs defaultActiveKey={3} id='uncontrolled-tab-example'>
                    <Tab eventKey={1} title='Extent|Zoom'>
                        <div style={divStyle}>
                            <ExtentZoom />
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
                            <input type='color' id='strokeColor' onBlur={this.setStrockColor} />
                            <span style={buttonStyle}>Fill: </span>
                            <input type='color' id='fillColor' onBlur={this.setFillColor} />
                            <span style={buttonStyle}>Stroke Width: </span>
                            <input type='number' min='1' max='10' defaultValue='1' id='strokeWidth' onBlur={this.setStrockWidth} />
                        </div>
                    </Tab>
                    <Tab eventKey={3} title='Draw Symbol'>
                        <div style={divStyle}>
                            <SymbolImg />
                        </div>
                    </Tab>
                    <Tab eventKey={4} title='Draw Pin'>
                        <div style={divStyle}>
                            <PinTab />
                        </div>
                    </Tab>
                    <Tab eventKey={5} title='WKT Shapes'>
                        <div style={divStyle}>
                            <span style={buttonStyle}>Shape WKT: </span>
                            <input />
                            <span style={buttonStyle}>Label WKT: </span>
                            <input />
                            <span style={buttonStyle}>Label: </span>
                            <input />
                        </div>
                    </Tab>
                    <Tab eventKey={6} title='Controls Visibility'>
                        <div style={divStyle}>
                            <Controls />
                        </div>
                    </Tab>
                    <Tab eventKey={7} title='GPS'>
                        <div style={divStyle}>
                            <Button bsStyle='info' style={buttonStyle} >Follow Me Start</Button>
                            <Button bsStyle='info' style={buttonStyle} >Get Gps Signal</Button>
                        </div>
                    </Tab>
                    <Tab eventKey={8} title='Others'>
                        <Others />
                    </Tab>
                </Tabs>
            </div>
        );
    };
}

export default ControlTabs;
