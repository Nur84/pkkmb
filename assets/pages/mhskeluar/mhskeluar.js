function cekdata() {
    $('#response').html('')
    var form = $('#formtoupload')[0]
    var form_data = new FormData(form)
    $('#btn-upload').attr('disabled', 'disabled')
    $('#btn-checkAll').attr('disabled', 'disabled')
    $('#btn-checkAll').text('Sedang memproses data ...')
    $.ajax({
        url: "./cekdaftarmhslulus",
        type: "POST",
        enctype: "multipart/form-data",
        data: form_data,
        contentType: false,
        cache: false,
        processData: false,
        success: function (msg) {
            $('#response').html(msg)
            $('#btn-checkAll').removeAttr('disabled')
            $('#btn-upload').removeAttr('disabled')
            $('#btn-checkAll').text('Cek Data')
            // form.reset()
            // table.ajax.reload(null, false)
        }
    })

}
function uploaddata() {
    $('#response').html('')
    var form = $('#formtoupload')[0]
    var form_data = new FormData(form)
    $.confirm({
            theme: 'dark',
            draggable: false,
            type: 'red',
            escapeKey: true,
            animation: 'zoom',
            title: 'Server',
            content: 'Apakah Anda sudah memvalidasi/cek data lulusan pada daftar ini?',
            buttons: {
                sudah: {
                    text: 'Sudah',
                    action: function () {
                        $('#btn-upload').attr('disabled', 'disabled')
                        $('#btn-checkAll').attr('disabled', 'disabled')
                        $('#btn-upload').text('Sedang memproses data ...')
                        $.ajax({
                            url: "./uploaddaftarmhslulus",
                            type: "POST",
                            enctype: "multipart/form-data",
                            data: form_data,
                            contentType: false,
                            cache: false,
                            processData: false,
                            success: function (msg) {
                                $('#response').html(msg)
                                $('#btn-upload').removeAttr('disabled')
                                $('#btn-checkAll').removeAttr('disabled')
                                $('#btn-upload').text('Upload Data')
                                form.reset()
                            }
                        })

                    }
                },
                belum: function () {
                    $.alert({
                        theme: 'dark',
                        type: 'blue',
                        title: 'Server',
                        content: 'Aksi dibatalkan'
                    })
                }
            }
    })
    
    
}