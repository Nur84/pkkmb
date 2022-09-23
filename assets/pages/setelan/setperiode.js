function loadData() {
    var prodi = $('#fprodi').val()
    var semester = $('#fsmt').val()
    var tgl_awal = $('#tgl_awal_kuliah').val()
    var tgl_akhir = $('#tgl_akhir_kuliah').val()
    if (semester == 0) {
        $.alert({
                    theme: 'dark',
                    type: 'blue',
                    title: 'Server',
                    content: 'Semester tidak boleh kosong!'
                })
        return false
    } else {
        $.confirm({
        theme: 'dark',
        draggable: false,
        type: 'orange',
        escapeKey: true,
        animation: 'zoom',
        title: 'Server',
        content: 'Apakah Anda yakin akan data Pendaftar pada semester ini?',
        buttons: {
            sync: {
                text: 'Tampilkan Data',
                action: function () {
                    $('#btn-load-data').attr('disabled','disabled')
                    $('#btn-sync-data').attr('disabled','disabled')
                    $('#btn-reset-filter').attr('disabled','disabled')
                    $('.fa-sync-alt').addClass('fa-spin')
                    $.ajax({
                        type: "POST",
                        data: {
                            prodi: prodi,
                            semester: semester,
                            tgl_awal_kuliah: tgl_awal,
                            tgl_akhir_kuliah:tgl_akhir
                        },
                        url: "./loadtargetpmb",
                        success: function (msg) {
                            $('#response').html(msg)
                            $('.fa-sync-alt').removeClass('fa-spin')
                            $('#btn-load-data').removeAttr('disabled')
                            $('#btn-sync-data').removeAttr('disabled')
                            $('#btn-reset-filter').removeAttr('disabled')
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
    // $.ajax({
    //     type: "post",
    //     data: {
    //         prodi: prodi,
    //         semester: semester,
    //         tgl_awal_kuliah: tgl_awal,
    //         tgl_akhir_kuliah:tgl_akhir
    //     },
    //     url: "./loadtargetpmb",
    //     success: function (msg) {
    //         $('#response').html(msg)
    //     }
    // })
}
function SyncData() {
    var prodi = $('#fprodi').val()
    var semester = $('#fsmt').val()
    var tgl_awal = $('#tgl_awal_kuliah').val()
    var tgl_akhir = $('#tgl_akhir_kuliah').val()
    if (semester == 0 || tgl_awal == '' || tgl_akhir == '') {
        $.alert({
                    theme: 'dark',
                    type: 'blue',
                    title: 'Server',
                    content: 'Semester, tanggal awal dan tanggal akhir kuliah tidak boleh kosong!'
                })
        return false
    } else {
        $.confirm({
        theme: 'dark',
        draggable: false,
        type: 'orange',
        escapeKey: true,
        animation: 'zoom',
        title: 'Server',
        content: 'Apakah Anda yakin akan mengirim data seting periode pada semester ini?',
        buttons: {
            sync: {
                text: 'Set Periode',
                action: function () {
                    $('#btn-load-data').attr('disabled','disabled')
                    $('#btn-sync-data').attr('disabled','disabled')
                    $('#btn-reset-filter').attr('disabled','disabled')
                    $('.fa-sync-alt').addClass('fa-spin')
                    $.ajax({
                        type: "POST",
                        data: {
                            prodi: prodi,
                            semester: semester,
                            tgl_awal_kuliah: tgl_awal,
                            tgl_akhir_kuliah:tgl_akhir
                        },
                        url: "./syncperiode",
                        success: function (msg) {
                            var pesan = JSON.parse(msg)
                            $.alert({
                                theme: 'dark',
                                type: 'green',
                                title: 'Response',
                                // content: "Status Sinkron Biodata Mahasiswa : " + pesan.mahasiswa.status + "<br>Erorr Sinkron Biodata Mahasiswa : " + pesan.mahasiswa.error_desc + "<br>Status Sinkron Registrasi Mahasiswa : " + pesan.mahasiswa_pt.status + "<br>Erorr Sinkron Registrasi Mahasiswa : " + pesan.mahasiswa_pt.error_desc
                                content: "Status Sinkron  : " + pesan.status + "<br>Jumlah Sinkron Berhasil : " + pesan.berhasil.count + "<br>Jumlah Sinkron Gagal : " + pesan.gagal.count
                                // content:"Sinkronisasi Data Selesai"
                            })
                            $('#response').html(msg)
                            $('.fa-sync-alt').removeClass('fa-spin')
                            $('#btn-load-data').removeAttr('disabled')
                            $('#btn-sync-data').removeAttr('disabled')
                            $('#btn-reset-filter').removeAttr('disabled')
                            loadData()
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
    // $.ajax({
    //     type: "post",
    //     data: {
    //         prodi: prodi,
    //         semester: semester,
    //         tgl_awal_kuliah: tgl_awal,
    //         tgl_akhir_kuliah:tgl_akhir
    //     },
    //     url: "./syncperiode",
    //     success: function (msg) {
    //         $('#detail').html(msg)
    //         loadData()
    //     }
    // })
}