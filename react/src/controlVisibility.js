import React from 'react';
import Command from './command.js';

class Controls extends React.Component {
    constructor(props){
        super(props);
        this.hideControls=this.hideControls.bind(this);
    }

    hideControls(e){
        Command.send({
            commandName: 'setControlsVisibility',
            controls: [{
                name: e.target.id,
                visible: e.target.checked
            }]
        });
    }

    render() {
        let inputStyle = {
            margin: '10px 0 0 30px'
        };
        return (
            <div>
                <input id='LayerSwitcher' type='checkbox' defaultChecked style={inputStyle} onClick={this.hideControls} />Layer Switcher
                <input id='CurrentLocation' type='checkbox' defaultChecked style={inputStyle} onClick={this.hideControls} />Current Location
                <input id='PanZoomBar' type='checkbox' defaultChecked style={inputStyle} onClick={this.hideControls} />Pan Zoom Bar
            </div>
        )
    }
}

export default Controls;