function load() {
    var data = { fungsi: $('#fws').val() }
    $('.fa-sync-alt').addClass('fa-spin')
    $('#btn-sync-All').attr('disabled','disabled')
    $.ajax({
        url: "./getdicws",
        type: "post",
        data: data,
        success: function (msg) {
            $('#response').html(msg)
            $('.fa-sync-alt').removeClass('fa-spin')
            $('#btn-sync-All').removeAttr('disabled')
        }
    })
}
$('#fws').select2()
$('#fws').change(function () {
    load()
})