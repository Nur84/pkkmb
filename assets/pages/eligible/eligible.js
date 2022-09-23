function cekEligible() {
    var data = {
        npm: $('#npm').val()
    }
    $('#btn-syncAll').attr('disabled', 'disabled')
    $('#btn-checkAll').attr('disabled', 'disabled')
    $('#btn-syncAll').text('Sedang mengambil data ..')
    $.ajax({
        type: "post",
        data: data,
        url: "./eligible/cekeligibleperMhs",
        success: function (msg) {
            $('#response').html(msg)
            $('#btn-syncAll').removeAttr('disabled')
            $('#btn-checkAll').removeAttr('disabled')
            $('#btn-syncAll').text('Cek Data')
        }
    })
}

function uploaddata() {
    var form = $('#formtoupload')[0]
    var form_data = new FormData(form)
    $('#btn-syncAll').attr('disabled', 'disabled')
    $('#btn-checkAll').attr('disabled', 'disabled')
    $('#btn-checkAll').text('Sedang memproses data ...')
    $.ajax({
        url: "./eligible/uploaddaftar",
        type: "POST",
        enctype: "multipart/form-data",
        data: form_data,
        contentType: false,
        cache: false,
        processData: false,
        success: function (msg) {
            $('#response').html(msg)
            $('#btn-syncAll').removeAttr('disabled')
            $('#btn-checkAll').removeAttr('disabled')
            $('#btn-checkAll').text('Cek Data')
            form.reset()
            // table.ajax.reload(null, false)
        }
    })

}