
$(() => {
    $(".tablinks").click(function (evt) {
        $(".tabcontent").hide();
        $(`#${evt.target.name}`).show();
        $(".tablinks").removeAttr("id");
        $(this).attr("id", "active");
    });

});
