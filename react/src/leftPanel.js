import React from 'react';
import ListItems from './listItems.js';
import { commander } from './command.js';


class LeftPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsInfos: []
        };
        this.deleteAllItems = this.deleteAllItems.bind(this);
        this.deleteItems = this.deleteItems.bind(this);
    }

    deleteAllItems() {
        if (confirm('Are you sure to delete All items ?')) {
            for (let item of this.state.itemsInfos) {
                commander.send({ commandName: 'deleteShapes', featureIds: [item.featureId] });
            }
            this.setState({ itemsInfos: [] });
        }
    }
    deleteItems(id) {
        if (confirm('Are you sure to delete This items ?')) {
            let itemIndex;
            for (let item of this.state.itemsInfos) {
                if (item.featureId === id) {
                    itemIndex = this.state.itemsInfos.indexOf(item);
                }
            }
            this.state.itemsInfos.splice(itemIndex, 1);
            this.setState({ itemsInfos: this.state.itemsInfos });
            commander.send({ commandName: 'deleteShapes', featureIds: [id] });
        }
    }

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
        if (this.props.item) {
            commander.handler["drawTypes"] = () => {
                this.state.itemsInfos.push(this.props.item);
                this.setState({ itemsInfos: this.state.itemsInfos });
            }
            commander.handler[name] && commander.handler[name](e);
        }
        const element = this.state.itemsInfos.map((item, index) =>
            <ListItems item={item} key={index} onDelete={this.deleteItems} />
        )
        return (
            <div>
                <div id='leftPanelHead' style={divStyle}>
                    <span style={spanStyle}>Legend Items:</span>
                    <img id="deleteAll" onClick={this.deleteAllItems} style={this.state.itemsInfos.length > 0 ? showImgStyle : hideImgStyle} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBgcIAhXUNwrhAAAAgklEQVQ4y6WUyQ3AIAwER3mlPvqglq2INmgn+UQICDhaxbywZ8XhA04ylUIiskShkjkhcz1LW1yNyVDbZidRR1Qo3XYl0RAvkAbHLNEUTSuntrjigKKz38EQX0k+8FiyzZA8fC2Z8INfZl7JfLT5rWbizNIwi88ub7uB7Ba1h4A5Zm48IyvwiWCRJwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNi0wN1QwODowMjoyMSswMjowMLOyTbsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDYtMDdUMDg6MDI6MjErMDI6MDDC7/UHAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="></img>
                </div>
                <div id='leftPanelItem'>
                    {element}
                </div>
            </div>
        )
    }
}

export default LeftPanel;