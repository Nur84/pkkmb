var table = $('#table-mhs').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "./ajaxkurikulum",
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
$('#fprodi').change(function () {
    table.ajax.reload(null, false);
})
$('#sync').change(function () {
    table.ajax.reload(null, false);
})