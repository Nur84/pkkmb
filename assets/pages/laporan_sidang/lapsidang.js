$('#awal').datetimepicker({
    format: 'YYYY-MM-DD',
    showClear: true
});
$('#akhir').datetimepicker({
    format: 'YYYY-MM-DD',
    showClear: true
});
function filterKegiatan() {
    $('#result').prepend('<div id="preloader" class="text-black-50">Tunggu. Sedang memuat data...</div>')
    var prodi = $('#fprodi').val()
    var awal = $('#awal').val()
    var akhir = $('#akhir').val()
    var data = {prodi:prodi,awal:awal,akhir:akhir}
    $.ajax({
        url: "./ajaxlistsidangta",
        type: "post",
        data: data,
        success: function (msg) {
            $('#preloader').remove()
            $('#result').prepend('<div id="table-isi"></div>')
            $('#table-isi').html(msg)
        }
    })
}
function loadData() {
    $('#table-isi').remove()
    filterKegiatan()
}
function loadFile(idmhs, jnsfile) {
    $('#prevfile').remove()
    var data = { idmhs: idmhs, jnsfile: jnsfile }
    $.ajax({
        url: "./getfile",
        type: "post",
        data: data,
        success: function (msg) {
            output = JSON.parse(msg)
            $('#file-content').prepend('<iframe id="prevfile" class="embed-responsive-item" src="' + output.url + '"></iframe>');
            $('#ModalFileLabel').text(output.jenisfile+' '+output.nama)
            console.log(msg)
            $('#ModalFile').modal({show:true})
        }
    })
}