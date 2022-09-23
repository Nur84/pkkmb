function syncAllKrs() {
    $.confirm({
        theme: 'dark',
        draggable: false,
        type: 'orange',
        escapeKey: true,
        animation: 'zoom',
        title: 'Server',
        content: 'Apakah Anda yakin akan mensinkron seluruh data Peserta KRS?',
        buttons: {
            sync: {
                text: 'Sync Peserta KRS',
                action: function () {
                    $('.btn-sync-Allkrs').attr('disbaled', 'disabled')
                    $('.btn-sync-Allkrs').addClass('fa-spin')
                    $.ajax({
                        type: "POST",
                        url: "./syncallkrs",
                        success: function (msg) {
                            var pesan = JSON.parse(msg)
                            $.alert({
                                theme: 'dark',
                                type: 'blue',
                                title: 'Server',
                                escapeKey: true,
                                animation: 'zoom',
                                draggable: false,
                                content: pesan.status + '<br>Pesan : ' + pesan.pesan
                            })
                            location.reload();
                            $('.btn-sync-Allkrs').removeAttr('disbaled')
                            $('.btn-sync-Allkrs').removeClass('fa-spin')
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