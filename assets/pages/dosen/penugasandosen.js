var table = $('#table-mhs').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "./ajaxpenugasandosen",
        "type": "POST",
        "data": function (data) {
            data.ta = $('#fsmt').val()
        }
    },
    "language": {
        "searchPlaceholder": "Cari Nama/NIDN"
    }
})

function tugasdosen(id,ta) {
    // alert(id)
    // var ta = $('#fsmt').val()
    // var nidn = "";
    // nidn = id;
    if (ta == 0) {
        $.alert({
            theme: 'dark',
            type: 'red',
            title: 'Server',
            content: 'Tahun Akademik tidak boleh kosong'
        })
        $('#fsmt').focus()
        return false
    }
    $.confirm({
        theme: 'dark',
        draggable: false,
        type: 'orange',
        escapeKey: true,
        animation: 'zoom',
        title: 'Server',
        content: 'Apakah Anda yakin akan mensinkron data penugasan dosen, dengan NIDN: '+id+', pada Tahun Akademik: '+ta+'?',
        // content: 'NIDN: '+id+', semester: '+smt,
        buttons: {
            sync: {
                text: 'Sync Dosen',
                action: function () {
                    $('.page-item').addClass('disabled')
                    $.ajax({
                        data: {
                            ta: ta,
                            id: id
                        },
                        type: "POST",
                        url: "./syncpenugasandosen",
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
    // $.ajax({
    //     type: "POST",
    //     data: {
    //         ta: $('#fsmt').val(),
    //         id: id
    //     },
    //     url: "./syncpenugasandosen",
    //     success: function (msg) {
    //         alert(msg)
    //     }
    // })
}

function tugassemester() {
    // alert(id)
    var ta = $('#fsmt').val()
    if (ta == 0) {
        $.alert({
            theme: 'dark',
            type: 'red',
            title: 'Server',
            content: 'Tahun Akademik tidak boleh kosong'
        })
        $('#fsmt').focus()
        return false
    }
    $.confirm({
        theme: 'dark',
        draggable: false,
        type: 'orange',
        escapeKey: true,
        animation: 'zoom',
        title: 'Server',
        content: 'Apakah Anda yakin akan mensinkron data penugasan dosen ini?',
        buttons: {
            sync: {
                text: 'Sync Dosen',
                action: function () {
                    $('.page-item').addClass('disabled')
                    $('#sync-all').addClass('disabled')
                    $('.fa-tosync').addClass('disabled')
                    $('.fa-tosync').addClass('fa-spin')
                    $.ajax({
                        data: {
                            ta: $('#fsmt').val()
                        },
                        type: "POST",
                        url: "./syncpenugasansemuadosen",
                        success: function (msg) {
                            var pesan = JSON.parse(msg)
                            $('.page-item').removeClass('disabled')
                            $('#sync-all').removeClass('disabled')
                            $('.fa-tosync').removeClass('disabled')
                            $('.fa-tosync').removeClass('fa-spin')
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
    // $.ajax({
    //     type: "POST",
    //     data: {
    //         ta: $('#fsmt').val(),
    //         id: id
    //     },
    //     url: "./syncpenugasandosen",
    //     success: function (msg) {
    //         alert(msg)
    //     }
    // })
}
$('#fsmt').change(function () {
    table.ajax.reload(null, false);
})