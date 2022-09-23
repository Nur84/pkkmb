var table = $('#table-knm').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "./ajaxknm",
        "type": "POST",
        "data": function (data) {
            data.kode_prodi = $('#fprodi').val()
            data.mulai_smt = $('#fsmt').val()
        }
    },
    "language": {
        "searchPlaceholder": "Cari Nama/NIDN"
    }
})

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
        url: "./../lokasiknm",
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
function detailpesertaknm() {
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
        url: "./../listpesertaknm",
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

function syncknm() {
    var id = $(location).attr('href').split("/").splice(5, 6).join("/");
    var id_prodi = $('#id_prodi').val()
    var id_ta = $('#id_ta').val()
    var judul = $('#judul').val()
    var sdm = $('#sdm').val()
    var loc = $('#loc').val()
    var no_sk = $('#no_sk').val()
    var tgl_sk = $('#tgl_sk').val()
    var data = {
        id:id,
        id_prodi:id_prodi,
        id_ta:id_ta,
        judul:judul,
        sdm:sdm,
        loc:loc,
        no_sk:no_sk,
        tgl_sk:tgl_sk}
        // alert(id_prodi)
    $.confirm({
        theme: 'dark',
        draggable: false,
        type: 'orange',
        escapeKey: true,
        animation: 'zoom',
        title: 'Server',
        content: 'Apakah Anda yakin akan mensinkron data aktivitas ini?',
        buttons: {
            sync: {
                text: 'Sync Aktivitas',
                action: function () {
                    $('#fa-load').addClass('fa-spin')
                    $('#btn-load').attr('disabled', 'disabled')
                    $('#btn-send').attr('disabled', 'disabled')
                    $.ajax({
                        data: data,
                        type: "POST",
                        url: "./../syncknm",
                        success: function (msg) {
                            var pesan = JSON.parse(msg)
                            $('#fa-load').removeClass('fa-spin')
                            $('#btn-load').removeAttr('disabled')
                            $('#btn-send').removeAttr('disabled')
                            $.alert({
                                theme: 'dark',
                                type: 'blue',
                                title: 'Server',
                                escapeKey: true,
                                animation: 'zoom',
                                draggable: false,
                                content: pesan.status + '<br>Pesan : ' + pesan.pesan
                                // content:msg
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
    
    // $.ajax({
    //     type:"post",
    //     data:data,
    //     url: "./../syncknm",
    //     success:function(msg){
    //         alert(msg)
    //     }
    // })
}

// function detaillokasiknm(id) {
//     var id = $(location).attr('href').split("/").splice(5, 6).join("/");
//     var data = {
//         id: id
//     }
//     $('#fa-load').addClass('fa-spin')
//     $('#btn-load').attr('disabled', 'disabled')
//     $('.fa-sync-mkkur').addClass('fa-spin')
//     $('.btn-sync-mkkur').attr('disabled', 'disabled')
//     $.ajax({
//         type: "POST",
//         data: data,
//         url: "./../lokasiknm",
//         success: function (msg) {
//             $('#result').html(msg)
//             $('#fa-load').removeClass('fa-spin')
//             $('#btn-load').removeAttr('disabled')
//             $('.fa-sync-mkkur').removeClass('fa-spin')
//             $('.btn-sync-mkkur').removeAttr('disabled', 'disabled')
//             $('.btn-sync-peserta').removeClass('fa-spin')
//             $('.btn-sync-peserta').removeAttr('disabled')
//             // alert(msg)
//         }
//     })
// }