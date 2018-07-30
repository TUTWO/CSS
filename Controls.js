

$(() => {
    $("#controls input").click((evt) => {
        sendMessages({
            commandName: "setControlsVisibility",
            controls: [{
                name: evt.target.id,
                visible: evt.target.checked
            }]
        });
    });

    let isGray = false;
    $("#changeToGray").click(() => {
        isGray = !isGray;
        sendMessages({
            commandName: "changeGrayScale",
            isGray: isGray
        })
        $("#changeToGray").text(isGray?"Change Back":"Change To Grey");
    });
})