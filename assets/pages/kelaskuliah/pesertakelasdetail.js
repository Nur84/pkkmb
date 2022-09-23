function detailpesertakelas() {
    var id = $(location).attr('href').split("/").splice(5, 6).join("/");
    var data = {
        id: id
    }
    $('#fa-load').addClass('fa-spin')
    $('#btn-load').attr('disabled', 'disabled')
    $('.fa-sync-mkkur').addClass('fa-spin')
    $('.btn-sync-mkkur').attr('disabled', 'disabled')
    $.ajax({
        type: "POST",
        data: data,
        url: "./../pesertakelasdetailvw",
        success: function (msg) {
            $('#result').html(msg)
            $('#fa-load').removeClass('fa-spin')
            $('#btn-load').removeAttr('disabled')
            $('.fa-sync-mkkur').removeClass('fa-spin')
            $('.btn-sync-mkkur').removeAttr('disabled', 'disabled')
            $('.btn-sync-peserta').removeClass('fa-spin')
            $('.btn-sync-peserta').removeAttr('disabled')
            // alert(msg)
        }
    })
}

function syncpeserta(id) {
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
                text: 'Sync Peserta',
                action: function () {
                    $('.btn-sync-peserta').addClass('fa-spin')
                    $('.btn-sync-peserta').attr('disabled', 'disabled')
                    $.ajax({
                        type: "POST",
                        data: data,
                        url: "./../syncpesertakelas",
                        success: function (msg) {
                            var pesan = JSON.parse(msg)
                            detailpesertakelas()

                            $.alert({
                                theme: 'dark',
                                type: 'blue',
                                title: 'Server',
                                escapeKey: true,
                                animation: 'zoom',
                                draggable: false,
                                content: 'Status: ' + pesan.status + '<br>' + 'Pesan: ' + pesan.pesan
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