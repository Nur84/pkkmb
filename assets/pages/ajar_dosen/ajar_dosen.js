var table = $('#table-ajardos').DataTable({
    "processing": true,
    "serverSide": true,
    "lengthMenu": [10, 25, 50, 75, 100],
    "dom": "Bfrtip",
    "buttons": [
        'copy',
        {
            extend: "excel",
            messageTop:"Daftar Beban SKS Dosen"
        },
        {
            extend: "pdf",
            messageTop:"Daftar Beban SKS Dosen"
        }
    ],
    "ajax": {
        "url": "./ajaxajardosen",
        "type": "POST",
        "data": function (data) {
            data.prodi = $('#fprodi').val()
            data.smt = $('#fsmt').val()
            data.sync = $('#sync').val()
        }
    },
    "orderFixed": [1, 'asc'],
    "rowGroup": {
        "endRender": function (rows, group) {
            var sksAvg = rows
                .data()
                .pluck(6)
                .reduce(function (a, b) { return a + b * 1 }, 0)
            return $('<tr/>')
                .append('<td colspan="6" class="text-right"><strong>Jumlah Beban sks: ' + group + '</strong></td>')
                .append('<td><strong>' + sksAvg.toFixed(0) + '</strong></td>')
                .append('<td/>')
                .append('<td/>')
                .append('<td/>')
        },"dataSrc":1
    },
    "language": {
        "searchPlaceholder": "Cari NPM"
    }
})
function print() {
    var semester = $('#fsmt').val()
    if (semester == 0) {
        $.alert('Semester tidak boleh kosong')
        $('#fsmt').focus()
        return false
    } else {
        $.confirm({
            theme: 'dark',
        draggable: false,
        type: 'orange',
        escapeKey: true,
        animation: 'zoom',
        title: 'Server',
        content: 'Apakah Anda yakin akan mereset seluruh data mahasiswa pada prodi dan semester ini?',
        buttons: {
            sync: {
                text: 'Print',
                action: function () {
                    var w = window.open()
                    $.ajax({
                        data: { semester: $('#fsmt').val() },
                        url: "./rekapajardosen",
                        type: "post",
                        success: function (msg) {
                            // window.location.href=msg.redirect
                            $(w.document.body).html(msg)
                        }
                    })
                    // $.alert('Cetak')
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
function print_pdf() {
    var semester = $('#fsmt').val()
    if (semester == 0) {
        $.alert('Semester tidak boleh kosong')
        $('#fsmt').focus()
        return false
    } else {
        $.confirm({
            theme: 'dark',
        draggable: false,
        type: 'orange',
        escapeKey: true,
        animation: 'zoom',
        title: 'Server',
        content: 'Apakah Anda yakin akan mereset seluruh data mahasiswa pada prodi dan semester ini?',
        buttons: {
            sync: {
                text: 'Print',
                action: function () {
                    var w = window.open()
                    $.ajax({
                        data: { semester: $('#fsmt').val() },
                        url: "./pdfajardosen",
                        type: "post",
                        success: function (msg) {
                            window.location.href=msg.redirect
                            // $(w.document.body).html(msg)
                        }
                    })
                    // $.alert('Cetak')
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
$('#fprodi').change(function () {
    table.ajax.reload(null, false);
})
$('#fsmt').change(function () {
    table.ajax.reload(null, false);
})
$('#sync').change(function () {
    table.ajax.reload(null, false);
})