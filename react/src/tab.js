import React from 'react';
import { Tabs, Tab, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import Imgs from './img.js';

class ControlTabs extends React.Component {
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
        let textareaStyle={
            margin:'10px 0 0 30px'
        };
        return (
            <div>
                <Tabs defaultActiveKey={3} id='uncontrolled-tab-example'>
                    <Tab eventKey={1} title='Extent|Zoom'>
                        <div style={divStyle}>
                            <Button bsStyle='info' style={buttonStyle} >Zoom to all shapes</Button>
                            <select style={buttonStyle}>
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
                            <input style={buttonStyle} defaultValue='-77.02631, 38.89214' />
                            <Button bsStyle='info' style={buttonStyle} >Set zoom and center</Button>
                            <input style={inputStyle} defaultValue='26.453037695312474,41.20112467348213,27.936191992187474,41.89179281406524' />
                            <Button bsStyle='info' style={buttonStyle}>Set extent</Button>
                        </div>
                    </Tab>
                    <Tab eventKey={2} title='Draw Shape'>
                        <div style={divStyle}>
                            <DropdownButton bsStyle='info' title='Select' id='selectType' style={buttonStyle}>
                                <MenuItem eventKey="1" active>Select</MenuItem>
                                <MenuItem eventKey="2">Lasso</MenuItem>
                                <MenuItem eventKey="3">Select All</MenuItem>
                            </DropdownButton>
                            <DropdownButton bsStyle='info' title='Draw' id='drawType' style={buttonStyle}>
                                <MenuItem eventKey="1">Draw Line</MenuItem>
                                <MenuItem eventKey="2">Draw Polyline</MenuItem>
                                <MenuItem eventKey="3">Draw Polygon</MenuItem>
                                <MenuItem eventKey="4">Draw Rectangle</MenuItem>
                                <MenuItem eventKey="5">Draw Square</MenuItem>
                                <MenuItem eventKey="6">Draw Pencil</MenuItem>
                                <MenuItem eventKey="7">Measure</MenuItem>
                                <MenuItem eventKey="8">Draw Label</MenuItem>
                                <MenuItem eventKey="9">Draw Arrow</MenuItem>
                                <MenuItem eventKey="10">Draw Callout</MenuItem>
                            </DropdownButton>
                            <Button bsStyle='info' style={buttonStyle}>Slice</Button>
                            <span style={buttonStyle}>Stroke: </span>
                            <input type='color' />
                            <span style={buttonStyle}>Fill: </span>
                            <input type='color' />
                            <span style={buttonStyle}>Stroke Width: </span>
                            <input type='number' min='1' max='10' defaultValue='1' />
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
