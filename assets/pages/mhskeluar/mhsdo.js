function LoadData() {
    var prodi = $('#fprodi').val()
    var angkatan = $('#fsmt').val()
    if (prodi==0||angkatan==0) {
        alert('Prodi dan angkatan tidak boleh kosong')
        return false
    }
    $('#btn-load-data').attr('disabled','disabled')
    $('#btn-sync-data').attr('disabled','disabled')
    $('#btn-reset-filter').attr('disabled', 'disabled')
    $('.fa-sync-alt').addClass('fa-spin')
    $.ajax({
        url: "./loaddataaktif",
        data: {
            prodi:prodi,angkatan:angkatan
        },
        type: "post",
        success: function (msg) {
            $('#response').html(msg)
            $('#btn-load-data').removeAttr('disabled')
            $('#btn-sync-data').removeAttr('disabled')
            $('#btn-reset-filter').removeAttr('disabled')
            $('.fa-sync-alt').removeClass('fa-spin')
        }
    })
}

function SyncData() {
    var prodi = $('#fprodi').val()
    var angkatan = $('#fsmt').val()
    var tgl_keluar = $('#tgl_keluar').val()
    var periode_keluar = $('#fperiode').val()
    if (prodi==0||angkatan==0||periode_keluar==0||tgl_keluar=='') {
        alert('Data isian tidak boleh kosong')
        return false
    }
    $('#btn-load-data').attr('disabled','disabled')
    $('#btn-sync-data').attr('disabled','disabled')
    $('#btn-reset-filter').attr('disabled', 'disabled')
    $('.fa-sync-alt').addClass('fa-spin')
    $.ajax({
        url: "./prosesdo",
        data: {
            prodi:prodi,angkatan:angkatan,tgl_keluar:tgl_keluar,periode_keluar:periode_keluar
        },
        type: "post",
        success: function (msg) {
            $('#btn-load-data').removeAttr('disabled')
            $('#btn-sync-data').removeAttr('disabled')
            $('#btn-reset-filter').removeAttr('disabled')
            $('.fa-sync-alt').removeClass('fa-spin')
            // LoadData()
            $('#response').html(msg)
        }
    })
}