!function () {
    function openTab(menu) {
        var tabcontent = document.getElementsByClassName("tabcontent");
        for (var i = 0; i < tabcontent.length; i++) {
            if (tabcontent[i].style.display === "block") {
                tabcontent[i].style.display = "none";
                break;
            }
        }
        document.getElementById(menu).style.display = "block";

    }
    function deleteItem(evt) {
        sendMessages({ commandName: "deleteShapes", featureIds: [evt.target.parentElement.id] });
        evt.target.parentElement.remove();
        if(document.getElementById("leftPanelDiv1").childElementCount==0){
            document.getElementById("deleteAll").style.display = "none";
        }
    }
    document.getElementById("tabdiv").addEventListener("click", function (evt) {
        openTab(evt.target.name);

    });

    var mapMessage = { "topic": "request", "data": { "commandName": "initializeMap", "mapId": "map", "initializeConfigs": { "sourceProjection": "EPSG:4326", "mapProjection": "EPSG:4326", "layerSwitcher": [{ "name": "Base Maps", "type": "radio", "layers": [{ "name": "Hybrid", "relatedLayers": ["Satellite", "RoadMap"], "checked": true }, { "name": "Satellite", "relatedLayers": ["Satellite"] }, { "name": "Grid Pad", "relatedLayers": ["GridPad"] }, { "name": "Roads", "relatedLayers": ["RoadLayer"] }] }], "loadedLayers": ["Satellite", "RoadLayer", "RoadMap", "Plats", "GridPad", "Gps Track", "Gps LineLayer", "Pins", "EditOverlay", "SymbolAndLabel"], "editLayer": "EditOverlay", "editSymbolLabelLayer": "SymbolAndLabel", "selectionExclude": [], "allowedLayers": ["Satellite", "RoadLayer", "GridPad", "Aerial"], "backgroundColor": "#d3d3d3", "allowedControls": ["PanZoomBar", "MousePosition"], "groupingConfig": { "EnableGrouping": false, "MaximumShape": 20, "MaximumTiedown": 2 }, "drawStyle": { "fillColor": "#FFFFFF", "fillOpacity": 0.5, "strokeColor": "#0099FF", "strokeDashstyle": "solid", "strokeOpacity": 0.5, "strokeWidth": 1, "pointRadius": 6, "strokeLinecap": "square" }, "labelPlacementSetting": { "ajustForceDisplayItemOption": { "flip": true, "slide": true }, "ajustForceDisplayItemToPervertOverlap": true, "identicalShapeLengthProximityThresholdInFeet": 3, "identicalShapeLengthProximityThresholdInPixel": 7, "identicalShapeLengthProximityType": "Pixel", "identifyLabelAdjustPolylineLabel": true, "identifyLabelIgnoreValue": true, "shrinkXPixelForLabelToCaculateOverLap": 0 } } } };
    postMessage(mapMessage, "*");

    setTimeout(() => {
        postMessage({ topic: "request", data: { commandName: 'setUserControlOffsets', offsetWidth: 0, offsetHeight: 0 } }, "*");
    }, 1000);

    document.getElementById("setZoom").addEventListener("click", sendZoomMessage);
    function sendZoomMessage() {
        var zoom = document.getElementById("zoomNum").value;
        if (!document.getElementById("point").value || !zoom) {
            return alert("No data!");
        } else {
            var center = document.getElementById("point").value.split(",");
            if (center.length != 2) {
                return alert("Wrong Data!");
            }
            else {
                sendMessages({
                    commandName: 'setExtent',
                    zoomLevel: zoom,
                    centerPoint: {
                        x: +center[0],
                        y: +center[1]
                    }
                });
            }
        }
    }

    document.getElementById("setExtent").addEventListener("click", sendExtentMessage);
    function sendExtentMessage() {
        if (document.getElementById("extents").value) {
            var extent = document.getElementById("extents").value;
            if (extent) {
                sendMessages({
                    commandName: 'setExtent',
                    extent: extent
                });
            }
        } else {
            return alert("No data!");
        }

    }
    function sendMessages(data) {
        postMessage({ topic: "request", data }, "*");

    }

    document.getElementById("point").addEventListener("keyup", function () {
        var re = /(-?\d+\.?\d*\,)(-?\d+\.?\d*)/;
        var text = document.getElementById("point").value;
        if (text) {
            if (!re.test(text)) {
                document.getElementById("inputPoint").innerHTML = "Format Error!";
                document.getElementById("point").style.border = "1px solid red";
            }
            else {
                document.getElementById("inputPoint").innerHTML = "";
                document.getElementById("point").style.border = "1px solid black";
            }
        }
    });
    document.getElementById("point").addEventListener("blur", function () {
        var re = /(-?\d+\.?\d*\,)(-?\d+\.?\d*)/;            //march two decimals
        var text = document.getElementById("point").value;
        if (!text) {
            document.getElementById("inputPoint").innerHTML = "Please input!";
            document.getElementById("point").style.border = "1px solid red";
        }
    })

    document.getElementById("extents").addEventListener("keyup", function () {
        var re = /(-?\d+\.?\d*\,){3}(-?\d+\.?\d*)/;         //march four decimals
        var text = document.getElementById("extents").value;
        if (text) {
            if (!re.test(text)) {
                document.getElementById("inputExtent").innerHTML = "��ʽ����!";
                document.getElementById("extents").style.border = "1px solid red";
            }
            else {
                document.getElementById("inputExtent").innerHTML = "";
                document.getElementById("extents").style.border = "1px solid black";
            }
        }
    });
    document.getElementById("extents").addEventListener("blur", function () {
        var re = /(-?\d+\.?\d*\,){3}(-?\d+\.?\d*)/;
        var text = document.getElementById("extents").value;
        if (!text) {
            document.getElementById("inputExtent").innerHTML = "����������!";
            document.getElementById("extents").style.border = "1px solid red";
        }
    })
    document.getElementById("symbol").addEventListener("click", function (evt) {
        var labelStyle = evt.style;
        addEvents(evt, labelStyle);
    });
    function addEvents(evt, labelStyle) {
        sendMessages({
            commandName: 'drawSymbol',
            image: evt.target.src,
            labelStyle: labelStyle
        });
    }
    window.addEventListener("message", reciveMessage);
    function reciveMessage(evt) {
        var data = evt.data;
        name=evt.data.data.commandName;
        handles[name]&&handles[name](data.data);
        // addItems(evt.data.data);
    };
    var handles =
        {
            "drawSymbol": function addItem(data) {
                var radio = document.createElement("input");
                radio.type = "checkbox";
                radio.checked = "checked";
                var label = document.createElement("span");
                featureId = data.featureId.split("-");
                symbol = data.featureType;
                var labeltext = document.createTextNode(symbol + ":" + featureId[featureId.length - 1]);
                label.appendChild(labeltext);
    
                var image1 = document.createElement("img");
                image1.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBgcFGi7v/+jPAAAA7ElEQVQ4y+3ToU4DURCF4Y+mJSBINhjIhvAAVaxBYHAVfYMiICFIDHgUGodG1FDJS/AAGBJALEkFBLFt0kAhgYKATXc3XQIazqiZOf/MvWLIa8PIeybebOYN1QLQkDjO5Lua2pOAqroK5g2cZfpbAisYufQ6Loe6uYdMiq5wvKFlScuzcs041XKUAnOo+U61L1fm020/0hQILLtw6KTEte3Aqhv9dEMfJG5NCz14soh7sxbceZGg++mqFGbVxRro6GBdLMobKn6pf+CvAMWbvhKJsQPORa4nA0OPmoKSsWuGBsXinl7pPffsp7YPfidSD8s2u0MAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMDdUMDU6MjY6NDYrMDI6MDCm0QN3AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTA3VDA1OjI2OjQ2KzAyOjAw14y7ywAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=";
                image1.height = "26";
                image1.width = "26";
                image1.className = "delete";
                image1.addEventListener("click", deleteItem);
    
                var image2 = document.createElement("img");
                image2.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAaWSURBVGhD5dlnqHTVFcbxay8J9hYSsYtYQCE2SLVgi11Eo4IdCyJG00k+JSYk9t5i+6CCNRDFgtHEgr2XoNiNJpree3x+Z+7G7eHM3Jm58+pVH/gzs/ecstvaa+01U2Nq6bB7OC3cGl4Nfwz/D38Kvwy3hTPDnmG5MKe0Rbgy/CNo9L/Dk+G6cF44O5w7XX4s/Cu4zqe6bcN7qk3D3UGjjPxFQaM+GgZp8bB10Lk/BPffHz4d3lUtGk4N/w2/CV8NS4Rx9JHwpfDr8L9wQdDRea6Ph4eDUbw09FvnC4d1wlbhC9Of64VFQpeWCmbIcx8Pq4Z5prXCi+HvYR8VLTH2A4N1/7egUW3ce304JHQNwh7hz+G1oOMT1yfCK8Ga/qyKSosFy+v3QWMtt0uCJaPDZmPvcEz4UbCMXKfB3wptm9o4vBl+FdZUMSlZDg+Fv4bPq6j0yWCWNOxnQaMXCIM0f/hMuDm4z7b8qVDLRuJ9TwV2NBGdHrxw36b0tvYKltDrYScVY2ib8HL4ZzhIRaVdgw3gwqY0SxkZu5OlUstS8ZIHg2U3G60Y7goG61AVlc4K3tNeCSOLn7Dma8PcJJh2nZjUtFu+dwQzU9ugbd2MPxLmUzGOeGyjxJCLGPYLwcNnOxNtLR9eCoy89ktHBu3YuSmNoauCGKl+qE55aNsm+JcvB7/j8NA1guygXPOVsFqo9bng+d9pSj0ZPDvdTU1pRPEJYifbZZE6W+zPm9I7pVEaULD02n6Cxy5bdOGU0NZPgvs/1pR6KpFEXTeURLFetF1T6umAoM4W29bXQmncFcEodoktCCTLtYy5LTbot6ObUk+2Z3X7N6URJBQXxdbOisdm+F1+onTksulP4UbX0vpB8Pvl059dHSG28tPe10YLhb+Ei5vSCPKQJ3pfG4md+Iz2NlzEJrxIQFlipnZn6k4YDIPy7dAlA/mfUNunHfSB3tfhxUld2/vaaN2gEcKOLvHWxSY0vt2Zdido2dAvCjg4uJ4fKzKIbGwkOV8IqYu2DB78xaY0s+rOPDr9WXdiJu0Q3MO7F50Y1HUt2b5yQ71+i0/ZvCkNJy8snXg+LBiGVTH4euC+F9SNdPbhP87vfW1kJEWlo4xGWU464bNtM4Nkt3TPbk2pJzPieDySJA6u7n0dWvXJrrYJM9G2GRp0EuQ4XV+vADuWiGIk3R6c1Go5W9wbzNbKKioxToZod+sybI1vd8bh6euhSycHu5aTY9GdQcw1kqRsBHD1qAmnbcnfD+0ja/Ej50x/dhl2uzM++/mR50IdQZhVA8iZjiR5Jy/auinNrNqzD9qd6s7068hGwW/HNqWeLDF1XUfsgbLHMywjXEsDjwiWhTCmqASTBc7OM2qZXffV13F8bbFNZ/s6uv5hcC4ZK+L+cbDu6zNHicHuC6uomJYo9vhg2cEMcZJtcajlGtupTEstI6/BJzSlntgdI7+xKY0hyTaNljQoMqqCxtLI7UNtkLOR5zwbfhtE2kUyLtohrTS2xDbOAl2NLbvTfk1pdmLMtwQ7lXN8kaBVuCQJ0TXDQ0sa01S3bWWloBPFsFcIwopxZPRLRqUdy1li3i+ymLV4eC+pjZus7zJK5TBkV1Ln2DqMNgvPBDPR7oSlrRMymhMRu5Bd19A6Gi1aP+jod5vS1NRxwbX9tmDaMFwTNPR3oV5OtEEoCW6ZSQY/Ecn4CVtkAMVctbzksFCcp0Sd+KpojWBTkE7lsTk7DbTFWjpt+zMwknZvhJJTM+MT64wX2AalOndR0UfO+cWZrR00pGAJSfv4XcKiLTNjhnTC++ik4F7pp2+GiWRvVg9PB0vijLBkGCT2IuPCvthDv63a7iS69VyNlmwgM1n+9SqJC0tu3MzmO+SlRt1DeWp5J0fccWS5yC7aYnXCKfCG4NlmQqPZZ5kdn8riwPrQNStJY/orzUv5Gqkd27VEwSDxGTy4GSghCz8hp0U6xybUo/33gq1e8DrRzthuZQD5AevfiyUh7glGV2OFI4zaeUICQRTrOjMg7OB/2s5OZxwZ2EuX5klniiTP5J00WERQtk8IQI2+f7v4JVFsl7HX+kZwb1lWbc3TznRppg2hnwSi/JHGanSX3vXOjKsdg0Z+IDqjcR/azpjJOathO/OLwHkuo2KuapjOCHPsdu1ofc5pps4IUnXkqKY0xzWoM/450xF/gb8vVDrjYCY6cNCT9FAnmSfqeN9IQqJExQV/dQ97Qp1Tkj8TGjmZOh5Px21TU28BbfDXVQ30bLMAAAAASUVORK5CYII="
                image2.height = "26";
                image2.width = "26";
                image2.merginLeft = "26";
                image2.addEventListener("click",zoomToCenter);
    
                var second = document.createElement("div")
                second.appendChild(radio);
                second.appendChild(label);
                second.appendChild(image1);
                second.appendChild(image2);
                second.className = "add-new";
                second.id=data.featureId;
                var element = document.getElementById("leftPanelDiv1");
                element.appendChild(second);
                document.getElementById("deleteAll").style.display = "block";
            }
        };
        document.getElementById("deleteAll").addEventListener("click",deleteAllItems);
        function deleteAllItems(evt){
            var len=document.getElementsByClassName("add-new").length;
            for(var i=len-1;i>=0;i--)
            {
                sendMessages({ commandName: "deleteShapes", featureIds: [document.getElementsByClassName("add-new")[i].id] });
                document.getElementsByClassName("add-new")[i].remove();
            }
            document.getElementById("deleteAll").style.display="none";
        }
        function zoomToCenter(evt){
            sendMessages({
                    commandName: "centerOnShape",
                    featureId: evt.target.parentElement.id
                });
        }
}()