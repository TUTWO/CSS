
document.getElementById("symbol").addEventListener("click", (evt) => {
    var labelStyle = evt.style;
    sendMessages({
        commandName: 'drawSymbol',
        image: evt.target.src,
        labelStyle: labelStyle
    });
});

function reciveMessage(evt) {
    if (evt.data) {
        name = evt.data.data.commandName;
        handlers[name] && handlers[name](evt.data.data);
    }
};

document.getElementById("deleteAll").addEventListener("click", (evt) => {
    let len = document.getElementsByClassName("add-new").length;
    for (let i = len - 1; i >= 0; i--) {
        sendMessages({ commandName: "deleteShapes", featureIds: [document.getElementsByClassName("add-new")[i].id] });
        document.getElementsByClassName("add-new")[i].remove();
    }
    document.getElementById("deleteAll").style.display = "none";
});

function zoomToCenter(evt) {
    sendMessages({
        commandName: "centerOnShape",
        featureId: evt.target.parentElement.id
    });
}

function deleteItem(evt) {
    sendMessages({ commandName: "deleteShapes", featureIds: [evt.target.parentElement.id] });
    evt.target.parentElement.remove();
    if (document.getElementById("leftPanelDiv1").childElementCount === 0) {
        document.getElementById("deleteAll").style.display = "none";
    }
}

function enlargeSymbol(evt, isHighlight) {
    mouseEvent = evt.type;
    isHighlight = (mouseEvent === "mouseover");
    sendMessages({ commandName: "highlightFeature", featureId: evt.target.parentElement.id, color: isHighlight ? "#00FFFF" : undefined });
}

function showhideSymbol(evt) {
    let commandName = evt.target.checked ? "showFeature" : "hideFeature";
    sendMessages({ commandName, featureIds: [evt.target.parentElement.id] });
}