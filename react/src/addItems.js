import React from 'react';
import ReactDOM from 'react-dom';
import SendMessages from './sendMesages.js'

let itemsInfo = new Array();
// class AddItems extends React.Component {
//     render() {
//         let types = ['drawSymbol', 'drawLine', 'drawPolyline', 'drawPolygon', 'drawRectangle', 'drawSquare', 'drawPencil', 'measure', 'drawLabel', 'drawArrow', 'drawCallout'];
//         if (e.data.data) {
//             let name = e.data.data.commandName;
//             let imgStyle = {
//                 width: '26px',
//                 height: '26px',
//                 float: 'right',
//                 border: '1px solid rgb(70,184,218)',
//                 margin: '10px 0 0 0'
//             };
//             let divStyle = {
//                 height: '50px',
//                 width: '100%',
//                 border: '1px solid gray'
//             };
//             let spanStyle = {
//                 margin: '15px 0 0 0'
//             };
//             if (types.indexOf(name) > -1 && e.data.data.featureId) {
//                 itemsInfo.push(e.data.data);
//                 let element = [];
//                 let i = 0;
//                 itemsInfo.forEach((item => {
//                     let feature = item.featureId.split('-').pop();
//                     element[i] = (
//                         <div id={item.featureId} style={divStyle}>
//                             <input type='checkbox' style={spanStyle} defaultChecked />
//                             <span style={spanStyle}>{item.featureType}:{feature}</span>
//                             <img class="delete" style={imgStyle} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBgcFGi7v/+jPAAAA7ElEQVQ4y+3ToU4DURCF4Y+mJSBINhjIhvAAVaxBYHAVfYMiICFIDHgUGodG1FDJS/AAGBJALEkFBLFt0kAhgYKATXc3XQIazqiZOf/MvWLIa8PIeybebOYN1QLQkDjO5Lua2pOAqroK5g2cZfpbAisYufQ6Loe6uYdMiq5wvKFlScuzcs041XKUAnOo+U61L1fm020/0hQILLtw6KTEte3Aqhv9dEMfJG5NCz14soh7sxbceZGg++mqFGbVxRro6GBdLMobKn6pf+CvAMWbvhKJsQPORa4nA0OPmoKSsWuGBsXinl7pPffsp7YPfidSD8s2u0MAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMDdUMDU6MjY6NDYrMDI6MDCm0QN3AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTA3VDA1OjI2OjQ2KzAyOjAw14y7ywAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="></img>
//                             <img class="zoomTo" style={imgStyle} src="data:image/png;base64,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"></img>
//                         </div>
//                     );
//                     i++;
//                 }))
//                 return (
//                     element
//                 )
//             }
//         }
//     }
// }

function AddItems(e) {
    let types = ['drawSymbol', 'drawLine', 'drawPolyline', 'drawPolygon', 'drawRectangle', 'drawSquare', 'drawPencil', 'measure', 'drawLabel', 'drawArrow', 'drawCallout'];
    if (e.data.data) {
        let name = e.data.data.commandName;
        let imgStyle = {
            width: '26px',
            height: '26px',
            float: 'right',
            border: '1px solid rgb(70,184,218)',
            margin: '10px 0 0 0'
        };
        let divStyle = {
            height: '50px',
            width: '100%',
            border: '1px solid gray'
        };
        let spanStyle = {
            margin: '15px 0 0 0'
        }
        if (types.indexOf(name) > -1 && e.data.data.featureId) {
            document.getElementById('deleteAll').style.display='block';
            itemsInfo.push(e.data.data);
            let element = [];
            let i = 0;
            itemsInfo.forEach((item => {
                let feature = item.featureId.split('-').pop();
                element[i] = (
                    <div id={item.featureId} style={divStyle}>
                        <input type='checkbox' style={spanStyle} defaultChecked onClick={hideItems} />
                        <span style={spanStyle} onMouseEnter={enlargeItems} onMouseLeave={shrinkItems}>{item.featureType}:{feature}</span>
                        <img className="delete" onClick={deleteItems} style={imgStyle} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBgcFGi7v/+jPAAAA7ElEQVQ4y+3ToU4DURCF4Y+mJSBINhjIhvAAVaxBYHAVfYMiICFIDHgUGodG1FDJS/AAGBJALEkFBLFt0kAhgYKATXc3XQIazqiZOf/MvWLIa8PIeybebOYN1QLQkDjO5Lua2pOAqroK5g2cZfpbAisYufQ6Loe6uYdMiq5wvKFlScuzcs041XKUAnOo+U61L1fm020/0hQILLtw6KTEte3Aqhv9dEMfJG5NCz14soh7sxbceZGg++mqFGbVxRro6GBdLMobKn6pf+CvAMWbvhKJsQPORa4nA0OPmoKSsWuGBsXinl7pPffsp7YPfidSD8s2u0MAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMDdUMDU6MjY6NDYrMDI6MDCm0QN3AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTA3VDA1OjI2OjQ2KzAyOjAw14y7ywAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="></img>
                        <img className="zoomTo" onClick={zoomToItems} style={imgStyle} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAaWSURBVGhD5dlnqHTVFcbxay8J9hYSsYtYQCE2SLVgi11Eo4IdCyJG00k+JSYk9t5i+6CCNRDFgtHEgr2XoNiNJpree3x+Z+7G7eHM3Jm58+pVH/gzs/ecstvaa+01U2Nq6bB7OC3cGl4Nfwz/D38Kvwy3hTPDnmG5MKe0Rbgy/CNo9L/Dk+G6cF44O5w7XX4s/Cu4zqe6bcN7qk3D3UGjjPxFQaM+GgZp8bB10Lk/BPffHz4d3lUtGk4N/w2/CV8NS4Rx9JHwpfDr8L9wQdDRea6Ph4eDUbw09FvnC4d1wlbhC9Of64VFQpeWCmbIcx8Pq4Z5prXCi+HvYR8VLTH2A4N1/7egUW3ce304JHQNwh7hz+G1oOMT1yfCK8Ga/qyKSosFy+v3QWMtt0uCJaPDZmPvcEz4UbCMXKfB3wptm9o4vBl+FdZUMSlZDg+Fv4bPq6j0yWCWNOxnQaMXCIM0f/hMuDm4z7b8qVDLRuJ9TwV2NBGdHrxw36b0tvYKltDrYScVY2ib8HL4ZzhIRaVdgw3gwqY0SxkZu5OlUstS8ZIHg2U3G60Y7goG61AVlc4K3tNeCSOLn7Dma8PcJJh2nZjUtFu+dwQzU9ugbd2MPxLmUzGOeGyjxJCLGPYLwcNnOxNtLR9eCoy89ktHBu3YuSmNoauCGKl+qE55aNsm+JcvB7/j8NA1guygXPOVsFqo9bng+d9pSj0ZPDvdTU1pRPEJYifbZZE6W+zPm9I7pVEaULD02n6Cxy5bdOGU0NZPgvs/1pR6KpFEXTeURLFetF1T6umAoM4W29bXQmncFcEodoktCCTLtYy5LTbot6ObUk+2Z3X7N6URJBQXxdbOisdm+F1+onTksulP4UbX0vpB8Pvl059dHSG28tPe10YLhb+Ei5vSCPKQJ3pfG4md+Iz2NlzEJrxIQFlipnZn6k4YDIPy7dAlA/mfUNunHfSB3tfhxUld2/vaaN2gEcKOLvHWxSY0vt2Zdido2dAvCjg4uJ4fKzKIbGwkOV8IqYu2DB78xaY0s+rOPDr9WXdiJu0Q3MO7F50Y1HUt2b5yQ71+i0/ZvCkNJy8snXg+LBiGVTH4euC+F9SNdPbhP87vfW1kJEWlo4xGWU464bNtM4Nkt3TPbk2pJzPieDySJA6u7n0dWvXJrrYJM9G2GRp0EuQ4XV+vADuWiGIk3R6c1Go5W9wbzNbKKioxToZod+sybI1vd8bh6euhSycHu5aTY9GdQcw1kqRsBHD1qAmnbcnfD+0ja/Ej50x/dhl2uzM++/mR50IdQZhVA8iZjiR5Jy/auinNrNqzD9qd6s7068hGwW/HNqWeLDF1XUfsgbLHMywjXEsDjwiWhTCmqASTBc7OM2qZXffV13F8bbFNZ/s6uv5hcC4ZK+L+cbDu6zNHicHuC6uomJYo9vhg2cEMcZJtcajlGtupTEstI6/BJzSlntgdI7+xKY0hyTaNljQoMqqCxtLI7UNtkLOR5zwbfhtE2kUyLtohrTS2xDbOAl2NLbvTfk1pdmLMtwQ7lXN8kaBVuCQJ0TXDQ0sa01S3bWWloBPFsFcIwopxZPRLRqUdy1li3i+ymLV4eC+pjZus7zJK5TBkV1Ln2DqMNgvPBDPR7oSlrRMymhMRu5Bd19A6Gi1aP+jod5vS1NRxwbX9tmDaMFwTNPR3oV5OtEEoCW6ZSQY/Ecn4CVtkAMVctbzksFCcp0Sd+KpojWBTkE7lsTk7DbTFWjpt+zMwknZvhJJTM+MT64wX2AalOndR0UfO+cWZrR00pGAJSfv4XcKiLTNjhnTC++ik4F7pp2+GiWRvVg9PB0vijLBkGCT2IuPCvthDv63a7iS69VyNlmwgM1n+9SqJC0tu3MzmO+SlRt1DeWp5J0fccWS5yC7aYnXCKfCG4NlmQqPZZ5kdn8riwPrQNStJY/orzUv5Gqkd27VEwSDxGTy4GSghCz8hp0U6xybUo/33gq1e8DrRzthuZQD5AevfiyUh7glGV2OFI4zaeUICQRTrOjMg7OB/2s5OZxwZ2EuX5klniiTP5J00WERQtk8IQI2+f7v4JVFsl7HX+kZwb1lWbc3TznRppg2hnwSi/JHGanSX3vXOjKsdg0Z+IDqjcR/azpjJOathO/OLwHkuo2KuapjOCHPsdu1ofc5pps4IUnXkqKY0xzWoM/450xF/gb8vVDrjYCY6cNCT9FAnmSfqeN9IQqJExQV/dQ97Qp1Tkj8TGjmZOh5Px21TU28BbfDXVQ30bLMAAAAASUVORK5CYII="></img>
                    </div>
                );
                i++;
            }))
            ReactDOM.render(element, document.getElementById('leftPanelDiv1'));
        } else if (name === 'initializeMap') {
            SendMessages.send({ commandName: 'setUserControlOffsets', offsetWidth: 0, offsetHeight: 0 });
        }
        else if (name === 'confirmDeleteFeatures') {
            SendMessages.send({ commandName: 'deleteShapes', featureIds: e.featureIds });
        }
    }
}
function hideItems(e) {
    let commandName = e.target.checked ? 'showFeature' : 'hideFeature';
    SendMessages.send({ commandName, featureIds: [e.target.parentElement.id] });
}
function enlargeItems(e) {
    SendMessages.send({ commandName: 'highlightFeature', featureId: e.target.parentElement.id, color: '#00FFFF' });
}
function shrinkItems(e) {
    SendMessages.send({ commandName: 'highlightFeature', featureId: e.target.parentElement.id, color: undefined });
}
function deleteItems(e) {
    SendMessages.send({ commandName: 'deleteShapes', featureIds: [e.target.parentElement.id] });
    document.getElementById(e.target.parentElement.id).remove();
}
function zoomToItems(e) {
    SendMessages.send({ commandName: 'centerOnShape', featureId: e.target.parentElement.id });
}
export default AddItems; 