var table = $('#table-mhs').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "./ajaxnilai",
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

function loadInfo() {
    $.ajax({
        url: "./infonilai",
        data: {
            kode_prodi: $('#fprodi').val(),
            mulai_smt: $('#fsmt').val()
        },
        type: "post",
        success: function (msg) {
            $('#infonilai').html(msg)
        }
    })
}
function nilaiNotSync() {
    $.ajax({
        url: "./infonilainotsync",
        success: function (msg) {
            var hasil = JSON.parse(msg)
            $('#infonilainotsync').text(hasil.nilai)
        }
    })
}
function syncinfo() {
    $('#status-info').append('<div id="progress-info"><div class="alert alert-info" ><span id="content-info"></span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div>')
}

function syncAllNilai() {
    var prodi = $('#fprodi').val()
    var semester = $('#fsmt').val()
    var data ={prodi:prodi,semester:semester}
    if (semester==0) {
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
        content: 'Apakah Anda yakin akan mensinkron seluruh data nilai mahasiswa pada prodi dan semester ini?',
        buttons: {
            sync: {
                text: 'Sync Nilai',
                action: function () {
                    // var progresInfo = setInterval(loadInfo,500000)
                    $('#progress-info').remove()
                    syncinfo()
                    $('#fprodi').attr('disabled', 'disabled')
                    $('#fsmt').attr('disabled', 'disabled')
                    $('#btn-syncAll').attr('disabled', 'disabled')
                    $('.page-item').addClass('disabled', 'disabled')
                    $('.fa-sync-alt').addClass('fa-spin')
                    $('#content-info').text('Tunggu, sedang mengirim data nilai ke Server Feeder PDDIKTI')
                    $.ajax({
                        type: "POST",
                        data: data,
                        url: "./syncnilai",
                        beforeSend: function () {
                            $('#process').css('display','block')
                        },
                        success: function (msg) {
                            $('#content-info').text('')
                            var pesan = JSON.parse(msg)
                            var percentage = 0
                            var timer = setInterval(function () {
                                percentage = percentage + 5
                                progressBarProcess(percentage,timer)
                            },1000)
                            $.alert({
                                theme: 'dark',
                                type: 'green',
                                title: 'Response',
                                // content: "Status Sinkron Biodata Mahasiswa : " + pesan.mahasiswa.status + "<br>Erorr Sinkron Biodata Mahasiswa : " + pesan.mahasiswa.error_desc + "<br>Status Sinkron Registrasi Mahasiswa : " + pesan.mahasiswa_pt.status + "<br>Erorr Sinkron Registrasi Mahasiswa : " + pesan.mahasiswa_pt.error_desc
                                content: "Status Sinkron  : " + pesan.pesan + "<br>Jumlah Data : "+pesan.jumlah+"<br>Jumlah Sinkron Nilai Berhasil : " + pesan.sukses + "<br>Jumlah Sinkron Nilai Gagal : " + pesan.gagal 
                                // content:"Sinkronisasi Selesai"
                            })
                            console.log(msg)
                            table.ajax.reload(null, false)
                            nilaiNotSync()
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
function progressBarProcess(percentage,timer) {
    $('#prosesbar').css('width', percentage + '%')
    if (percentage > 100) {
        clearInterval(timer)
    }
}
$('#fprodi').change(function () {
    table.ajax.reload(null, false);
    loadInfo()
})
$('#fsmt').change(function () {
    table.ajax.reload(null, false);
    loadInfo()
})
$('#sync').change(function () {
    table.ajax.reload(null, false);
})
loadInfo()
nilaiNotSync()