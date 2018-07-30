
$(() => {

    let selectType = ["select", "lasso", "selectAllFeatures"];
    let drawType = ["drawLine", "drawPolyline", "drawPolygon", "drawRectangle", "drawSquare", "drawPencil", "measure", "drawLabel", "drawArrow", "drawCallout"];
    let style = {
        fillColor: "#ffffff",
        fillOpacity: "0.5",
        strokeColor: "#1f85f0",
        strokeOpacity: "1",
        strokeWidth: 2
    };

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
        sendMessages({ commandName });
        $("#selectType li").removeAttr("id");
        $("#selectType li").attr("id", "notselectDraw");
        $(this).attr("id", "selectDraw");
        $("#selectType").hide();
    });

    let drawTypeName;
    $("#drawType li").click(function () {
        drawTypeName = drawType[$(this).index()];
        sendMessages({
            commandName: drawTypeName,
            style: {
                fillColor: $("#fillColor").val(),
                fillOpacity: "0.5",
                strokeColor: $("#strokeColor").val(),
                strokeOpacity: "1",
                strokeWidth: $("#strokeWidth").val()
            }
        });
        $("#drawType li").removeAttr("id");
        $("#drawType li").attr("id", "notselectDraw");
        $(this).attr("id", "selectDraw");
        $("#drawType").hide();
    });

    $("#strokeColor").blur(() => {
        sendMessages({
            commandName: drawTypeName,
            style: {
                fillColor: $("#fillColor").val(),
                fillOpacity: "0.5",
                strokeColor: $("#strokeColor").val(),
                strokeOpacity: "1",
                strokeWidth: $("#strokeWidth").val()
            }
        });
    });
    
    $("#fillColor").blur(() => {
        sendMessages({
            commandName: drawTypeName,
            style: {
                fillColor: $("#fillColor").val(),
                fillOpacity: "0.5",
                strokeColor: $("#strokeColor").val(),
                strokeOpacity: "1",
                strokeWidth: $("#strokeWidth").val()
            }
        });
    });
})

