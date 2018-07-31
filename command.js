
function sendMessages(data) {
    postMessage({ topic: "request", data }, "*");
}

let handlers =
{
    "drawTypes": function addItem(data) {
        if (data.featureId) {
            var div = $(`<div class="add-new" id="${data.featureId}"></div>`).appendTo("#leftPanelDiv1");
            var checkbox = $(`<input type="checkbox" checked>`).appendTo(div).on("click", showhideSymbol);
            let featureId = data.featureId.split("-");
            let symbol = data.featureType;
            var label = $(`<span>${symbol}:${featureId[featureId.length - 1]}</span>`).appendTo(div).hover(enlargeSymbol);
            var image2 = $(`<img class="delete" style="width:26px; height:26px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBgcFGi7v/+jPAAAA7ElEQVQ4y+3ToU4DURCF4Y+mJSBINhjIhvAAVaxBYHAVfYMiICFIDHgUGodG1FDJS/AAGBJALEkFBLFt0kAhgYKATXc3XQIazqiZOf/MvWLIa8PIeybebOYN1QLQkDjO5Lua2pOAqroK5g2cZfpbAisYufQ6Loe6uYdMiq5wvKFlScuzcs041XKUAnOo+U61L1fm020/0hQILLtw6KTEte3Aqhv9dEMfJG5NCz14soh7sxbceZGg++mqFGbVxRro6GBdLMobKn6pf+CvAMWbvhKJsQPORa4nA0OPmoKSsWuGBsXinl7pPffsp7YPfidSD8s2u0MAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMDdUMDU6MjY6NDYrMDI6MDCm0QN3AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTA3VDA1OjI2OjQ2KzAyOjAw14y7ywAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="></img>`).appendTo(div).on("click", deleteItem);
            var image1 = $(`<img class="zoomTo" style="width:26px;height:26px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAaWSURBVGhD5dlnqHTVFcbxay8J9hYSsYtYQCE2SLVgi11Eo4IdCyJG00k+JSYk9t5i+6CCNRDFgtHEgr2XoNiNJpree3x+Z+7G7eHM3Jm58+pVH/gzs/ecstvaa+01U2Nq6bB7OC3cGl4Nfwz/D38Kvwy3hTPDnmG5MKe0Rbgy/CNo9L/Dk+G6cF44O5w7XX4s/Cu4zqe6bcN7qk3D3UGjjPxFQaM+GgZp8bB10Lk/BPffHz4d3lUtGk4N/w2/CV8NS4Rx9JHwpfDr8L9wQdDRea6Ph4eDUbw09FvnC4d1wlbhC9Of64VFQpeWCmbIcx8Pq4Z5prXCi+HvYR8VLTH2A4N1/7egUW3ce304JHQNwh7hz+G1oOMT1yfCK8Ga/qyKSosFy+v3QWMtt0uCJaPDZmPvcEz4UbCMXKfB3wptm9o4vBl+FdZUMSlZDg+Fv4bPq6j0yWCWNOxnQaMXCIM0f/hMuDm4z7b8qVDLRuJ9TwV2NBGdHrxw36b0tvYKltDrYScVY2ib8HL4ZzhIRaVdgw3gwqY0SxkZu5OlUstS8ZIHg2U3G60Y7goG61AVlc4K3tNeCSOLn7Dma8PcJJh2nZjUtFu+dwQzU9ugbd2MPxLmUzGOeGyjxJCLGPYLwcNnOxNtLR9eCoy89ktHBu3YuSmNoauCGKl+qE55aNsm+JcvB7/j8NA1guygXPOVsFqo9bng+d9pSj0ZPDvdTU1pRPEJYifbZZE6W+zPm9I7pVEaULD02n6Cxy5bdOGU0NZPgvs/1pR6KpFEXTeURLFetF1T6umAoM4W29bXQmncFcEodoktCCTLtYy5LTbot6ObUk+2Z3X7N6URJBQXxdbOisdm+F1+onTksulP4UbX0vpB8Pvl059dHSG28tPe10YLhb+Ei5vSCPKQJ3pfG4md+Iz2NlzEJrxIQFlipnZn6k4YDIPy7dAlA/mfUNunHfSB3tfhxUld2/vaaN2gEcKOLvHWxSY0vt2Zdido2dAvCjg4uJ4fKzKIbGwkOV8IqYu2DB78xaY0s+rOPDr9WXdiJu0Q3MO7F50Y1HUt2b5yQ71+i0/ZvCkNJy8snXg+LBiGVTH4euC+F9SNdPbhP87vfW1kJEWlo4xGWU464bNtM4Nkt3TPbk2pJzPieDySJA6u7n0dWvXJrrYJM9G2GRp0EuQ4XV+vADuWiGIk3R6c1Go5W9wbzNbKKioxToZod+sybI1vd8bh6euhSycHu5aTY9GdQcw1kqRsBHD1qAmnbcnfD+0ja/Ej50x/dhl2uzM++/mR50IdQZhVA8iZjiR5Jy/auinNrNqzD9qd6s7068hGwW/HNqWeLDF1XUfsgbLHMywjXEsDjwiWhTCmqASTBc7OM2qZXffV13F8bbFNZ/s6uv5hcC4ZK+L+cbDu6zNHicHuC6uomJYo9vhg2cEMcZJtcajlGtupTEstI6/BJzSlntgdI7+xKY0hyTaNljQoMqqCxtLI7UNtkLOR5zwbfhtE2kUyLtohrTS2xDbOAl2NLbvTfk1pdmLMtwQ7lXN8kaBVuCQJ0TXDQ0sa01S3bWWloBPFsFcIwopxZPRLRqUdy1li3i+ymLV4eC+pjZus7zJK5TBkV1Ln2DqMNgvPBDPR7oSlrRMymhMRu5Bd19A6Gi1aP+jod5vS1NRxwbX9tmDaMFwTNPR3oV5OtEEoCW6ZSQY/Ecn4CVtkAMVctbzksFCcp0Sd+KpojWBTkE7lsTk7DbTFWjpt+zMwknZvhJJTM+MT64wX2AalOndR0UfO+cWZrR00pGAJSfv4XcKiLTNjhnTC++ik4F7pp2+GiWRvVg9PB0vijLBkGCT2IuPCvthDv63a7iS69VyNlmwgM1n+9SqJC0tu3MzmO+SlRt1DeWp5J0fccWS5yC7aYnXCKfCG4NlmQqPZZ5kdn8riwPrQNStJY/orzUv5Gqkd27VEwSDxGTy4GSghCz8hp0U6xybUo/33gq1e8DrRzthuZQD5AevfiyUh7glGV2OFI4zaeUICQRTrOjMg7OB/2s5OZxwZ2EuX5klniiTP5J00WERQtk8IQI2+f7v4JVFsl7HX+kZwb1lWbc3TznRppg2hnwSi/JHGanSX3vXOjKsdg0Z+IDqjcR/azpjJOathO/OLwHkuo2KuapjOCHPsdu1ofc5pps4IUnXkqKY0xzWoM/450xF/gb8vVDrjYCY6cNCT9FAnmSfqeN9IQqJExQV/dQ97Qp1Tkj8TGjmZOh5Px21TU28BbfDXVQ30bLMAAAAASUVORK5CYII="></img>`).appendTo(div).on("click", zoomToCenter);
            $("#deleteAll").css("display", "block");
            sendMessages({
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
            sendMessages({
                commandName: "updateLabelStatus",
                features: data.featuresInfos
            });
        }
    },
    "confirmDeleteFeatures": ((evt) => {
        $('#dialog-confirm').dialog({
            resizable: false,
            height: 200,
            modal: true,
            buttons: {
                'YES': function () {
                    $(this).dialog('close');
                    sendMessages({ commandName: 'deleteShapes', featureIds: evt.featureIds });
                    $(`#${evt.featureIds}`).remove();
                    if (!$('.add-new').length) {
                        $('#deleteAll').css('display', 'none');
                    }
                },
                'NO': function () {
                    $(this).dialog('close');
                }
            }
        });
    }),
    "initializeMap": (() => {
        sendMessages({ commandName: "setUserControlOffsets", offsetWidth: 0, offsetHeight: 0 });
    })
};

$(() => {
    function getJson(url) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('GET', url);
            req.onload = function () {
                if (req.status == 200) {
                    resolve(req.response);
                }
                else {
                    reject(new Error(req.statusText));
                }
            };
            req.onerror = function () {
                reject(new Error(req.statusText));
            };
            req.send();
        });
    }

    let drawTypes = ["drawSymbol", "drawLine", "drawPolyline", "drawPolygon", "drawRectangle", "drawSquare", "drawPencil", "measure", "drawLabel", "drawArrow", "drawCallout"];
    getJson('config.json').then(function (response) {
        sendMessages({ "commandName": "initializeMap", "mapId": "map", "initializeConfigs": response });
    }).catch(err => console.log(err.message));
    
    window.addEventListener("message", reciveMessage);
    function reciveMessage(evt) {
        if (evt.data) {
            let name = evt.data.data.commandName;
            if (drawTypes.indexOf(name) > -1) {
                name = "drawTypes";
            }
            handlers[name] && handlers[name](evt.data.data);
        }
    }
});
