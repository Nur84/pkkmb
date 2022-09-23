var table = $('#table-mhs').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "./ajaxmatkul",
        "type": "POST",
        "data": function (data) {
            data.kode_prodi = $('#fprodi').val()
            data.sync = $('#sync').val()
        }
    },
    "language": {
        "searchPlaceholder": "Cari Nama Kelas"
    }
})

function syncmk(id) {
    var data = {
        id: id
    }
    $.confirm({
        theme: 'dark',
        draggable: false,
        type: 'orange',
        escapeKey: true,
        animation: 'zoom',
        title: 'Server',
        content: 'Apakah Anda yakin akan mensinkron data matakuliah ini?',
        buttons: {
            sync: {
                text: 'Sync Mk',
                action: function () {
                    $('.fa-btn-sync').addClass('fa-spin')
                    $('.btn-sync').attr('disabled', 'disabled')
                    $.ajax({
                        type: "POST",
                        data: data,
                        url: "./syncmatkul",
                        success: function (msg) {
                            var pesan = JSON.parse(msg)
                            $.alert({
                                theme: 'dark',
                                type: 'green',
                                title: 'Response',
                                content: "Status : " + pesan.status + "<br>Pesan : " + pesan.pesan
                            })
                            table.ajax.reload(null, false)
                            $('.fa-btn-sync').removeClass('fa-spin')
                            $('.btn-sync').removeAttr('disabled')
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
function syncallmk() {
    var data = {
        kode_prodi: $('#fprodi').val()
    }
    $.confirm({
        theme: 'dark',
        draggable: false,
        type: 'orange',
        escapeKey: true,
        animation: 'zoom',
        title: 'Server',
        content: 'Apakah Anda yakin akan mensinkron semua data matakuliah pada Program Studi ini?',
        buttons: {
            sync: {
                text: 'Sync Mk',
                action: function () {
                    $('.fa-sync-alt').addClass('fa-spin')
                    $('.btn-sync').attr('disabled','disabled')
                    $.ajax({
                        type: "POST",
                        data: data,
                        url: "./syncallmatkul",
                        success: function (msg) {
                            var pesan = JSON.parse(msg)
                            $.alert({
                                theme: 'dark',
                                type: 'green',
                                title: 'Response',
                                content: "Status : " + pesan.status + "<br>Pesan : " + pesan.pesan
                            })
                            table.ajax.reload(null, false)
                            $('.fa-sync-alt').removeClass('fa-spin')
                            $('.btn-sync').removeAttr('disabled')
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
$('#fprodi').change(function () {
    table.ajax.reload(null, false);
})
$('#sync').change(function () {
    table.ajax.reload(null, false);
})