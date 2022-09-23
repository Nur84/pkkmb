var table = $('#table-akm').DataTable({
    "processing": true,
    "serverSide": true,
    "lengthMenu": [[5,10], [5,10]],
    "ajax": {
        "url": "./ajaxlistakm",
        "type": "POST",
        "data": function (data) {
            data.prodi = $('#fprodi').val()
            data.semester = $('#fsmt').val()
            data.angkatan = $('#angkatan').val()
        }
    },
    "language": {
        "searchPlaceholder": "Cari NPM"
    }
})

function filter() {
    table.ajax.reload(null,false)
}

function syncall() {
    var prodi = $('#fprodi').val()
    var semester = $('#fsmt').val()
    var angkatan = $('#angkatan').val()
    if (prodi == 0 || semester == 0 || angkatan == 0) {
        $.alert({
            theme: 'dark',
            type: 'red',
            title: 'Warning',
            content: 'Program Studi, Semester dan Angkatan tidak boleh kosong'
        })
        return false
    } else {
        $.confirm({
            theme: 'dark',
            draggable: false,
            type: 'orange',
            escapeKey: true,
            animation: 'zoom',
            title: 'Sinkron AKM',
            content: 'Apakah Anda yakin akan mensinkron Aktivitas Kuliah Mahasiswa program studi ini pada angkatan '+angkatan+'?',
            buttons: {
                sync: {
                    text: 'Sync Akm',
                    action: function () {
                        $('#btn-sync').attr('disabled','disabled')
                        $('#btn-filter').attr('disabled','disabled')
                        $('.fa-sync-alt').addClass('fa-spin')
                        $.ajax({
                            type: "POST",
                            data: {prodi:prodi,semester:semester,angkatan:angkatan},
                            url: "./syncakm",
                            success: function (msg) {
                                // var pesan = JSON.parse(msg)
                                $.alert({
                                    theme: 'dark',
                                    type: 'green',
                                    title: 'Response',
                                    content: msg
                                    // content: "Status Sinkron Biodata Mahasiswa : " + pesan.mahasiswa.status + "<br>Erorr Sinkron Biodata Mahasiswa : " + pesan.mahasiswa.error_desc + "<br>Status Sinkron Registrasi Mahasiswa : " + pesan.mahasiswa_pt.status + "<br>Erorr Sinkron Registrasi Mahasiswa : " + pesan.mahasiswa_pt.error_desc
                                })
                                table.ajax.reload(null, false)
                                $('#btn-sync').removeAttr('disabled')
                                $('#btn-filter').removeAttr('disabled')
                                $('.fa-sync-alt').removeClass('fa-spin')
                            }
                        })

                    }
                },
                batal: function () {
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
}
