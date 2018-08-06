import React from 'react';
import { Button } from 'react-bootstrap';

class PinTab extends React.Component {
    render() {
        let buttonStyle = {
            margin: '0 0 0 30px'
        };
        let radioStyle = {
            margin: '0 0 0 10px'
        };
        return (
            <div>
                <span style={buttonStyle}>Popup Content Type: </span>
                <input style={radioStyle} type="radio" name="choose" />Image
                <input style={radioStyle} type="radio" name="choose" />KeyValuePair
                <input style={radioStyle} type="radio" name="choose" />Html
                <input style={radioStyle} type="radio" name="choose" defaultChecked />None
                <input type="text" style={buttonStyle} />
                <Button bsStyle='info' style={buttonStyle}>Draw Pin Marker</Button>
            </div>
        )
    }
}

export default PinTab;