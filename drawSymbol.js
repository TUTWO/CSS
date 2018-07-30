
$(() => {
    class A {
        constructor() {
            this.name = 'A';
        }

        symbolClickHandler(evt) {
            let labelStyle = evt.style;
            sendMessages({
                commandName: 'drawSymbol',
                image: evt.target.src,
                labelStyle: labelStyle
            });
        }
    }
    const a = new A();

    $('#symbol').click(a.symbolClickHandler.bind(a));

    $('#deleteAll').click(() => {
        $('#dialog-confirm2').dialog({
            resizable: false,
            height: 200,
            modal: true,
            buttons: {
                'YES': function () {
                    let len = $('.add-new').length;
                    for (let i = len - 1; i >= 0; i--) {
                        sendMessages({ commandName: 'deleteShapes', featureIds: [$('.add-new')[i].id] });

                    }
                    $('.add-new').remove();
                    $('#deleteAll').css('display', 'none');
                    $(this).dialog('close');
                },
                'NO': function () {
                    $(this).dialog('close');
                }
            }
        });
        $('.ui-widget-overlay').removeAttr('background');
    });
});

function zoomToCenter(evt) {
    sendMessages({
        commandName: 'centerOnShape',
        featureId: evt.target.parentElement.id
    });
}

function deleteItem(evt) {
    $('#dialog-confirm').dialog({
        resizable: false,
        height: 200,
        modal: true,
        buttons: {
            'YES': function () {
                $(this).dialog('close');
                sendMessages({ commandName: 'deleteShapes', featureIds: [evt.target.parentElement.id] });
                evt.target.parentElement.remove();
                if (!$('.add-new').length) {
                    $('#deleteAll').css('display', 'none');
                }
            },
            'NO': function () {
                $(this).dialog('close');
            }
        }
    });
}


function enlargeSymbol(evt) {
    let mouseEvent = evt.type;
    let isHighlight = (mouseEvent === 'mouseenter');
    sendMessages({ commandName: 'highlightFeature', featureId: evt.target.parentElement.id, color: isHighlight ? '#00FFFF' : undefined });
}

function showhideSymbol(evt) {
    let commandName = evt.target.checked ? 'showFeature' : 'hideFeature';
    sendMessages({ commandName, featureIds: [evt.target.parentElement.id] });
}