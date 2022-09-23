var table = $('#table-mhs').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "./ajaxdosen",
        "type": "POST",
        "data": function (data) {
            data.kode_prodi = $('#fprodi').val()
            data.mulai_smt = $('#fsmt').val()
            data.sync = $('#sync').val()
        }
    },
    "language": {
        "searchPlaceholder": "Cari Nama/NIDN"
    }
})

function getdosen(id) {
    $.confirm({
        theme: 'dark',
        draggable: false,
        type: 'orange',
        escapeKey: true,
        animation: 'zoom',
        title: 'Server',
        content: 'Apakah Anda yakin akan mensinkron data dosen ini?',
        buttons: {
            sync: {
                text: 'Sync Dosen',
                action: function () {
                    $('.page-item').addClass('disabled')
                    $.ajax({
                        data: {
                            id: id
                        },
                        type: "POST",
                        url: "./syncbiodatadosen",
                        success: function (msg) {
                            var pesan = JSON.parse(msg)
                            $('.page-item').removeClass('disabled')
                            $.alert({
                                theme: 'dark',
                                type: 'blue',
                                title: 'Server',
                                escapeKey: true,
                                animation: 'zoom',
                                draggable: false,
                                content: pesan.status + '<br>Pesan : ' + pesan.pesan
                            })
                            table.ajax.reload(null, false);
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

$('#fsmt').change(function () {
    table.ajax.reload(null, false);
})