
let selectType = ["select", "lasso", "selectAllFeatures"];
let drawType = ["drawLine", "drawPolyline", "drawPolygon", "drawRectangle", "drawSquare", "drawPencil", "measure", "drawLabel", "drawArrow", "drawCallout"];
let style = {
    fillColor: "#ffffff",
    fillOpacity: "0.5",
    strokeColor: "#1f85f0",
    strokeOpacity: "1",
    strokeWidth: 2
}
$(() => {

    $("#selectButton").click(() => {
        $("#selectType").toggle();
        $("#drawType").hide();
    });

    $("#drawButton").click(() => {
        $("#drawType").toggle();
        $("#selectType").hide();
    });

    $("#selectType li").click(function () {
        let commandName = selectType[$(this).index()];
        sendMessages({commandName});
        $("#selectType li").removeAttr("id");
        $(this).attr("id","selectDraw");
        $("#selectType").hide();
    });
    
    $("#drawType li").click(function () {
        let commandName = drawType[$(this).index()];
        sendMessages({
            commandName: commandName,
            style: {
                fillColor: $("#fillColor").val(),
                fillOpacity: "0.5",
                strokeColor: $("#strokeColor").val(),
                strokeOpacity: "1",
                strokeWidth: $("#strokeWidth").val()
            }
        });
        $("#drawType li").removeAttr("id");
        $(this).attr("id","drawType");
        $("#drawType").hide();
    });
})

