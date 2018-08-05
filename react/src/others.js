import React from 'react';
import { Button } from 'react-bootstrap';
import DataTransmission from './dataTransmission.js';

class Others extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGray: false
        }
        this.handelIsGray = this.handelIsGray.bind(this);
    }
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
        let textareaStyle = {
            margin: '10px 0 0 30px'
        };
        return (
            <div>
                <Button bsStyle='info' style={buttonStyle} onClick={this.handelIsGray} >{this.state.isGray ? 'Change Back' : 'Change To Gray'}</Button>
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
        )
    }
}
export default Others;