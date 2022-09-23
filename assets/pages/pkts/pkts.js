var table = $('#table-mhs').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "./getlistalumni",
        "type": "POST",
        "data": function (data) {
            data.prodi = $('#fprodi').val()
            data.periode_lulus = $('#fperiode').val()
        }
    },
    "language": {
        "searchPlaceholder": "Cari NPM"
    }
})
