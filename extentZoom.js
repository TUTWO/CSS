
document.getElementById("setZoom").addEventListener("click", () => {
    let zoom = document.getElementById("zoomNum").value;
    if (!document.getElementById("point").value || !zoom) {
        return;
    } else {
        let center = document.getElementById("point").value.split(",");
        if (center.length !== 2) {
            return;
        }
        else {
            let [x, y] = center;
            sendMessages({
                commandName: 'setExtent',
                zoomLevel: zoom,
                centerPoint: {
                    x: +x,
                    y: +y
                }
            });
        }
    }
});


document.getElementById("setExtent").addEventListener("click", () => {
    if (document.getElementById("extents").value) {
        let extent = document.getElementById("extents").value;
        if (extent) {
            sendMessages({
                commandName: 'setExtent',
                extent: extent
            });
        }
    } else {
        return;
    }
});


document.getElementById("extents").addEventListener("keyup", () => {
    let re = /(-?\d+\.?\d*\,){3}(-?\d+\.?\d*)/;         //march four decimals
    let text = document.getElementById("extents").value;
    if (text) {
        if (!re.test(text)) {
            document.getElementById("inputExtent").innerHTML = "Wrong Format!";
            document.getElementById("extents").style.border = "1px solid red";
        }
        else {
            document.getElementById("inputExtent").innerHTML = "";
            document.getElementById("extents").style.border = "1px solid black";
        }
    }
});

document.getElementById("point").addEventListener("keyup", () => {
    let re = /(-?\d+\.?\d*\,)(-?\d+\.?\d*)/;            //march two decimals
    let text = document.getElementById("point").value;
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

document.getElementById("extents").addEventListener("blur", checkInput);
document.getElementById("point").addEventListener("blur", checkInput);
function checkInput() {
    let text = document.getElementById("point").value;
    if (!text) {
        document.getElementById("inputPoint").innerHTML = "Please input!";
        document.getElementById("point").style.border = "1px solid red";
    }
}
