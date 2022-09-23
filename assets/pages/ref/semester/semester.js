var table = $('#table-semester').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "./../ajaxlistrefsemester",
        "type": "POST",
        
    },
    "language": {
        "searchPlaceholder": "Cari Semester"
    }
})
function setAktif(id) {
    $.confirm({
        theme: 'dark',
        draggable: false,
        type: 'orange',
        escapeKey: true,
        animation: 'zoom',
        title: 'Set Semester Aktif',
        content: 'Apakah Anda yakin akan mengubah periode Aktif?',
        buttons: {
            sync: {
                text: 'Set Aktif',
                action: function () {
                    // $('#btn-sync').attr('disabled','disabled')
                    // $('#btn-filter').attr('disabled','disabled')
                    // $('.fa-sync-alt').addClass('fa-spin')
                    $.ajax({
                        type: "POST",
                        data: {id:id},
                        url: "./setsemesteraktif",
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
                            // $('#btn-sync').removeAttr('disabled')
                            // $('#btn-filter').removeAttr('disabled')
                            // $('.fa-sync-alt').removeClass('fa-spin')
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