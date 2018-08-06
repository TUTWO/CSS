import React from 'react';
import { Button } from 'react-bootstrap';
import { commander } from './command.js'

class ExtentZoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 15, point: '-77.02631, 38.89214',
            extent: '26.453037695312474,41.20112467348213,27.936191992187474,41.89179281406524',
        }
        this.sendZoomCenter = this.sendZoomCenter.bind(this);
        this.getZoom = this.getZoom.bind(this);
        this.getCenter = this.getCenter.bind(this);
        this.setExtent = this.setExtent.bind(this);
        this.getExtent = this.getExtent.bind(this);
    }

    sendZoomCenter() {
        let [x, y] = this.state.point.split(',');
        commander.send({
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
        commander.send({
            commandName: 'setExtent',
            extent: this.state.extent
        });
    }

    getExtent(e) {
        this.state.extent = e.target.value;
    }

    render() {
        let buttonStyle = {
            margin: '0 0 0 30px'
        };
        let inputStyle = {
            margin: '0 0 0 30px',
            width: '350px'
        };
        const number = [];
        for (let i = 0; i < 15; i++) {
            number[i] = i + 1;
        }
        const listItems = number.map((number) =>
            <option key={number}>{number}</option>
        )
        return (
            <div>
                <Button bsStyle='info' style={buttonStyle} >Zoom to all shapes</Button>
                <select style={buttonStyle} defaultValue={15} onClick={this.getZoom}>
                    {listItems}
                </select>
                <input style={buttonStyle} defaultValue='-77.02631, 38.89214' onClick={this.getCenter} />
                <Button bsStyle='info' style={buttonStyle} onClick={this.sendZoomCenter}>Set zoom and center</Button>
                <input style={inputStyle} defaultValue='26.453037695312474,41.20112467348213,27.936191992187474,41.89179281406524' onClick={this.getExtent} />
                <Button bsStyle='info' style={buttonStyle} onClick={this.setExtent}>Set extent</Button>
            </div>
        )
    }
}

export default ExtentZoom;