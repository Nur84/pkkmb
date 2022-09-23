var table = $('#table-peserta').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "./getpesertaldkm",
        "type": "POST",
        "data": function (data) {
            data.kode_prodi = $('#fprodi').val()
            data.mulai_smt = $('#fsmt').val()
            data.sync = $('#sync').val()
            data.status_keluar = $('#fjeniskeluar').val()
            data.jenis_daftar = $('#fjnsdaftar').val()
        }
    },
    "language": {
        "searchPlaceholder": "Cari NPM/Nama"
    }
})

function bukti(id) {
    $.ajax({
        type: "post",
        data: { id: id },
        url: "./getbuktibayarldkm",
        success: function (msg) {
            $('#res').html(msg)
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
        url: "./ldkm/upload",
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
            table.ajax.reload(null, false)
        }
    })
}
