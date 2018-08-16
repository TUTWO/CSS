import React from 'react';
import ListItem from './listItem.js';
import commander from './command.js';

class LeftPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsInfo: [],
            labelsInfo: []
        };
        this.deleteAllItems = this.deleteAllItems.bind(this);
        this.deleteItems = this.deleteItems.bind(this);

        if (this.props.features) {
            this.setState({
                itemsInfo: this.props.shapes,
                labelsInfo: this.props.labels
            });
            // commander.send()
            for (let i = 0; i < this.state.itemsInfo.length; i++) {
                commander.send({
                    commandName: this.state.itemsInfo[i].commandName,
                    featureModels: [{
                        type: this.state.itemsInfo[i].type,
                        style: {
                            fillcolor: this.state.itemsInfo[i].style.fillcolor,
                            fillOpacity: this.state.itemsInfo[i].style.fillOpacity,
                            strokeColor: this.state.itemsInfo[i].style.strokeColor,
                            strokeDashstyle: this.state.itemsInfo[i].style.strokeDashstyle,
                            strokeOpacity: this.state.itemsInfo[i].style.strokeOpacity,
                            strokeWidth: this.state.itemsInfo[i].style.strokeWidth
                        },
                        wkt: this.itemsInfo[i].wkt,
                        labelStyle: {
                            label: this.state.labelsInfo[i].featureType + 'label',
                            font: "normal 32px Verdana",
                            fontColor: "lightgreen",
                            labelOutlineColor: "white",
                            labelOutlineWidth: 2
                        },
                        labelWkt: this.state.labelsInfo[i].labelWkt
                    }]
                })
            }
        }

        commander.handler['drawTypes'] = (data) => {
            this.state.itemsInfo.push(data);
            this.setState({ itemsInfo: this.state.itemsInfo });
            global.saveInfos = this.state.itemsInfo;
            commander.send({
                commandName: 'addLabelToShape',
                labelStyle: {
                    label: data.featureType + "label",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    fontWeight: "Bold",
                    fontStyle: "normal",
                    fontColor: "rgb(0,255,0)",
                    labelOutlineColor: "rgb(255,255,255)",
                    labelOutlineWidth: 2
                },
                featureIds: [data.featureId]
            });
            commander.send({
                commandName: "updateLabelStatus",
                features: data.featuresInfos
            });
        }
        commander.handler['confirmDeleteFeatures'] = (data) => {
            if (confirm('Are you sure to delete those items?')) {
                let idIndex = [];
                commander.send({ commandName: 'deleteShapes', featureIds: data.featureIds });
                for (let item of this.state.itemsInfo) {
                    for (let id of data.featureIds) {
                        if (item.featureId == id) {
                            idIndex.push(item);
                        }
                    }
                }
                for (let idItem of idIndex) {
                    let itemIndex = this.state.itemsInfo.indexOf(idItem);
                    if (itemIndex > -1) {
                        this.state.itemsInfo.splice(itemIndex, 1);
                        this.setState({ itemsInfo: this.state.itemsInfo });
                    }
                }
            }
        }
        commander.handler['addLabelToShape'] = (data) => {
            if (data.items) {
                for (let i = 0; i < global.saveInfos.length; i++) {
                    if (global.saveInfos[i].featureId === data.items[0].featureId) {
                        this.state.labelsInfo.push(data);
                        this.setState({ labelsInfo: this.state.labelsInfo });
                        global.saveLabels = this.state.labelsInfo;
                    }
                }
            }
        }
    }

    deleteAllItems() {
        if (confirm('Are you sure to delete All items ?')) {
            for (let item of this.state.itemsInfo) {
                commander.send({ commandName: 'deleteShapes', featureIds: [item.featureId] });
            }
            this.setState({ itemsInfo: [] });
        }
    }

    deleteItems(id) {
        if (confirm('Are you sure to delete This items ?')) {
            let itemIndex = this.state.itemsInfo.findIndex((item) => item.featureId === id);
            if (itemIndex) {
                this.state.itemsInfo.splice(itemIndex, 1);
                this.setState({ itemsInfo: this.state.itemsInfo });
                commander.send({ commandName: 'deleteShapes', featureIds: [id] });
            }
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

        const element = this.state.itemsInfo.map((item, index) =>
            <ListItem item={item} key={index} onDelete={this.deleteItems} />
        )
        return (
            <div>
                <div id='leftPanelHead' style={divStyle}>
                    <span style={spanStyle}>Legend Items:</span>
                    <img id="deleteAll" onClick={this.deleteAllItems} style={this.state.itemsInfo.length > 0 ? showImgStyle : hideImgStyle} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBgcIAhXUNwrhAAAAgklEQVQ4y6WUyQ3AIAwER3mlPvqglq2INmgn+UQICDhaxbywZ8XhA04ylUIiskShkjkhcz1LW1yNyVDbZidRR1Qo3XYl0RAvkAbHLNEUTSuntrjigKKz38EQX0k+8FiyzZA8fC2Z8INfZl7JfLT5rWbizNIwi88ub7uB7Ba1h4A5Zm48IyvwiWCRJwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNi0wN1QwODowMjoyMSswMjowMLOyTbsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDYtMDdUMDg6MDI6MjErMDI6MDDC7/UHAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="></img>
                </div>
                <div id='leftPanelItem'>
                    {element}
                </div>
            </div>
        )
    }
}

export default LeftPanel;