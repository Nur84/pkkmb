var table = $('#table-mhs').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "./ajaxpesertakelas",
        "type": "POST",
        "data": function (data) {
            data.kode_prodi = $('#fprodi').val()
            data.mulai_smt = $('#fsmt').val()
            data.sync = $('#sync').val()
        }
    },
    "language": {
        "searchPlaceholder": "Cari Nama Kelas"
    }
})

function syncAllPesertaKelas() {
    var prodi = $('#fprodi').val()
    var smt = $('#fsmt').val()
    var data = {
        prodi: prodi,
        smt: smt
    }
    if (prodi == 0 || smt == 0) {
        $.alert({
            theme: 'dark',
            type: 'red',
            title: 'Server',
            content: 'Program studi dan Semester tidak boleh kosong'
        })
        return false
    }
    $.confirm({
        theme: 'dark',
        draggable: false,
        type: 'orange',
        escapeKey: true,
        animation: 'zoom',
        title: 'Server',
        content: 'Apakah Anda yakin akan mensinkron seluruh peserta kelas program studi pada semester ini?',
        buttons: {
            sync: {
                text: 'Sync Kls',
                action: function () {
                    $('#syncKelasDosen').addClass('fa-spin')
                    $('#fprodi').attr('disabled', 'disabled')
                    $('#fsmt').attr('disabled', 'disabled')
                    $('#sync').attr('disabled', 'disabled')
                    $('#btn-syncAll').attr('disabled', 'disabled')
                    $('#alert-info').text('Tunggu, sedang mengirim data')
                    $('.btn-sync-perkelas').attr('disabled', 'disabled')
                    $('.sync-perkelas').addClass('fa-spin')
                    $('.btn-ajardosenperkelas').attr('disabled', 'disabled')
                    $('.fa-ajardosenperkelas').addClass('fa-spin')
                    $('.page-item').addClass('disabled')
                    $('.btn-detail').attr('disabled', 'disabled')
                    $('.fa-sync-krs').addClass('fa-spin')
                    $.ajax({
                        data: data,
                        type: "POST",
                        url: "./syncallpesertakelas",
                        success: function (msg) {
                            var pesan = JSON.parse(msg)
                            $('#syncKelasDosen').removeClass('fa-spin')
                            $('#fprodi').removeAttr('disabled')
                            $('#fsmt').removeAttr('disabled')
                            $('#sync').removeAttr('disabled')
                            $('#btn-syncAll').removeAttr('disabled')
                            $('#alert-info').text('')
                            $('.btn-sync-perkelas').removeAttr('disabled')
                            $('.sync-perkelas').removeClass('fa-spin')
                            $('.btn-ajardosenperkelas').removeAttr('disabled')
                            $('.fa-ajardosenperkelas').removeClass('fa-spin')
                            $('.page-item').removeClass('disabled')
                            $('.btn-detail').removeAttr('disabled')
                            $('.fa-sync-krs').removeClass('fa-spin')
                            $.alert({
                                theme: 'dark',
                                type: 'blue',
                                title: 'Server',
                                escapeKey: true,
                                animation: 'zoom',
                                draggable: false,
                                // content: msg
                                content: pesan.status + '<br>Jumlah data peserta kelas berhasil disinkron : ' + pesan.jml_sukses + '<br>Jumlah data peserta kelas gagal disinkron : ' + pesan.jml_gagal
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

function updateIdKelas(id) {
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
        content: 'Apakah Anda yakin akan mengupdate Id Kelas Kuliah untuk peserta KRS pada kelas ini?',
        buttons: {
            sync: {
                text: 'Sync Kls',
                action: function () {
                    $('#syncKelasDosen').addClass('fa-spin')
                    $('#fprodi').attr('disabled', 'disabled')
                    $('#fsmt').attr('disabled', 'disabled')
                    $('#sync').attr('disabled', 'disabled')
                    $('#btn-syncAll').attr('disabled', 'disabled')
                    $('#alert-info').text('Tunggu, sedang mengirim data')
                    $('.btn-sync-perkelas').attr('disabled', 'disabled')
                    $('.sync-perkelas').addClass('fa-spin')
                    $('.btn-ajardosenperkelas').attr('disabled', 'disabled')
                    $('.fa-ajardosenperkelas').addClass('fa-spin')
                    $('.page-item').addClass('disabled')
                    $('.btn-detail').attr('disabled', 'disabled')
                    $('.btn-updateidkls').attr('disabled', 'disabled')
                    $('.fa-updateidkls').addClass('fa-spin')
                    $.ajax({
                        data: data,
                        type: "POST",
                        url: "./updateidkls",
                        success: function (msg) {
                            // var pesan = JSON.parse(msg)
                            table.ajax.reload(null, false);
                            $('#syncKelasDosen').removeClass('fa-spin')
                            $('#fprodi').removeAttr('disabled')
                            $('#fsmt').removeAttr('disabled')
                            $('#sync').removeAttr('disabled')
                            $('#btn-syncAll').removeAttr('disabled')
                            $('#alert-info').text('')
                            $('.btn-sync-perkelas').removeAttr('disabled')
                            $('.sync-perkelas').removeClass('fa-spin')
                            $('.btn-ajardosenperkelas').removeAttr('disabled')
                            $('.fa-ajardosenperkelas').removeClass('fa-spin')
                            $('.page-item').removeClass('disabled')
                            $('.btn-detail').removeAttr('disabled')
                            $('.btn-updateidkls').removeAttr('disabled')
                            $('.fa-updateidkls').removeClass('fa-spin')
                            $.alert({
                                theme: 'dark',
                                type: 'blue',
                                title: 'Server',
                                escapeKey: true,
                                animation: 'zoom',
                                draggable: false,
                                content: 'Data berhasil diupdate'
                                // content: pesan.status + '<br>Jumlah data kelas berhasil disinkron : ' + pesan.jml_kelas_berhasil + '<br>Jumlah data kelas gagal disinkron : ' + pesan.jml_kelas_gagal + '<br>Jumlah dosen pengajar berhasil disinkron : ' + pesan.jml_ajar_berhasil + '<br>Jumlah dosen pengajar gagal disinkron : ' + pesan.jml_ajar_gagal
                            })

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
$('#fsmt').change(function () {
    table.ajax.reload(null, false);
})
$('#sync').change(function () {
    table.ajax.reload(null, false);
})