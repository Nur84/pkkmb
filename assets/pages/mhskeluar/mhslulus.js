var table = $('#table-mhs').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "./ajaxmhslulus",
        "type": "POST",
        "data": function (data) {
            data.kode_prodi = $('#fprodi').val()
            data.mulai_smt = $('#fsmt').val()
            data.sync = $('#sync').val()
        }
    },
    "language": {
        "searchPlaceholder": "Cari Nama Lulusan"
    }
})