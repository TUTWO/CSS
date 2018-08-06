import React from 'react';
import ListItems from './listItems.js';
import { commander } from './command.js';

class LeftPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
            itemsInfos: []
            // itemsNum: global.itemsInfo.length
        };
        this.deleteAllItems = this.deleteAllItems.bind(this);
        if (props.item) {
            commander.handler["drawTypes"] = () => {
                this.state.itemsInfos.push(this.state.item);
                this.setState({ itemsInfos: this.state.itemsInfos });
            };
        }
    }
    deleteAllItems() {
        if (confirm('Are you sure to delete All items ?')) {
            for (let item of global.itemsInfo) {
                commander.send({ commandName: 'deleteShapes', featureIds: [item.featureId] });
            }
        }
        global.itemsInfo = [];
    }
    // componentDidMount() {
    //     this.timerID = setInterval(() => { this.tick() }, 100);
    // }
    // componentWillMount() {
    //     clearInterval(this.timerID);
    // }
    // tick() {
    //     this.setState({
    //         itemsInfos: global.itemsInfo,
    //         itemsNum: global.itemsInfo.length
    //     });
    // }
    render() {
        let spanStyle = {
            font: '30px',
            margin: '0 0 20px 0',
            padding: '20px 0 0 0'
        };
        let divStyle = {
            height: '50px',
            width: '100%'
        };
        let showImgStyle = {
            width: '26px',
            height: '26px',
            float: 'right',
            border: '1px solid rgb(70,184,218)',
            margin: '10px 0 0 0'
        };
        let hideImgStyle = {
            width: '26px',
            height: '26px',
            float: 'right',
            border: '1px solid rgb(70,184,218)',
            margin: '10px 0 0 0',
            display: 'none'
        }

        const element = this.state.itemsInfos.map((item, index) =>
            <ListItems item={item} key={index} />
        )

        return (
            <div>
                <div id='leftHead' style={divStyle}>
                    <span style={spanStyle}>Legend Items:</span>
                    <img id="deleteAll" onClick={this.deleteAllItems} style={hideImgStyle} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBgcIAhXUNwrhAAAAgklEQVQ4y6WUyQ3AIAwER3mlPvqglq2INmgn+UQICDhaxbywZ8XhA04ylUIiskShkjkhcz1LW1yNyVDbZidRR1Qo3XYl0RAvkAbHLNEUTSuntrjigKKz38EQX0k+8FiyzZA8fC2Z8INfZl7JfLT5rWbizNIwi88ub7uB7Ba1h4A5Zm48IyvwiWCRJwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNi0wN1QwODowMjoyMSswMjowMLOyTbsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDYtMDdUMDg6MDI6MjErMDI6MDDC7/UHAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="></img>
                </div>
                <div id='leftPanelItem'>
                    {element}
                </div>
            </div>
        )
    }
}

export default LeftPanel;