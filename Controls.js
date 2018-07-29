$(() => {
    $("#controls input").click((evt) => {
        sendMessages({
            commandName: 'setControlsVisibility',
            controls: [{
                name: evt.target.id,
                visible: evt.target.checked
            }]
        });
    });

    let isGray = false;
    $("#changeToGrey").click(() => {
        isGray = !isGray;
        sendMessages({
            commandName: 'changeGrayScale',
            isGray: isGray
        })
        if (isGray) {
            $("#changeToGrey").text("Change Back");
        }else{
            $("#changeToGrey").text("Change To Grey");            
        }
    })
})