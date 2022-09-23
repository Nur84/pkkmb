var table = $('#table-mhs').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "./listkontak",
        "type": "POST",
        "data": function (data) {
            data.prodi = $('#fprodi').val()
            data.smt = $('#fsmt').val()
        }
    },
    "language": {
        "searchPlaceholder": "Cari NPM"
    }
})
function filter() {
    var prodi = $('#fprodi').val()
    var smt = $('#fsmt').val()
    var data = { prodi: prodi, smt: smt }
    $.ajax({
        data: data,
        type: "post",
        url: "./test/no_kontak_man",
        success: function (msg) {
            $('#response').html(msg)
        }
    })
}
$('#fprodi').change(function () {
    table.ajax.reload(null, false);
})
$('#fsmt').change(function () {
    table.ajax.reload(null, false);
})
