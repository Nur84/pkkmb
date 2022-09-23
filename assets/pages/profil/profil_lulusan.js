function load_prof_lulusan() {
    $.ajax({
        url: "./test",
        type: "post",
        success: function (msg) {
            $('#table-info').html(msg)
        }
    })
}