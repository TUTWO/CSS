
$(() => {
    $('#setZoom').click(() => {
        let zoom = $('#zoomNum').val();
        let point = $('#point').val();
        if (!point || !zoom) {
            return;
        } else {
            let center = point.split(',');
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

    $('#setExtent').click(() => {
        let extent = $('#extents').val();
        if (extent) {
            let re = /(-?\d+\.?\d*\,){3}(-?\d+\.?\d*)/;
            if (re.test(extent)) {
                sendMessages({
                    commandName: 'setExtent',
                    extent
                });
            } else {
                return;
            }

        } else {
            return;
        }
    });

    $('#extents').keyup(() => {
        let re = /(-?\d+\.?\d*\,){3}(-?\d+\.?\d*)/;         //march four decimals
        let text = $('#extents').val();
        if (text) {
            if (!re.test(text)) {
                $('#inputExtent').text('Wrong Format!');
                $('#extents').css('border', '1px solid red');
            }
            else {
                $('#inputExtent').text('');
                $('#extents').css('border', '1px solid black');
            }
        }
    }).blur(() => {
        let text = $('#extents').val();
        if (!text) {
            $('#inputExtent').text('Please Input!');
            $('#extents').css('border', '1px solid red');
        }
    });

    $('#point').keyup(() => {
        let re = /(-?\d+\.?\d*\,)(-?\d+\.?\d*)/;         //march four decimals
        let text = $('#point').val();
        if (text) {
            if (!re.test(text)) {
                $('#inputPoint').text('Wrong Format!');
                $('#point').css('border', '1px solid red');
            }
            else {
                $('#inputPoint').text('');
                $('#point').css('border', '1px solid black');
            }
        }
    }).blur(() => {
        let text = $('#point').val();
        if (!text) {
            $('#inputPoint').text('Please Input!');
            $('#point').css('border', '1px solid red');
        }
    });
});

