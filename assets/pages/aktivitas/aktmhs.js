var table = $('#table-aktmhs').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "./ajaxaktmhs",
        "type": "POST",
        "data": function (data) {
            data.prodi = $('#fprodi').val()
            data.smt = $('#fsmt').val()
            data.akt = $('#fkeg').val()
        }
    },
    "language": {
        "searchPlaceholder": "Cari Judul"
    }
})
function syncinfo() {
    $('#status-info').append('<div id="progress-info"><div class="alert alert-info" ><span id="content-info"></span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div>')
}
function detail(id) {
    var data = { id: id }
    var w = window.open()
    $.ajax({
        type: "post",
        data: data,
        url: "./aktivitas_mahasiswa/detail_aktivitas",
        success: function (msg) {
            $(w.document.body).html(msg)
        }
    })
}
function syncall() {
    var smt = $('#fsmt').val()
    if (smt==0) {
        $.alert({
                    theme: 'dark',
                    type: 'blue',
                    title: 'Server',
                    content: 'Semester tidak boleh kosong!'                
        })
    } else {
        $.confirm({
        theme: 'dark',
        draggable: false,
        type: 'orange',
        escapeKey: true,
        animation: 'zoom',
        title: 'Server',
        content: 'Apakah Anda yakin akan mensinkron seluruh data aktivitas mahasiswa pada semester ini?',
        buttons: {
            sync: {
                text: 'Sync Aktivitas',
                action: function () {
                    // var progresInfo = setInterval(loadInfo,500000)
                    syncinfo()
                    $('#fprodi').attr('disabled', 'disabled')
                    $('#fsmt').attr('disabled', 'disabled')
                    $('#btn-sync').attr('disabled', 'disabled')
                    $('#btn-filter').attr('disabled', 'disabled')
                    $('.page-item').addClass('disabled', 'disabled')
                    $('.fa-sync-alt').addClass('fa-spin')
                    $('#content-info').text('Tunggu, sedang mengirim data aktivitas mahasiswa ke Server Feeder PDDIKTI')
                    $.ajax({
                        type: "POST",
                        data: {smt:smt},
                        url: "./syncaktmhs",
                        success: function (msg) {
                            $('#content-info').text('')
                            var pesan = JSON.parse(msg)
                            $.alert({
                                theme: 'dark',
                                type: 'green',
                                title: 'Response',
                                /*
                                'status' => 'selesai',
                'all_record' => $count_aktivitas,
                'sukses_akt' => $count_sukses_akt,
                'gagal_akt' => $count_gagal_akt,
                'sukses_anggota' => $count_sukses_anggota,
                'gagal_anggota' => $count_gagal_anggota,
                'sukses_bimbing' => $count_sukses_bimbing,
                'gagal_bimbing' => $count_gagal_bimbing,
                'sukes_uji' => $count_sukses_uji,
                'gagal_uji' => $count_gagal_uji
                                 */
                                // content: "Status Sinkron Biodata Mahasiswa : " + pesan.mahasiswa.status + "<br>Erorr Sinkron Biodata Mahasiswa : " + pesan.mahasiswa.error_desc + "<br>Status Sinkron Registrasi Mahasiswa : " + pesan.mahasiswa_pt.status + "<br>Erorr Sinkron Registrasi Mahasiswa : " + pesan.mahasiswa_pt.error_desc
                                content: "Status Sinkron  : " + pesan.status + "<br>Jumlah Data : "+pesan.all_record+"<br>Jumlah Sinkron Aktivitas Berhasil : " + pesan.sukses_akt + "<br>Jumlah Sinkron Aktivitas Gagal : " + pesan.gagal_akt +"<br>Jumlah Sinkron Anggota Berhasil : " + pesan.sukses_anggota + "<br>Jumlah Sinkron Anggota Gagal : " + pesan.gagal_anggota+"<br>Jumlah Sinkron Pembimbing Berhasil : " + pesan.sukses_bimbing + "<br>Jumlah Sinkron Pembimbing Gagal : " + pesan.gagal_bimbing+"<br>Jumlah Sinkron Penguji Berhasil : " + pesan.sukses_uji + "<br>Jumlah Sinkron Penguji Gagal : " + pesan.gagal_uji
                                // content:"Sinkronisasi Selesai"
                            })
                            console.log(msg)
                            table.ajax.reload(null, false)
                            // clearInterval(progresInfo)
                            loadInfo()

                            $('#content-info').text("Status Sinkron  : " + pesan.pesan + "  Jumlah Data : "+pesan.jumlah+"  Jumlah Sinkron Nilai Berhasil : " + pesan.sukses + "  Jumlah Sinkron Nilai Gagal : " + pesan.gagal)
                            $('#fprodi').removeAttr('disabled')
                            $('#fsmt').removeAttr('disabled')
                            $('#btn-syncAll').removeAttr('disabled')
                            $('.page-item').removeClass('disabled')
                            $('.fa-sync-alt').removeClass('fa-spin')
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
}
$('#fprodi').change(function () {
    table.ajax.reload(null, false);
})
$('#fsmt').change(function () {
    table.ajax.reload(null, false);
})
$('#fkeg').change(function () {
    table.ajax.reload(null, false);
})