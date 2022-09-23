var table = $('#table-mhs').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "./getmahasiswa",
        "type": "POST",
        "data": function (data) {
            data.kode_prodi = $('#fprodi').val()
            data.mulai_smt = $('#fsmt').val()
            data.sync = $('#sync').val()
            data.status_keluar = $('#fjeniskeluar').val()
            data.jenis_daftar = $('#fjnsdaftar').val()
        }
    },
    "language": {
        "searchPlaceholder": "Cari NPM"
    }
})

function getSync(id) {
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
        content: 'Apakah Anda yakin akan mensinkron data mahasiswa ini?',
        buttons: {
            sync: {
                text: 'Sync Mhs',
                action: function () {
                    $('#btn-sync-All').attr('disabled', 'disabled')
                    $('.btn-prev-one').attr('disabled', 'disabled')
                    $('.btn-sync-one').attr('disabled', 'disabled')
                    $('#fprodi').attr('disabled', 'disabled')
                    $('#fsmt').attr('disabled', 'disabled')
                    $('#sync').attr('disabled', 'disabled')
                    $('.page-item').addClass('disabled', 'disabled')
                    $('.fa-sync-alt').addClass('fa-spin')
                    $.ajax({
                        type: "POST",
                        data: data,
                        url: "./syncmahasiswa",
                        success: function (msg) {
                            var pesan = JSON.parse(msg)
                            $.alert({
                                theme: 'dark',
                                type: 'green',
                                title: 'Response',
                                content: "Status Sinkron Biodata Mahasiswa : " + pesan.mahasiswa.status + "<br>Erorr Sinkron Biodata Mahasiswa : " + pesan.mahasiswa.error_desc + "<br>Status Sinkron Registrasi Mahasiswa : " + pesan.mahasiswa_pt.status + "<br>Erorr Sinkron Registrasi Mahasiswa : " + pesan.mahasiswa_pt.error_desc
                            })
                            table.ajax.reload(null, false)
                            $('#btn-sync-All').removeAttr('disabled')
                            $('.btn-prev-one').removeAttr('disabled')
                            $('.btn-sync-one').removeAttr('disabled')
                            $('#fprodi').removeAttr('disabled')
                            $('#fsmt').removeAttr('disabled')
                            $('#sync').removeAttr('disabled')
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

function SyncAll() {
    var prodi = $('#fprodi').val()
    var smt = $('#fsmt').val()
    var jns_daftar = $('#fjnsdaftar').val()
    var data = {prodi:prodi, smt:smt,jns_daftar:jns_daftar}
    if (prodi==0||smt==0) {
        $.alert({
                    theme: 'dark',
                    type: 'blue',
                    title: 'Server',
                    content: 'Program Studi dan Semester tidak boleh kosong!'
                })
    } else {
        $.confirm({
            theme: 'dark',
            draggable: false,
            type: 'orange',
            escapeKey: true,
            animation: 'zoom',
            title: 'Server',
            content: 'Apakah Anda yakin akan mensinkron seluruh data mahasiswa pada prodi dan semester ini?',
            buttons: {
                sync: {
                    text: 'Sync Mhs',
                    action: function () {
                        $('#btn-sync-All').attr('disabled', 'disabled')
                        $('.btn-prev-one').attr('disabled', 'disabled')
                        $('.btn-sync-one').attr('disabled', 'disabled')
                        $('#fprodi').attr('disabled', 'disabled')
                        $('#fsmt').attr('disabled', 'disabled')
                        $('#sync').attr('disabled', 'disabled')
                        $('.page-item').addClass('disabled', 'disabled')
                        $('.fa-sync-alt').addClass('fa-spin')
                        $.ajax({
                            type: "POST",
                            data: data,
                            url: "./syncallmahasiswa",
                            success: function (msg) {
                                var pesan = JSON.parse(msg)
                                $.alert({
                                    theme: 'dark',
                                    type: 'green',
                                    title: 'Response',
                                    // content: "Status Sinkron Biodata Mahasiswa : " + pesan.mahasiswa.status + "<br>Erorr Sinkron Biodata Mahasiswa : " + pesan.mahasiswa.error_desc + "<br>Status Sinkron Registrasi Mahasiswa : " + pesan.mahasiswa_pt.status + "<br>Erorr Sinkron Registrasi Mahasiswa : " + pesan.mahasiswa_pt.error_desc
                                    content: "Status Sinkron  : " + pesan.status + "<br>Jumlah Sinkron Biodata Mahasiswa Berhasil : " + pesan.mahasiswa.countberhasil + "<br>Jumlah Sinkron Biodata Mahasiswa Gagal : " + pesan.mahasiswa.countgagal + "<br>Jumlah Sinkron Registrasi Mahasiswa Berhasil : " + pesan.mahasiswa_pt.countberhasil + "<br>Jumlah Sinkron Registrasi Mahasiswa Gagal : " + pesan.mahasiswa_pt.countgagal
                                    // content:msg
                                })
                                table.ajax.reload(null, false)
                                $('#btn-sync-All').removeAttr('disabled')
                                $('.btn-prev-one').removeAttr('disabled')
                                $('.btn-sync-one').removeAttr('disabled')
                                $('#fprodi').removeAttr('disabled')
                                $('#fsmt').removeAttr('disabled')
                                $('#sync').removeAttr('disabled')
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
function ResetAll() {
    var prodi = $('#fprodi').val()
    var smt = $('#fsmt').val()
    var data = {prodi:prodi, smt:smt}
    if (prodi==0||smt==0) {
        $.alert({
                    theme: 'dark',
                    type: 'blue',
                    title: 'Server',
                    content: 'Program Studi dan Semester tidak boleh kosong!'
                })
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
                text: 'Sync Mhs',
                action: function () {
                    $('#btn-sync-All').attr('disabled', 'disabled')
                    $('#btn-reset-All').attr('disabled', 'disabled')
                    $('.btn-prev-one').attr('disabled', 'disabled')
                    $('.btn-sync-one').attr('disabled', 'disabled')
                    $('#fprodi').attr('disabled', 'disabled')
                    $('#fsmt').attr('disabled', 'disabled')
                    $('#sync').attr('disabled', 'disabled')
                    $('.page-item').addClass('disabled', 'disabled')
                    $('.fa-sync-alt').addClass('fa-spin')
                    $.ajax({
                        type: "POST",
                        data: data,
                        url: "./resetallmahasiswa",
                        success: function (msg) {
                            // var pesan = JSON.parse(msg)
                            $.alert({
                                theme: 'dark',
                                type: 'green',
                                title: 'Response',
                                // content: "Status Sinkron Biodata Mahasiswa : " + pesan.mahasiswa.status + "<br>Erorr Sinkron Biodata Mahasiswa : " + pesan.mahasiswa.error_desc + "<br>Status Sinkron Registrasi Mahasiswa : " + pesan.mahasiswa_pt.status + "<br>Erorr Sinkron Registrasi Mahasiswa : " + pesan.mahasiswa_pt.error_desc
                                // content: "Status Sinkron  : " + pesan.status + "<br>Jumlah Sinkron Biodata Mahasiswa Berhasil : " + pesan.mahasiswa.countberhasil + "<br>Jumlah Sinkron Biodata Mahasiswa Gagal : " + pesan.mahasiswa.countgagal + "<br>Jumlah Sinkron Registrasi Mahasiswa Berhasil : " + pesan.mahasiswa_pt.countberhasil + "<br>Jumlah Sinkron Registrasi Mahasiswa Gagal : " + pesan.mahasiswa_pt.countgagal
                                content:"Reset Selesai"
                            })
                            console.log(msg)
                            table.ajax.reload(null, false)
                            $('#btn-sync-All').removeAttr('disabled')
                            $('#btn-reset-All').removeAttr('disabled')
                            $('.btn-prev-one').removeAttr('disabled')
                            $('.btn-sync-one').removeAttr('disabled')
                            $('#fprodi').removeAttr('disabled')
                            $('#fsmt').removeAttr('disabled')
                            $('#sync').removeAttr('disabled')
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

function biodata(id) {
    $.ajax({
        type: "post",
        data: { id: id },
        url: "./../biodatamhs",
        success: function (msg) {
            $('#content-detail').html(msg)
            $('#biodata').addClass('active')
            $('#abiodata').addClass('text-white')
            $('#history_dik').removeClass('active')
            $('#ahistory_dik').removeClass('text-white')
            $('#listdok').removeClass('active')
            $('#alistdok').removeClass('text-white')
        }
    })
}
function historydik(id) {
    $.ajax({
        type: "post",
        data: { id: id },
        url: "./../historydikmhs",
        success: function (msg) {
            $('#content-detail').html(msg)
            $('#history_dik').addClass('active')
            $('#ahistory_dik').addClass('text-white')
            $('#biodata').removeClass('active')
            $('#abiodata').removeClass('text-white')
            $('#listdok').removeClass('active')
            $('#alistdok').removeClass('text-white')
        }
    })
}
function listdok(id) {
    $.ajax({
        type:"post",
        data:{id:id},
        url:"./../listdokmhs",
        success: function (msg) {
            $('#content-detail').html(msg)
            $('#listdok').addClass('active')
            $('#alistdok').addClass('text-white')
            $('#history_dik').removeClass('active')
            $('#ahistory_dik').removeClass('text-white')
            $('#biodata').removeClass('active')
            $('#abiodata').removeClass('text-white')
        }
    })
}
function detailhisdik(id) {
    $.ajax({
        type:"post",
        data:{id:id},
        url:"./../detailhistorydikmhs",
        success:function(msg){
            $('#sub-detail').html(msg)
        }
    })
}
function edithisdik(id) {
    $.ajax({
        type:"post",
        data:{id:id},
        url:"./../edithistorydikmhs",
        success:function(msg){
            $('#sub-detail').html(msg)
        }
    })
}
function mutasimhs(id) {
    $.ajax({
        type:"post",
        data:{id:id},
        url:"./../addmutasimhs",
        success:function(msg){
            $('#sub-detail').html(msg)
        }
    })
}

function listnpmunmaku() {
    var prodi = $('#fprodidituju').val()
    var smt = $('#fsmtditerima').val()
    var data = { prodi: prodi, smt: smt }
    $.ajax({
        type: "post",
        data: data,
        url: "./../listnpmunmaku",
        success: function (msg) {
            $('#npm_unmaku').html(msg)
        }
    })
}
function listtempnpmpmb() {
    var prodi = $('#fprodidituju').val()
    var smt = $('#fsmtditerima').val()
    var data = { prodi: prodi, smt: smt }
    $.ajax({
        type: "post",
        data: data,
        url: "./../listtempnpmpmb",
        success: function (msg) {
            $('#npm_pmb').html(msg)
        }
    })
}

function ceknpm() {
    listnpmunmaku()
    listtempnpmpmb()
}

function getskskonversi(id,prodi,nipd) {
    $.ajax({
        type: "post",
        data: { id_mhs: id, kode_prodi: prodi },
        url: "",
        success: function () {
            detailhisdik(nipd)
        }
    })
}

function mutasiinternal() {
    var npm_asal = $('#npm_asal').val()
    var id_mhs = $('#id_mhs').val()
    var npm_baru = $('#npm_baru').val()
    var prodi_baru = $('#fprodidituju').val()
    var tgl_diterima = $('#tgl_mutasi').val()
    var mulai_smt = $('#fsmtditerima').val()
    var smt_awal = $('#smt_diterima').val()
    var sks_konversi = $('#sks_konversi').val()
    var kelas = $('#kelas').val()
    var data = {
        npm_asal: npm_asal,
        id_mhs: id_mhs,
        npm_baru: npm_baru,
        prodi_baru: prodi_baru,
        tgl_diterima: tgl_diterima,
        mulai_smt: mulai_smt,
        smt_awal: smt_awal,
        sks_konversi: sks_konversi,
        kelas:kelas
    }
    $.ajax({
        type: "post",
        data: data,
        url: "./../domutasimhs",
        success:function(msg) {
            console.log(msg)
            window.location.reload()
        }
    })
}

function prevdok(id) {
    $.ajax({
        type:"post",
        data:{id:id},
        url:"./../prevdokmhs",
        success:function(msg){
            $('#sub-detail').html(msg)
        }
    })
}
function ResetFilter() {
    $('#form-filter')[0].reset()
    table.ajax.reload(null, false);
}
$('#fprodi').change(function () {
    table.ajax.reload(null, false);
})
$('#fsmt').change(function () {
    table.ajax.reload(null, false);
})
$('#fjnsdaftar').change(function () {
    table.ajax.reload(null, false);
})
$('#fjeniskeluar').change(function () {
    table.ajax.reload(null, false);
})
$('#sync').change(function () {
    table.ajax.reload(null, false);
})

