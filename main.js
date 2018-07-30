//Tab标签项
$(() => {
    $(".tablinks").click(function (evt) {
        $(".tabcontent").hide();
        $(`#${evt.target.name}`).show();
        $(".tablinks").removeAttr("id");
        $(this).attr("id", "active");
    });

});
