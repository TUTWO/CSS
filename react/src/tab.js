import React from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import DrawSymbol from './drawSymbol.js';
import ControlVisibility from './controlVisibility.js'
import Others from './others.js'
import PinTab from './pinTab.js';
import ExtentZoom from './extentZoom.js';
import DrawShape from './drawShape.js';

class ControlTabs extends React.Component {
    render() {
        let buttonStyle = {
            margin: '0 0 0 30px'
        };
        let divStyle = {
            margin: '20px 0 0 0'
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
                            <DrawShape />
                        </div>
                    </Tab>
                    <Tab eventKey={3} title='Draw Symbol'>
                        <div style={divStyle}>
                            <DrawSymbol />
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
                            <ControlVisibility />
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
