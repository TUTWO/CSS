
$(() => {
    $("#symbol").click((evt) => {
        let labelStyle = evt.style;
        sendMessages({
            commandName: 'drawSymbol',
            image: evt.target.src,
            labelStyle: labelStyle
        });
    });

    $("#deleteAll").click(() => {
        let len = $(".add-new").length;
        for (i = len - 1; i >= 0; i--) {
            sendMessages({ commandName: "deleteShapes", featureIds: [$(".add-new")[i].id] });
        }
        $(".add-new").remove();
        $("#deleteAll").css("display", "none");
    });

})

function zoomToCenter(evt) {
    sendMessages({
        commandName: "centerOnShape",
        featureId: evt.target.parentElement.id
    });
}

function deleteItem(evt) {
    sendMessages({ commandName: "deleteShapes", featureIds: [evt.target.parentElement.id] });
    evt.target.parentElement.remove();
    if ($("#leftPanelDiv1").childElementCount === 0) {
        $("deleteAll").css("display","none");
    }
}

function enlargeSymbol(evt) {
    mouseEvent = evt.type;
    let isHighlight = (mouseEvent === "mouseenter");
    sendMessages({ commandName: "highlightFeature", featureId: evt.target.parentElement.id, color: isHighlight ? "#00FFFF" : undefined });
}

function showhideSymbol(evt) {
    let commandName = evt.target.checked ? "showFeature" : "hideFeature";
    sendMessages({ commandName, featureIds: [evt.target.parentElement.id] });
}
