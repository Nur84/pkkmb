function detailkur() {
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
        url: "./../detailmkkur",
        success: function (msg) {
            $('#result').html(msg)
            $('#fa-load').removeClass('fa-spin')
            $('#btn-load').removeAttr('disabled')
            $('.fa-sync-mkkur').removeClass('fa-spin')
            $('.btn-sync-mkkur').removeAttr('disabled', 'disabled')
            // alert(msg)
        }
    })
}

function synckur() {
    var id = $(location).attr('href').split("/").splice(5, 6).join("/");
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
        content: 'Apakah Anda yakin akan mensinkron kurikulum ini?',
        buttons: {
            sync: {
                text: 'Sync Kur',
                action: function () {
                    $('.fa-sync-alt').addClass('fa-spin')
                    $('#btn-load').attr('disabled', 'disabled')
                    $('#btn-syn-kur').attr('disabled', 'disabled')
                    $('.fa-sync-mkkur').addClass('fa-spin')
                    $('.btn-sync-mkkur').attr('disabled', 'disabled')
                    $.ajax({
                        type: "POST",
                        data: data,
                        url: "./../synckur",
                        success: function (msg) {
                            var pesan = JSON.parse(msg)
                            $('.fa-sync-alt').removeClass('fa-spin')
                            $('#btn-load').removeAttr('disabled')
                            $('#btn-syn-kur').removeAttr('disabled')
                            $('.fa-sync-mkkur').removeClass('fa-spin')
                            $('.btn-sync-mkkur').removeAttr('disabled', 'disabled')
                            $.alert({
                                theme: 'dark',
                                type: 'green',
                                title: 'Response',
                                content: "Status : " + pesan.status + "<br>Detail : " + pesan.pesan
                                // content:msg
                            })
                            detailkur()
                            cek_stat_sinkron()
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

function syncmkkur(id) {
    var data = {
        id: id
    }
    $('.fa-sync-alt').addClass('fa-spin')
    $('#btn-load').attr('disabled', 'disabled')
    $('#btn-sync-all-mk').attr('disabled', 'disabled')
    $('.fa-sync-mkkur').addClass('fa-spin')
    $('.btn-sync-mkkur').attr('disabled', 'disabled')
    $.confirm({
        theme: 'dark',
        draggable: false,
        type: 'orange',
        escapeKey: true,
        animation: 'zoom',
        title: 'Server',
        content: 'Apakah Anda yakin akan mensinkron data matakuliah ini?',
        buttons: {
            sync: {
                text: 'Sync Mk',
                action: function () {
                    $.ajax({
                        type: "POST",
                        data: data,
                        url: "./../syncmkkur",
                        success: function (msg) {
                            var pesan = JSON.parse(msg)
                            $('.fa-sync-alt').removeClass('fa-spin')
                            $('#btn-load').removeAttr('disabled')
                            $('#btn-sync-all-mk').removeAttr('disabled')
                            $('.fa-sync-mkkur').removeClass('fa-spin')
                            $('.btn-sync-mkkur').removeAttr('disabled', 'disabled')
                            $.alert({
                                theme: 'dark',
                                type: 'green',
                                title: 'Response',
                                content: "Status : " + pesan.status + "<br>Pesan : " + pesan.pesan
                            })
                            detailkur()
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

function syncallmkkur() {
    var id = $(location).attr('href').split("/").splice(5, 6).join("/");
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
        content: 'Apakah Anda yakin akan mensinkron seluruh data matakuliah pada kurikulum ini?',
        buttons: {
            sync: {
                text: 'Sync Mk',
                action: function () {
                    $('.fa-sync-alt').addClass('fa-spin')
                    $('#btn-load').attr('disabled', 'disabled')
                    $('#btn-sync-all-mk').attr('disabled', 'disabled')
                    $('.fa-sync-mkkur').addClass('fa-spin')
                    $('.btn-sync-mkkur').attr('disabled', 'disabled')
                    $.ajax({
                        type: "POST",
                        data: data,
                        url: "./../syncallmkkur",
                        success: function (msg) {
                            var pesan = JSON.parse(msg)
                            $('.fa-sync-alt').removeClass('fa-spin')
                            $('#btn-load').removeAttr('disabled')
                            $('#btn-sync-all-mk').removeAttr('disabled')
                            $('.fa-sync-mkkur').removeClass('fa-spin')
                            $('.btn-sync-mkkur').removeAttr('disabled', 'disabled')
                            $.alert({
                                theme: 'dark',
                                type: 'green',
                                title: 'Response',
                                content: "Status : " + pesan.status + "<br>Jumlah Berhasi Sinkron : " + pesan.count_berhasil+ "<br>Jumlah Gagal Sinkron : " + pesan.count_gagal
                                // content:msg
                            })
                            detailkur()
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

function cek_stat_sinkron() {
    var id = $(location).attr('href').split("/").splice(5, 6).join("/");
    $('#stat-sync').load("./../statsynckur/"+id)
    $('#stat-sync-all').load("./../statsynckurall/"+id)
}

$(document).ready(function () {
    cek_stat_sinkron()
})